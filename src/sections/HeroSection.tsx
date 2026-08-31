import { siteConfig } from '../data/site-config'
import { Button } from '../components/Button'
import { PlaceholderImage } from '../components/PlaceholderImage'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <section className={styles.hero} id="hero" aria-label="Первый экран">
      <div className={styles.media}>
        <PlaceholderImage slot="hero" priority />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{siteConfig.name}</h1>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <p className={styles.address}>{siteConfig.address.street}</p>
        <div className={styles.actions}>
          <Button to="/menu" variant="primary">
            Смотреть меню
          </Button>
          <Button href={siteConfig.links.route} variant="ghostLight" external>
            Построить маршрут
          </Button>
        </div>
      </div>
    </section>
  )
}
