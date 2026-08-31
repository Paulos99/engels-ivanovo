import { siteConfig } from '../data/site-config'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>{siteConfig.name}</p>
          <p className={styles.meta}>{siteConfig.address.full}</p>
        </div>
        <div className={styles.links}>
          <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={siteConfig.links.vk} target="_blank" rel="noopener noreferrer">
            ВКонтакте
          </a>
          <a href={siteConfig.links.yandexMaps} target="_blank" rel="noopener noreferrer">
            Яндекс Карты
          </a>
        </div>
        <p className={styles.meta}>© {year}</p>
      </div>
    </footer>
  )
}
