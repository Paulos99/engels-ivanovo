import shared from '../styles/shared.module.css'
import styles from './ContactsSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { Button } from '../components/Button'
import { siteConfig } from '../data/site-config'

export function ContactsSection() {
  return (
    <section className={shared.sectionAlt} id="contacts">
      <div className={shared.container}>
        <ScrollReveal>
          <p className={shared.eyebrow}>Контакты</p>
          <h2 className={shared.title}>Как нас найти</h2>
        </ScrollReveal>
        <div className={styles.grid}>
          <ScrollReveal>
            <div>
              <h3 className={styles.groupTitle}>Адрес</h3>
              <p className={styles.row}>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}
              </p>
              <h3 className={styles.groupTitle} style={{ marginTop: '1.5rem' }}>
                Часы работы
              </h3>
              <p className={styles.row}>
                {siteConfig.hours.weekdays.label}: {siteConfig.hours.weekdays.time}
              </p>
              <p className={styles.row}>
                {siteConfig.hours.weekend.label}: {siteConfig.hours.weekend.time}
              </p>
              {siteConfig.features.dogFriendly && (
                <span className={styles.badge}>Можно с собакой</span>
              )}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div>
              <h3 className={styles.groupTitle}>Связь</h3>
              <p className={styles.row}>
                <a href={siteConfig.phoneHref} className={styles.link}>
                  {siteConfig.phone}
                </a>
              </p>
              <p className={styles.row}>
                <a
                  href={siteConfig.links.telegram}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </p>
              <p className={styles.row}>
                <a
                  href={siteConfig.links.instagram}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
              <p className={styles.row}>
                <a
                  href={siteConfig.links.vk}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ВКонтакте
                </a>
              </p>
              <p className={styles.row}>
                <a
                  href={siteConfig.links.yandexMaps}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Яндекс Карты
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className={styles.actions}>
          <Button href={siteConfig.links.route} variant="primary" external>
            Построить маршрут
          </Button>
          <Button to="/menu" variant="ghost">
            Смотреть меню
          </Button>
        </div>
      </div>
    </section>
  )
}
