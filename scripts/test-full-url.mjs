import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const html = readFileSync(join(__dir, 'wall-232710485.html'), 'utf8')

// Find first occurrence of ig2 jpg with u= token
const idx = html.indexOf('/ig2/')
const chunk = html.slice(idx, idx + 2000)
const m = chunk.match(/https:\\\\?\/\\\\?\/sun[^"\\]+ig2[^"\\]+\.jpg[^"\\]*/i)
console.log('Raw match:', m?.[0]?.slice(0, 200))

// Unescape fully
if (m) {
  let u = m[0].replace(/\\\//g, '/').replace(/&amp;/g, '&')
  console.log('\nClean URL length:', u.length)
  console.log(u)

  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Referer: 'https://vk.com/wall-232710485',
    Origin: 'https://vk.com',
    Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'ru-RU,ru;q=0.9',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'cross-site',
  }

  const r = await fetch(u, { headers })
  console.log('\nStatus:', r.status)
  const buf = Buffer.from(await r.arrayBuffer())
  console.log('Bytes:', buf.length)
}
