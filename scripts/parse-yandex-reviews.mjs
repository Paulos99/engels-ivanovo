import fs from 'fs'

const html = fs.readFileSync(process.env.TEMP + '/yandex-reviews.html', 'utf8')
const parts = html.split('business-review-view__body')

const reviews = []
for (const part of parts.slice(1, 15)) {
  const head = part.slice(0, 2000)
  const prevIdx = html.indexOf(part)
  const prev = html.slice(Math.max(0, prevIdx - 2500), prevIdx)

  const author =
    prev.match(/business-review-view__author[^>]*>[^<]*<[^>]*>([^<]+)</)?.[1] ||
    prev.match(/aria-label="([^"]+)"[^>]*class="[^"]*user[^"]*"/)?.[1] ||
    prev.match(/>([А-ЯA-Z][а-яa-z]+ [А-ЯA-Z]\.)</)?.[1]

  const textMatch = part.match(/spoiler-view__text-container">([\s\S]*?)<\/span>/)
  if (!textMatch) continue
  const text = textMatch[1].replace(/\s+/g, ' ').trim()
  if (text.length < 40) continue
  reviews.push({ author: author?.trim() || 'Гость', text })
}

console.log(JSON.stringify(reviews.slice(0, 6), null, 2))
