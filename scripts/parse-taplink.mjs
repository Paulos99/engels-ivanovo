import fs from 'fs'

const html = fs.readFileSync(process.env.TEMP + '/taplink.html', 'utf8')
const dataMatch = html.match(/window\.data = (\{.*?\});/s)
if (!dataMatch) {
  console.log('no window.data')
  process.exit(1)
}
const data = JSON.parse(dataMatch[1])
for (const section of data.fields || []) {
  for (const item of section.items || []) {
    if (item.block_type_name === 'link') {
      console.log('LINK:', item.options?.title, '->', item.options?.value, 'type:', item.options?.type)
    }
    if (item.block_type_name === 'document' || item.block_type_name === 'file') {
      console.log('DOC:', JSON.stringify(item.options))
    }
  }
}
