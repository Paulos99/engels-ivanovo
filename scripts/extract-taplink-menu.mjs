import fs from 'fs'

function loadData(file) {
  const html = fs.readFileSync(file, 'utf8')
  const m = html.match(/window\.data = (\{.*?\});/s)
  if (!m) throw new Error(`no data in ${file}`)
  return JSON.parse(m[1])
}

function stripHtml(s = '') {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

function extractMenu(data, type) {
  const categories = []
  const items = []
  let currentCategory = { id: 'misc', title: 'Прочее', type }

  for (const sec of data.fields || []) {
    for (const item of sec.items || []) {
      if (item.block_type_name === 'text') {
        const raw = stripHtml(item.options?.text || '')
        if (!raw || raw.length < 2) continue
        const title = raw.replace(/^‌+/g, '').trim()
        if (/^(основное меню|добавки в конструктор)$/i.test(title)) continue
        const id = slugify(title) || `cat-${categories.length}`
        currentCategory = { id, title, type }
        if (!categories.find((c) => c.id === id)) categories.push(currentCategory)
      }

      if (item.block_type_name === 'pricing') {
        for (const field of item.options?.fields || []) {
          const title = stripHtml(field.title || '')
          const price = Number(field.price)
          if (!title || !Number.isFinite(price)) continue
          const id = slugify(`${currentCategory.id}-${title}`)
          items.push({
            id,
            name: title.split('|')[0].trim(),
            description: title.includes('|') ? title.split('|').slice(1).join('|').trim() : undefined,
            price,
            category: currentCategory.id,
            available: true,
          })
        }
      }
    }
  }

  return { categories, items }
}

const bar = extractMenu(loadData(process.env.TEMP + '/taplink-bar.html'), 'bar')
const kitchen = extractMenu(loadData(process.env.TEMP + '/taplink-kitchen.html'), 'kitchen')

console.log('BAR categories:', bar.categories.map((c) => c.title))
console.log('BAR items:', bar.items.length)
console.log(JSON.stringify(bar, null, 2))

console.log('\nKITCHEN categories:', kitchen.categories.map((c) => c.title))
console.log('KITCHEN items:', kitchen.items.length)

fs.writeFileSync(
  new URL('./taplink-menu-extract.json', import.meta.url),
  JSON.stringify({ bar, kitchen }, null, 2),
)
console.log('\nSaved taplink-menu-extract.json')
