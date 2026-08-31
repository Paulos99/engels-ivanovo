import shared from '../styles/shared.module.css'
import styles from './TelegramSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { Button } from '../components/Button'
import { siteConfig } from '../data/site-config'

const highlights = [
  {
    title: 'Летний сет',
    text: 'Сезонные позиции кухни — обновляем по мере появления новинок в меню.',
  },
  {
    title: 'Иван-чай с малиной и крапивой',
    text: 'Авторский напиток из меню бара — ягоды, трава, тёплая подача.',
  },
  {
    title: 'Сэндвич с говяжьими щечками',
    text: 'Гастрономия «на хлебушке» — сочное мясо в соусе хойсин.',
  },
] as const

export function TelegramSection() {
  return (
    <section className={shared.sectionAlt} id="telegram">
      <div className={shared.container}>
        <ScrollReveal>
          <div className={styles.box}>
            <div>
              <p className={shared.eyebrow}>Telegram</p>
              <h2 className={shared.title}>Сейчас в «Энгельсе»</h2>
              <p className={shared.text}>
                Новинки, сезонные позиции и жизнь кофейни — в нашем Telegram-канале.
              </p>
            </div>
            <ul className={styles.cards}>
              {highlights.map((item) => (
                <li key={item.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.hint}>
              Спешелти-зерно · авторская кухня · можно с собакой
            </p>
            <Button href={siteConfig.links.telegram} variant="primary" external>
              Перейти в Telegram
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
