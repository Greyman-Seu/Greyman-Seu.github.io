import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(fileURLToPath(new URL(path, root)))
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const manifest = JSON.parse(read('src/data/resume/pdf-snapshot.json'))
if (
  hash(read('src/data/resume/interview.json')) !== manifest.sourceSha256 ||
  hash(read('src/assets/avatar.png')) !== manifest.avatarSha256 ||
  hash(read('public/cv.pdf')) !== manifest.pdfSha256
) {
  throw new Error('Interview resume and PDF differ. Run: python3 scripts/build-resume-pdf.py')
}
console.log(`Interview resume PDF matches source (${manifest.pages} pages).`)
