const res = await fetch('https://engels.taplink.ws/')
const html = await res.text()

const pdf = [...html.matchAll(/https?:[^"'\s<>]+\.pdf[^"'\s<>]*/gi)].map((m) => m[0])
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
const interesting = hrefs.filter((h) =>
  /menu|pdf|file|taplink|kitchen|bar|меню/i.test(h),
)

console.log('PDF urls:', pdf)
console.log('Interesting hrefs:', interesting)
console.log('--- snippet ---')
console.log(html.slice(0, 8000))
