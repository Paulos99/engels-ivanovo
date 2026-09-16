import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ScrollReveal } from "../components/ScrollReveal";
import styles from "./CoffeeSection.module.css";
import shared from "../styles/shared.module.css";
export function CoffeeSection() {
  return (
    <section className={styles.section} id="coffee">
      <div className={styles.inner}>
        <figure className={styles.photo}>
          <PlaceholderImage slot="coffee-hero" />
          <figcaption>За барной стойкой «Энгельса»</figcaption>
        </figure>
        <ScrollReveal>
          <div className={styles.copy}>
            <p className={shared.eyebrow}>02 / Кофе</p>
            <h2>
              Найдём
              <br />
              <i>ваш вкус.</i>
            </h2>
            <p className={styles.text}>
              Плотный эспрессо, мягкий капучино или чашка фильтра. Работаем со
              спешелти-зерном и помогаем выбрать напиток под ваше настроение.
            </p>
            <div className={styles.methods}>
              <span>Эспрессо</span>
              <span>Фильтр</span>
              <span>Воронка</span>
              <span>Аэропресс</span>
            </div>
            <p className={styles.note}>
              Расскажите бариста, какой кофе вы любите.
            </p>
            <Link className={styles.link} to="/menu#espresso">
              Выбрать напиток <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
