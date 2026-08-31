import shared from '../styles/shared.module.css'
import introStyles from './IntroSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { siteConfig } from '../data/site-config'

export function IntroSection() {
  return (
    <section className={`${shared.section} ${introStyles.intro}`} id="intro">
      <div className={shared.container}>
        <ScrollReveal>
          <div className={shared.divider} aria-hidden />
          <h2 className={shared.title}>Кофе. Гастрономия. Пространство.</h2>
          <p className={shared.text}>{siteConfig.copy.intro}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
