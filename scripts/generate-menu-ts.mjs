import fs from 'fs'

const extract = JSON.parse(
  fs.readFileSync(new URL('./taplink-menu-extract.json', import.meta.url), 'utf8'),
)

const categoryMap = {
  kitchen: {
    'идеальный-завтрак': { id: 'ideal-breakfast', title: 'Идеальный завтрак' },
    'завтрак-конструктор': { id: 'breakfast-constructor', title: 'Завтрак конструктор' },
    'добавки-в-конструктор': { id: 'constructor-addons', title: 'Добавки в конструктор' },
    'наши-каши': { id: 'porridge', title: 'Наши каши' },
    'творожные-истории': { id: 'curd-stories', title: 'Творожные истории' },
    'салаты': { id: 'salads', title: 'Салаты' },
    'суп': { id: 'soup', title: 'Суп' },
    'на-хлебушке': { id: 'on-bread', title: 'На хлебушке' },
    'тренды-дня': { id: 'trends', title: 'Тренды дня' },
    'summer-set': { id: 'summer-set', title: 'Летний сет' },
  },
  bar: {
    'эспрессо-метод': { id: 'espresso', title: 'Эспрессо метод' },
    'фильтр-метод': { id: 'filter', title: 'Фильтр метод' },
    'какао-unikava-матча-origami': { id: 'cocoa-matcha', title: 'Какао и матча' },
    'летний-спешел': { id: 'summer-special', title: 'Летний спешел' },
    'лимонады': { id: 'lemonades', title: 'Лимонады' },
    'чай': { id: 'tea', title: 'Чай' },
    'детокс-фреш': { id: 'detox', title: 'Детокс-фреш' },
  },
}

const seasonalCategories = new Set(['trends', 'summer-special', 'summer-set'])

/** Летний сет — меню из официального Telegram @GCsEng3lzz */
const summerSetItems = [
  { name: 'Круассан с креветками и песто', price: 530 },
  { name: 'Окрошка с авокадо и креветками', price: 460 },
  { name: 'Пенне арабьята с рваной говядиной', price: 590 },
  { name: 'Зелёный боул с курицей', price: 440 },
  { name: 'Сезонные ягоды', price: 210 },
]

function slugFromText(text) {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
    э: 'e', ю: 'yu', я: 'ya',
  }
  return text
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 56)
}

function toItemId(item, catId, index) {
  const base = slugFromText(`${item.name}-${item.description || ''}`) || `item-${index}`
  return `${catId}-${base}`.slice(0, 64)
}

function mapItems(items, type) {
  const seen = new Map()
  return items.map((item, index) => {
    const catKey = item.category
    const cat = categoryMap[type][catKey]
    if (!cat) throw new Error(`Unknown category ${catKey}`)
    let id = toItemId(item, cat.id, index)
    if (seen.has(id)) id = `${id}-${index}`
    seen.set(id, true)
    const mapped = {
      id,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      price: item.price,
      category: cat.id,
      available: true,
      ...(seasonalCategories.has(cat.id) ? { seasonal: true } : {}),
    }
    return mapped
  })
}

const kitchenCategories = extract.kitchen.categories.map((c) => {
  const m = categoryMap.kitchen[c.id]
  return { id: m.id, title: m.title, type: 'kitchen' }
})

kitchenCategories.unshift({ id: 'summer-set', title: 'Летний сет', type: 'kitchen' })

for (const [index, item] of summerSetItems.entries()) {
  extract.kitchen.items.unshift({
    name: item.name,
    price: item.price,
    category: 'summer-set',
    _index: index,
  })
}

const barCategories = extract.bar.categories.map((c) => {
  const m = categoryMap.bar[c.id]
  return { id: m.id, title: m.title, type: 'bar' }
})

const menuCategories = [...kitchenCategories, ...barCategories]
const menuItems = [
  ...mapItems(extract.kitchen.items, 'kitchen'),
  ...mapItems(extract.bar.items, 'bar'),
]

function itemLine(item) {
  const parts = [
    '  {',
    `    id: '${item.id}',`,
    `    name: '${item.name.replace(/'/g, "\\'")}',`,
  ]
  if (item.description) {
    parts.push(`    description: '${item.description.replace(/'/g, "\\'")}',`)
  }
  parts.push(`    price: ${item.price},`)
  parts.push(`    category: '${item.category}',`)
  parts.push(`    available: true,`)
  if (item.seasonal) parts.push(`    seasonal: true,`)
  parts.push('  },')
  return parts.join('\n')
}

function categoryLine(cat) {
  return `  { id: '${cat.id}', title: '${cat.title}', type: '${cat.type}' },`
}

let currentCat = ''
const itemBlocks = []
for (const item of menuItems) {
  if (item.category !== currentCat) {
    currentCat = item.category
    const cat = menuCategories.find((c) => c.id === currentCat)
    itemBlocks.push(`  // ${cat?.title}`)
  }
  itemBlocks.push(itemLine(item))
}

const out = `export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  image?: string
  available: boolean
  seasonal?: boolean
}

export interface MenuCategory {
  id: string
  title: string
  type: 'kitchen' | 'bar'
}

/** Источник: engels.taplink.ws/p/ffaa96 (кухня) и /p/ffbfef (бар), извлечено ${new Date().toISOString().slice(0, 10)} */
export const menuCategories: MenuCategory[] = [
${menuCategories.map(categoryLine).join('\n')}
]

export const menuItems: MenuItem[] = [
${itemBlocks.join('\n')}
]

export const coffeeCategoryIds = ['espresso', 'filter', 'cocoa-matcha', 'summer-special', 'lemonades', 'tea', 'detox']

export const seasonalItems = menuItems.filter((item) => item.seasonal)

export function getItemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter((item) => item.category === categoryId)
}

export function formatPrice(price: number): string {
  return \`\${price} ₽\`
}
`

const target = new URL('../src/data/menu.ts', import.meta.url)
fs.writeFileSync(target, out, 'utf8')
const seasonalCount = menuItems.filter((item) => item.seasonal).length
console.log('Wrote menu.ts:', menuCategories.length, 'categories,', menuItems.length, 'items,', seasonalCount, 'seasonal')
