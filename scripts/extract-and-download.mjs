import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
const root = join(__dir, '..', 'public', 'images')

function extractUrls(html) {
  const urls = new Set()
  for (const m of html.matchAll(/"url":"(https:\\\/\\\/sun[^"]+?)"/g)) {
    urls.add(m[1].replace(/\\\//g, '/').replace(/&amp;/g, '&'))
  }
  for (const m of html.matchAll(/https:\\\/\\\/sun\d+-[\d]+\.userapi\.com\\\/s\\\/v1\\\/ig2\\\/[^"'\\]+?\.jpg\\?[^"'\\]+/g)) {
    const u = m[0].replace(/\\\//g, '/').replace(/&amp;/g, '&').replace(/\);.*$/, '')
    if (!u.includes('ava=1')) urls.add(u)
  }
  return [...urls].filter((u) => u.includes('/ig2/') || u.includes('impf/'))
}

const htmlFiles = ['wall-232710485.html', 'photos-232710485.html', 'engels_coffee.html']
const all = new Set()
for (const f of htmlFiles) {
  try {
    extractUrls(readFileSync(join(__dir, f), 'utf8')).forEach((u) => all.add(u))
  } catch {}
}

const list = [...all]
console.log('Total URLs:', list.length)

async function test(url) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': ua, Referer: 'https://vk.com/' } })
    const buf = Buffer.from(await r.arrayBuffer())
    return { ok: r.ok, status: r.status, bytes: buf.length, buf: r.ok ? buf : null }
  } catch (e) {
    return { ok: false, status: e.message, bytes: 0, buf: null }
  }
}

const working = []
for (const u of list) {
  const t = await test(u)
  if (t.ok && t.bytes > 20000) {
    working.push({ url: u, bytes: t.bytes })
    if (working.length <= 15) console.log('OK', t.bytes, u.slice(0, 90))
  } else if (working.length < 3) {
    console.log('skip', t.status, t.bytes, u.slice(0, 70))
  }
}

console.log('Working:', working.length)
working.sort((a, b) => b.bytes - a.bytes)

const cover =
  'https://sun9-75.userapi.com/impf/cXRkaT4SjmYU7wpUCi5LRxg3C7LfGWvnB9zy2A/OPEHjBq4Gow.jpg?size=1920x768&quality=95&crop=25,411,1760,704&sign=d580342c28439f6ff60fc2de9b543af4&c_uniq_tag=yQYS1Wy4MkWK3cIwxGlNxs8IKJMBunflfeM2xPhXTsI&type=cover_group'

const ct = await test(cover)
if (ct.ok) working.unshift({ url: cover, bytes: ct.bytes, buf: ct.buf })

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
  const w = working[i]
  let buf = w.buf
  if (!buf) {
    const t = await test(w.url)
    buf = t.buf
  }
  if (!buf) continue
  const out = join(root, slots[i])
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, buf)
  saved.push({ file: slots[i], url: w.url, bytes: buf.length })
  console.log('Saved', slots[i], buf.length)
}

writeFileSync(join(__dir, 'downloaded-images.json'), JSON.stringify(saved, null, 2))
