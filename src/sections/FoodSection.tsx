import shared from '../styles/shared.module.css'
import styles from './FoodSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { Button } from '../components/Button'
import { siteConfig } from '../data/site-config'

const categories = ['завтраки', 'на хлебушке', 'десерты', 'сезонное', 'салаты']

export function FoodSection() {
  return (
    <section className={shared.section} id="food">
      <div className={shared.container}>
        <ScrollReveal>
          <p className={shared.eyebrow}>Гастрономия</p>
          <h2 className={shared.title}>Авторская кухня</h2>
          <p className={shared.text}>{siteConfig.copy.food}</p>
          <ul className={styles.categories}>
            {categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </ScrollReveal>
        <div className={styles.gallery}>
          <PlaceholderImage slot="food-1" hoverable />
          <PlaceholderImage slot="food-2" hoverable />
          <PlaceholderImage slot="food-3" hoverable />
        </div>
        <div className={styles.actions}>
          <Button to="/menu" variant="primary">
            Смотреть меню
          </Button>
        </div>
      </div>
    </section>
  )
}
