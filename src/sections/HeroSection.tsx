import { siteConfig } from "../data/site-config";
import { Button } from "../components/Button";
import { PlaceholderImage } from "../components/PlaceholderImage";
import styles from "./HeroSection.module.css";
export function HeroSection() {
  return (
    <section
      className={styles.hero}
      id="hero"
      aria-label="Энгельс — гастрокофейня в Иванове"
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>Иваново · Гастрокофейня</p>
        <h1 className={styles.title}>
          Энгельс
          <span>
            Хороший день
            <br />
            <i>начинается здесь.</i>
          </span>
        </h1>
        <p className={styles.description}>
          Спешелти-кофе, завтраки и авторская кухня.
          <br />
          Заходите на Шереметевский, 52.
        </p>
        <div className={styles.actions}>
          <Button to="/#menu">
            Открыть меню <span aria-hidden="true">↗</span>
          </Button>
          <a
            href={siteConfig.links.route}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.route}
          >
            Как добраться <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.bottom}>
          <span>
            Место у окна.
            <br />
            Кофе по вашему вкусу.
          </span>
          <a href="#food" aria-label="Перейти к кухне">
            Листайте ниже <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <figure className={styles.media}>
        <PlaceholderImage slot="hero" priority />
        <figcaption>Светлый зал, дерево и вид на город</figcaption>
      </figure>
    </section>
  );
}
