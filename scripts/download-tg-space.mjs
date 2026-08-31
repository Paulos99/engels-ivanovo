import fs from 'fs'

const html = await (await fetch('https://t.me/s/GCsEng3lzz')).text()
const urls = [...html.matchAll(/https:\/\/cdn4\.telesco\.pe\/file\/[^"']+/g)].map((m) => m[0])
console.log('Found', urls.length, 'images')
for (const u of urls.slice(0, 15)) console.log(u)

const outDir = new URL('../public/images/interior/', import.meta.url)
// Download first few for inspection - pick one that's not bonsai-seating
const target = new URL('../public/images/interior/space-wide.jpg', import.meta.url)
// Try URL from post about cozy atmosphere (often wide interior) - use index 3 or 4
const candidate = urls.find((u) => u.includes('ZiIxmUa')) ? urls.find((u) => !u.includes('ZiIxmUa')) : urls[3]
if (!candidate) {
  console.log('No candidate found')
  process.exit(1)
}
console.log('Downloading candidate:', candidate)
const buf = Buffer.from(await (await fetch(candidate)).arrayBuffer())
fs.writeFileSync(target, buf)
console.log('Saved space-wide.jpg', buf.length, 'bytes')
