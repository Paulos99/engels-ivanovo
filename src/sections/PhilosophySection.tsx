import shared from '../styles/shared.module.css'
import styles from './PhilosophySection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { siteConfig } from '../data/site-config'

export function PhilosophySection() {
  return (
    <section className={shared.sectionDark} id="philosophy">
      <div className={shared.container}>
        <ScrollReveal>
          <div className={styles.block}>
            <p className={shared.eyebrow} style={{ color: 'rgba(247,245,242,0.5)' }}>
              Внимание к вкусу
            </p>
            <div className={styles.lines}>
              {siteConfig.copy.philosophy.map((line) => (
                <p key={line} className={styles.line}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
