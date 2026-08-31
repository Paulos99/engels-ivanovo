import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const tgDir = path.join(__dir, '..', 'public', 'images', '_tg')
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

function urlsFromPost(id) {
  const tmp = path.join(os.tmpdir(), `tg-${id}.html`)
  execSync(`curl.exe -sL -A "${ua}" "https://t.me/GCsEng3lzz/${id}" -o "${tmp}"`, { stdio: 'pipe' })
  const html = fs.readFileSync(tmp, 'utf8')
  return [...html.matchAll(/cdn[0-9]\.telesco\.pe\/file\/[^"']+\.jpg/g)].map((m) => 'https://' + m[0])
}

async function save(url, name) {
  const res = await fetch(url, { headers: { 'User-Agent': ua } })
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(path.join(tgDir, name), buf)
  console.log(name, buf.length)
}

fs.mkdirSync(tgDir, { recursive: true })

// tg-15… из постов 378–400 (как в первой сессии)
let n = 15
for (let id = 378; id <= 400; id++) {
  const urls = urlsFromPost(id)
  for (const url of urls) {
    await save(url, `tg-${n}.jpg`)
    n++
  }
}

// tg-28… из постов 350–377
for (let id = 350; id <= 377; id++) {
  const urls = urlsFromPost(id)
  for (const url of urls) {
    await save(url, `tg-${n}.jpg`)
    n++
  }
}

console.log('last tg index:', n - 1)
