import fs from 'fs'

function parsePage(file, label) {
  const html = fs.readFileSync(file, 'utf8')
  const m = html.match(/window\.data = (\{.*?\});/s)
  if (!m) throw new Error(`no data in ${file}`)
  const d = JSON.parse(m[1])
  console.log(`\n=== ${label} ===\n`)
  for (const sec of d.fields || []) {
    for (const item of sec.items || []) {
      if (item.block_type_name === 'pricing') {
        const opts = item.options
        const title = opts?.title || opts?.name || ''
        const price = opts?.price ?? opts?.cost
        const desc = opts?.description || opts?.text || ''
        const list = opts?.list || opts?.items
        if (list?.length) {
          console.log(`\n[${title}]`)
          for (const row of list) {
            const n = row.title || row.name || row.text
            const p = row.price ?? row.cost
            const sub = row.subtitle || row.description || ''
            console.log(`  ${n} | ${p} | ${sub}`.trim())
          }
        } else {
          console.log(`${title} | ${price} | ${desc}`.trim())
        }
      }
      if (item.block_type_name === 'pictures') {
        console.log('\n[PICTURES]', item.options?.list?.length, 'images')
      }
    }
  }
}

parsePage(process.env.TEMP + '/taplink-bar.html', 'BAR')
parsePage(process.env.TEMP + '/taplink-kitchen.html', 'KITCHEN')
