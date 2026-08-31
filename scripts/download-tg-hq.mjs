import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dir, '..', 'public', 'images')
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0'

async function fetchBuf(url) {
  const res = await fetch(url, { headers: { 'User-Agent': ua } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

const html = await (await fetch('https://t.me/s/GCsEng3lzz', { headers: { 'User-Agent': ua } })).text()
const urls = [...new Set([...html.matchAll(/https:\/\/cdn4\.telesco\.pe\/file\/[^"']+\.jpg/g)].map((m) => m[0]))]
console.log('TG URLs:', urls.length)

const downloaded = []
for (const url of urls) {
  try {
    const buf = await fetchBuf(url)
    if (buf.length < 10000) continue
    const id = url.match(/file\/([A-Za-z0-9_-]+)/)?.[1] ?? `x${downloaded.length}`
    downloaded.push({ id, url, bytes: buf.length, buf })
    console.log('OK', buf.length, id)
  } catch (e) {
    console.log('skip', e.message.slice(0, 60))
  }
}

downloaded.sort((a, b) => b.bytes - a.bytes)

const mapping = [
  ['interior/hero.jpg', 0],
  ['interior/bonsai-seating.jpg', 1],
  ['interior/space-wide.jpg', 2],
  ['coffee/espresso-bar.jpg', 3],
  ['food/breakfast-porridge.jpg', 4],
  ['food/croissant.jpg', 5],
  ['food/pastry-display.jpg', 6],
  ['details/coffee-beans-wall.jpg', 7],
]

for (const [file, idx] of mapping) {
  const item = downloaded[idx]
  if (!item) continue
  const out = path.join(root, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, item.buf)
  console.log('Saved', file, item.bytes)
}

// Logo — smallest square-ish or dedicated
const logoCandidates = downloaded.filter((d) => d.bytes < 80000).sort((a, b) => b.bytes - a.bytes)
if (logoCandidates[0]) {
  fs.writeFileSync(path.join(__dir, '..', 'public', 'logo.jpg'), logoCandidates[0].buf)
  console.log('Saved logo.jpg', logoCandidates[0].bytes)
}
