#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'https://followhub.tenstep.top/follow'
const DEFAULT_OUTPUT_DIR = resolve(process.cwd(), 'src', 'data', 'generated', 'follow')

const args = process.argv.slice(2)
const hasFlag = (name) => args.includes(name)
const argValue = (name, fallback = '') => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}

const optional = hasFlag('--optional')
const packageDir = argValue('--package-dir')
const baseUrl = String(
  argValue('--base-url') || process.env.PUBLIC_FOLLOW_DATA_BASE_URL || process.env.FOLLOW_DATA_BASE_URL || DEFAULT_BASE_URL
).replace(/\/+$/, '')
const outputDir = resolve(argValue('--output-dir', DEFAULT_OUTPUT_DIR))

function fail(message) {
  if (optional) {
    const existing = existsSync(resolve(outputDir, 'manifest.json'))
    console.warn(
      `[follow-sync] ${message}; ${existing ? 'keeping existing generated follow data' : 'continuing without generated follow data'}`
    )
    process.exit(0)
  }
  console.error(`[follow-sync] ${message}`)
  process.exit(1)
}

async function readJson(relativePath) {
  if (packageDir) {
    const file = resolve(packageDir, relativePath)
    return JSON.parse(await readFile(file, 'utf-8'))
  }

  const response = await fetch(`${baseUrl}/${relativePath}`, { cache: 'no-store' })
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${relativePath}`)
  return response.json()
}

function assertObject(name, value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name} must be an object`)
}

function assertArray(name, value) {
  if (!Array.isArray(value)) throw new Error(`${name} must be an array`)
}

function validateManifest(manifest) {
  assertObject('manifest', manifest)
  if (manifest.days !== undefined) assertArray('manifest.days', manifest.days)
  if (manifest.sources !== undefined) assertArray('manifest.sources', manifest.sources)
}

async function writeJson(relativePath, value) {
  const file = resolve(outputDir, relativePath)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf-8')
}

async function main() {
  let manifest
  let latest
  let domains
  try {
    manifest = await readJson('manifest.json')
    latest = await readJson('latest.json')
    domains = await readJson('domains.json')
    validateManifest(manifest)
    assertObject('latest', latest)
    assertObject('domains', domains)
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }

  const dayPaths = Array.isArray(manifest.days)
    ? manifest.days
        .map((day) => String(day?.path || '').trim())
        .filter(Boolean)
    : []
  const sourcePaths = Array.isArray(manifest.sources)
    ? manifest.sources
        .map((source) => String(source?.path || '').trim())
        .filter(Boolean)
    : []
  const recentSourcePaths = Array.isArray(manifest.sources)
    ? manifest.sources
        .map((source) => String(source?.source || '').trim())
        .filter(Boolean)
        .map((source) => `sources/${source}-recent.json`)
    : []

  const relativePaths = Array.from(
    new Set([
      'manifest.json',
      'latest.json',
      'domains.json',
      ...dayPaths,
      ...sourcePaths,
      ...recentSourcePaths,
    ])
  )

  const payloads = new Map()
  payloads.set('manifest.json', manifest)
  payloads.set('latest.json', latest)
  payloads.set('domains.json', domains)

  try {
    await Promise.all(
      relativePaths
        .filter((relativePath) => !payloads.has(relativePath))
        .map(async (relativePath) => {
          payloads.set(relativePath, await readJson(relativePath))
        })
    )
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }

  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })
  await Promise.all(
    relativePaths.map((relativePath) => writeJson(relativePath, payloads.get(relativePath)))
  )

  const source = packageDir ? `package:${resolve(packageDir)}` : baseUrl
  console.log(
    `[follow-sync] synced ${dayPaths.length} day(s) and ${sourcePaths.length + recentSourcePaths.length} source file(s) from ${source}`
  )
}

main()
