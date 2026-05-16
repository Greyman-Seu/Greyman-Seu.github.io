#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'https://followhub.tenstep.top/wiki'
const DEFAULT_OUTPUT_DIR = resolve(process.cwd(), 'src', 'data', 'generated', 'wiki-sync')

const args = process.argv.slice(2)
const hasFlag = (name) => args.includes(name)
const argValue = (name, fallback = '') => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}

const optional = hasFlag('--optional')
const packageDir = argValue('--package-dir')
const baseUrl = String(
  argValue('--base-url') || process.env.PUBLIC_WIKI_DATA_BASE_URL || process.env.WIKI_DATA_BASE_URL || DEFAULT_BASE_URL
).replace(/\/+$/, '')
const outputDir = resolve(argValue('--output-dir', DEFAULT_OUTPUT_DIR))

const jsonFiles = {
  manifest: 'manifest.json',
  sources: 'sources.json',
  topics: 'topics.json',
  synthesis: 'synthesis.json',
  graphData: 'graph-data.json'
}

function fail(message) {
  if (optional && existsSync(resolve(outputDir, 'manifest.json'))) {
    console.warn(`[wiki-sync] ${message}; keeping existing generated wiki-sync data`)
    process.exit(0)
  }
  console.error(`[wiki-sync] ${message}`)
  process.exit(1)
}

async function readPackageJson(relativePath) {
  if (packageDir) {
    const file = resolve(packageDir, relativePath)
    return JSON.parse(await readFile(file, 'utf-8'))
  }

  const response = await fetch(`${baseUrl}/${relativePath}`)
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${relativePath}`)
  return response.json()
}

async function loadWikiPackage() {
  const manifest = await readPackageJson('manifest.json')
  const files = manifest && typeof manifest === 'object' && manifest.files ? manifest.files : {}
  const sources = await readPackageJson(files.sources || jsonFiles.sources)
  const topics = await readPackageJson(files.topics || jsonFiles.topics)
  const synthesis = await readPackageJson(files.synthesis || jsonFiles.synthesis)
  const graphData = await readPackageJson(files.graph_data || jsonFiles.graphData)
  return { manifest, sources, topics, synthesis, graphData }
}

function assertArray(name, value) {
  if (!Array.isArray(value)) throw new Error(`${name} must be an array`)
}

function assertObject(name, value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name} must be an object`)
}

function validatePackage(data) {
  assertObject('manifest', data.manifest)
  assertArray('sources', data.sources)
  assertArray('topics', data.topics)
  assertArray('synthesis', data.synthesis)
  assertObject('graphData', data.graphData)

  const counts = data.manifest.counts || {}
  const expected = {
    sources: data.sources.length,
    topics: data.topics.length,
    synthesis: data.synthesis.length
  }
  for (const [key, value] of Object.entries(expected)) {
    if (counts[key] !== undefined && counts[key] !== value) {
      throw new Error(`manifest counts.${key}=${counts[key]} does not match ${value}`)
    }
  }
}

async function writeJson(name, value) {
  await writeFile(resolve(outputDir, jsonFiles[name]), `${JSON.stringify(value, null, 2)}\n`, 'utf-8')
}

async function main() {
  let data
  try {
    data = await loadWikiPackage()
    validatePackage(data)
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }

  await mkdir(outputDir, { recursive: true })
  await writeJson('manifest', data.manifest)
  await writeJson('sources', data.sources)
  await writeJson('topics', data.topics)
  await writeJson('synthesis', data.synthesis)
  await writeJson('graphData', data.graphData)
  const source = packageDir ? `package:${resolve(packageDir)}` : baseUrl
  console.log(
    `[wiki-sync] synced ${data.sources.length} sources, ${data.topics.length} topics, ${data.synthesis.length} synthesis entries from ${source}`
  )
}

main()
