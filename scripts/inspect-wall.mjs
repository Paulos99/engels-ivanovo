import { readFileSync } from 'fs'

const h = readFileSync('scripts/wall-232710485.html', 'utf8')
const needles = ['"type":"photo"', 'photo_604', 'photo_807', 'attachments', 'sizes":']

for (const n of needles) {
  const i = h.indexOf(n)
  console.log(n, i)
  if (i >= 0) console.log(h.slice(i, i + 500), '\n---')
}
