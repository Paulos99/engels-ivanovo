import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = join(__dir, '..', 'public', 'images')
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

let html = readFileSync(join(__dir, 'wall-232710485.html'), 'utf8')
html = html.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\\\//g, '/')

const byBase = new Map()
for (const m of html.matchAll(/"url":"(https:\/\/sun[^"]+?from=bu[^"]*?)"/g)) {
  const url = m[1]
  const base = url.split('?')[0]
  const pos = m.index ?? 0
  const before = html.slice(Math.max(0, pos - 80), pos)
  const wm = before.match(/"width":(\d+)/)
  const w = wm ? parseInt(wm[1], 10) : 0
  const prev = byBase.get(base)
  if (!prev || prev.w < w) byBase.set(base, { url, w })
}

const photos = [...byBase.values()]
  .map((p) => ({
    ...p,
    url: p.url.replace(/cs=\d+x\d+/, 'cs=1280x0').includes('cs=')
      ? p.url.replace(/cs=\d+x\d+/, 'cs=1280x0')
      : p.url + '&cs=1280x0',
  }))
  .sort((a, b) => b.w - a.w)

async function dl(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': ua, Referer: 'https://vk.com/engels_coffee', Accept: 'image/*' },
        signal: AbortSignal.timeout(30000),
      })
      if (!r.ok) return null
      return Buffer.from(await r.arrayBuffer())
    } catch {
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
    }
  }
  return null
}

const cover =
  'https://sun9-75.userapi.com/impf/cXRkaT4SjmYU7wpUCi5LRxg3C7LfGWvnB9zy2A/OPEHjBq4Gow.jpg?size=1920x768&quality=95&crop=25,411,1760,704&sign=d580342c28439f6ff60fc2de9b543af4&c_uniq_tag=yQYS1Wy4MkWK3cIwxGlNxs8IKJMBunflfeM2xPhXTsI&type=cover_group'

const working = []
const coverBuf = await dl(cover)
if (coverBuf) working.push({ url: cover, buf: coverBuf })

for (const p of photos) {
  if (working.length >= 9) break
  const buf = await dl(p.url)
  if (buf && buf.length > 25000) working.push({ url: p.url, buf })
}

const slots = [
  'interior/hero.jpg',
  'interior/space-wide.jpg',
  'interior/main.jpg',
  'coffee/hero.jpg',
  'food/food-1.jpg',
  'food/food-2.jpg',
  'food/food-3.jpg',
  'details/detail.jpg',
]

const saved = []
for (let i = 0; i < slots.length && i < working.length; i++) {
  const out = join(root, slots[i])
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, working[i].buf)
  saved.push({ file: slots[i], bytes: working[i].buf.length })
  console.log('Saved', slots[i], working[i].buf.length)
}

writeFileSync(join(__dir, 'downloaded-images.json'), JSON.stringify(saved, null, 2))
