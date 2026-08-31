import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const html = readFileSync(join(__dir, 'wall-232710485.html'), 'utf8')
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'

const urls = []
for (const m of html.matchAll(/"url":"(https:\\\/\\\/sun[^"]+ig2[^"]+)"/g)) {
  urls.push(m[1].replace(/\\\//g, '/').replace(/&amp;/g, '&'))
}

const u = urls[0]
console.log('Testing:', u)
const r = await fetch(u, { headers: { 'User-Agent': ua, Referer: 'https://vk.com/' } })
console.log('Status:', r.status, 'Length:', r.headers.get('content-length'))
const buf = Buffer.from(await r.arrayBuffer())
console.log('Actual bytes:', buf.length)
