import shared from '../styles/shared.module.css'
import styles from './SeasonalSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { seasonalItems, formatPrice } from '../data/menu'

export function SeasonalSection() {
  if (seasonalItems.length === 0) return null

  return (
    <section className={shared.section} id="seasonal">
      <div className={shared.container}>
        <ScrollReveal>
          <p className={shared.eyebrow}>Сезонное</p>
          <h2 className={shared.title}>Сейчас в меню</h2>
        </ScrollReveal>
        <div>
          {seasonalItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.cardName}>{item.name}</span>
              {item.description && (
                <p className={styles.cardDesc}>{item.description}</p>
              )}
              <span className={styles.cardPrice}>{formatPrice(item.price)}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
