/** Public asset URL with Vite base path (GitHub Pages compatible). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
