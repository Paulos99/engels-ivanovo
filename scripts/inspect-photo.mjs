import { readFileSync } from 'fs'

const h = readFileSync('scripts/wall-232710485.html', 'utf8')
const id = '7Na7brP4BK8ODVYJSkUQaVvLe3t5wcHyuA9MMIK78'
const i = h.indexOf(id)
console.log('Index:', i)
const chunk = h.slice(i - 100, i + 1200)
// decode html entities partially
const decoded = chunk.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\\\//g, '/')
console.log(decoded)
