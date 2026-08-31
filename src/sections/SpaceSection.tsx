import shared from '../styles/shared.module.css'
import styles from './SpaceSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { PlaceholderImage } from '../components/PlaceholderImage'
import { siteConfig } from '../data/site-config'

const details = ['свет', 'дерево', 'бонсай', 'барная стойка', 'материалы', 'детали']

export function SpaceSection() {
  return (
    <section className={shared.sectionAlt} id="space">
      <div className={shared.container}>
        <ScrollReveal>
          <div className={styles.wideImage}>
            <PlaceholderImage slot="space-wide" hoverable />
          </div>
        </ScrollReveal>
        <div className={shared.gridTwo} style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <ScrollReveal>
            <p className={shared.eyebrow}>Пространство</p>
            <h2 className={shared.title}>Место, в котором остаются</h2>
            <p className={shared.text}>{siteConfig.copy.space}</p>
            <blockquote className={styles.quote}>{siteConfig.copy.spaceQuote}</blockquote>
          </ScrollReveal>
          <ScrollReveal>
            <div className={styles.images}>
              <PlaceholderImage slot="interior-main" hoverable className={styles.full} />
              <PlaceholderImage slot="interior-detail" hoverable className={styles.detail} />
            </div>
            <ul className={styles.details}>
              {details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
