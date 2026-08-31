import shared from '../styles/shared.module.css'
import styles from './ReviewsSection.module.css'
import { ScrollReveal } from '../components/ScrollReveal'
import { Button } from '../components/Button'
import { reviewsData } from '../data/reviews'

export function ReviewsSection() {
  return (
    <section className={shared.section} id="reviews">
      <div className={shared.container}>
        <ScrollReveal>
          <p className={shared.eyebrow}>Отзывы</p>
          <h2 className={shared.title}>Гости о «Энгельсе»</h2>
          <div className={styles.rating}>
            <span className={styles.score}>{reviewsData.rating}</span>
            <span className={styles.meta}>
              из 5 · {reviewsData.count} оценок на Яндекс Картах
            </span>
          </div>
        </ScrollReveal>
        <div className={styles.quotes}>
          {reviewsData.quotes.map((quote) => (
            <blockquote key={quote.id} className={styles.quote}>
              <p className={styles.quoteText}>«{quote.text}»</p>
              <footer className={styles.quoteAuthor}>
                {quote.author} · {quote.source}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className={styles.link}>
          <Button href={reviewsData.sourceUrl} variant="text" external>
            Все отзывы на Яндекс Картах
          </Button>
        </div>
      </div>
    </section>
  )
}
