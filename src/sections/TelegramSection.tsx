import { siteConfig } from "../data/site-config";
import styles from "./TelegramSection.module.css";
export function TelegramSection() {
  return (
    <section className={styles.section} aria-label="Жизнь кофейни">
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">
          э.
        </span>
        <div>
          <p className={styles.label}>На связи</p>
          <h2>Увидимся в «Энгельсе».</h2>
          <p>Новинки меню и жизнь кофейни — в нашем Telegram.</p>
        </div>
        <a
          href={siteConfig.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Заглянуть в канал <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
