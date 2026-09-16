import { PlaceholderImage } from "../components/PlaceholderImage";
import { ScrollReveal } from "../components/ScrollReveal";
import shared from "../styles/shared.module.css";
import styles from "./SpaceSection.module.css";
export function SpaceSection() {
  return (
    <section className={shared.section} id="space">
      <div className={shared.container}>
        <div className={styles.grid}>
          <ScrollReveal>
            <div className={styles.copy}>
              <p className={shared.eyebrow}>03 / Пространство</p>
              <h2 className={shared.title}>
                Останьтесь
                <br />
                <i>ещё немного.</i>
              </h2>
              <p className={shared.text}>
                Большие окна на Шереметевский, тёплое дерево и бонсай у барной
                стойки. Выберите место для разговора, завтрака вдвоём или чашки
                кофе наедине с собой.
              </p>
              <span className={styles.badge}>Можно с собакой</span>
              <figure className={styles.detail}>
                <PlaceholderImage slot="interior-detail" />
                <figcaption>Детали, которые замечаешь не сразу</figcaption>
              </figure>
            </div>
          </ScrollReveal>
          <div className={styles.photos}>
            <figure>
              <PlaceholderImage slot="interior-main" />
              <figcaption>Дерево и мягкий свет</figcaption>
            </figure>
            <figure>
              <PlaceholderImage slot="space-wide" />
              <figcaption>Ваше место у окна</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
