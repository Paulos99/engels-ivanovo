import fs from 'fs'

const text = fs.readFileSync(
  `${process.env.USERPROFILE}/.cursor/projects/c-Users-user-Desktop/agent-transcripts/433b7f08-e4a8-4984-9413-c6e37002e98d/433b7f08-e4a8-4984-9413-c6e37002e98d.jsonl`,
  'utf8',
)

const urls = [...text.matchAll(/https:\/\/cdn4\.telesco\.pe\/file\/[^"\\]+?\.jpg/g)].map((m) => m[0])
const unique = [...new Set(urls)]
console.log('URLs:', unique.length)
for (const u of unique.slice(0, 8)) console.log(u.length, u.slice(0, 90))

// tg-5 was 2nd download in original batch - use Gg0ovLp3
const url = unique.find((u) => u.includes('Gg0ovLp3'))
if (!url) throw new Error('Gg0ovLp3 not found')

const target = new URL('../public/images/interior/space-wide.jpg', import.meta.url)
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const buf = Buffer.from(await res.arrayBuffer())
fs.writeFileSync(target, buf)
console.log('Saved space-wide.jpg', buf.length)
