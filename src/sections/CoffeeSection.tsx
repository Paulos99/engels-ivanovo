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
          <figcaption><span>Энгельс / Кофейная культура</span> За барной стойкой</figcaption>
        </figure>
        <ScrollReveal>
          <div className={styles.copy}>
            <p className={shared.eyebrow}>02 / Спешелти-кофе</p>
            <h2>У каждого зерна<br /><i>свой характер.</i></h2>
            <p className={styles.text}>Цветочный аромат, спелая ягода, какао в послевкусии. В кофе можно замечать десятки оттенков — и постепенно находить свои.</p>
            <p className={styles.text}>Спешелти ценят за особые свойства зерна и качество кофейного опыта. Происхождение, обработка, обжарка и заваривание вместе формируют вкус в чашке.</p>
            <p className={styles.note}>Начните с того, что любите: мягкий вкус, яркую кислинку или насыщенность. Расскажите об этом бариста.</p>
            <Link className={styles.link} to="/#menu-espresso">Кофейное меню <span aria-hidden="true">↗</span></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
