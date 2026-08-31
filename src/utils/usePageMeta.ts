import { useEffect } from 'react'
import { siteConfig } from '../data/site-config'

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? siteConfig.seo.title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description ?? siteConfig.seo.description)
  }, [title, description])
}
