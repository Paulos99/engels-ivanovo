import fs from 'fs'

const text = fs.readFileSync(
  `${process.env.USERPROFILE}/.cursor/projects/c-Users-user-Desktop/agent-transcripts/433b7f08-e4a8-4984-9413-c6e37002e98d/433b7f08-e4a8-4984-9413-c6e37002e98d.jsonl`,
  'utf8',
)
const urls = [...new Set([...text.matchAll(/https:\/\/cdn4\.telesco\.pe\/file\/[^"\\]+?\.jpg/g)].map((m) => m[0]))]

const dir = new URL('../public/images/_probe/', import.meta.url)
fs.mkdirSync(dir, { recursive: true })

for (const url of urls) {
  const name = url.match(/file\/([A-Za-z0-9_\-]{8})/)?.[1] || 'x'
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(new URL(`${name}.jpg`, dir), buf)
    console.log(name, buf.length)
  } catch (e) {
    console.log(name, 'ERR', e.message)
  }
}
