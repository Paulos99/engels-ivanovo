import shared from '../styles/shared.module.css'
import styles from './CoffeeSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { Button } from '../components/Button'
import { siteConfig } from '../data/site-config'

export function CoffeeSection() {
  return (
    <section className={shared.sectionAlt} id="coffee">
      <div className={shared.container}>
        <div className={shared.gridTwo}>
          <ScrollReveal>
            <PlaceholderImage slot="coffee-hero" hoverable className={styles.full} />
          </ScrollReveal>
          <ScrollReveal>
            <p className={shared.eyebrow}>Кофе</p>
            <h2 className={shared.title}>Спешелти-подход</h2>
            <p className={shared.text}>{siteConfig.copy.coffee}</p>
            <p className={styles.note}>{siteConfig.copy.baristaHelp}</p>
            <div className={styles.actions}>
              <Button to="/menu#espresso" variant="primary">
                Смотреть кофейную карту
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
