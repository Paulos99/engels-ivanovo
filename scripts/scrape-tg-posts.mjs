import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

function urlsFromPost(id) {
  const tmp = path.join(os.tmpdir(), `tg-${id}.html`)
  try {
    execSync(`curl.exe -sL -A "${ua}" "https://t.me/GCsEng3lzz/${id}" -o "${tmp}"`, {
      stdio: 'pipe',
    })
    const html = fs.readFileSync(tmp, 'utf8')
    return [...new Set([...html.matchAll(/cdn[0-9]\.telesco\.pe\/file\/[^"']+\.jpg/g)].map((m) => 'https://' + m[0]))]
  } catch {
    return []
  }
}

const ranges = [[378, 400], [350, 377]]
const all = []
for (const [from, to] of ranges) {
  for (let id = from; id <= to; id++) {
    const u = urlsFromPost(id)
    if (u.length) console.log('post', id, u.length)
    all.push(...u)
  }
}
const unique = [...new Set(all)]
console.log('unique', unique.length)
unique.forEach((u, i) => console.log(i + 1, u.slice(0, 80) + '...'))
