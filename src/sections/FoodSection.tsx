import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ScrollReveal } from "../components/ScrollReveal";
import { menuItems, formatPrice } from "../data/menu";
import shared from "../styles/shared.module.css";
import styles from "./FoodSection.module.css";
const picks = [
  { id: "on-bread-benedikt-s-lososem-190-gr", note: "Завтрак" },
  {
    id: "porridge-grechka-s-pesto-yaytsami-pashot-i-parmezanom-300gr",
    note: "Кухня",
  },
  {
    id: "curd-stories-syrniki-s-arahisovym-mussom-i-svezhey-klubnikoy-200",
    note: "К чаю и кофе",
  },
  {
    id: "trends-kotleta-iz-krevetki-s-rizoni-v-souse-bisk-300-gr",
    note: "На обед",
  },
];
export function FoodSection() {
  return (
    <section className={shared.section} id="food">
      <div className={shared.container}>
        <ScrollReveal>
          <div className={styles.heading}>
            <div>
              <p className={shared.eyebrow}>01 / Кухня</p>
              <h2 className={shared.title}>
                С чего начнётся
                <br />
                <i>ваш день?</i>
              </h2>
            </div>
            <div>
              <p className={shared.text}>
                С завтрака, любимой чашки кофе или обеда между делами. Выбирайте
                то, чего хочется сегодня.
              </p>
              <Link className={styles.menuLink} to="/menu">
                Всё меню кухни <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
        <div className={styles.body}>
          <div className={styles.photos}>
            <figure>
              <PlaceholderImage slot="food-1" />
              <figcaption>Завтрак с ягодами</figcaption>
            </figure>
            <figure>
              <PlaceholderImage slot="food-2" />
              <figcaption>Кофе и выпечка</figcaption>
            </figure>
          </div>
          <div className={styles.picks}>
            <p className={styles.label}>Присмотритесь в меню</p>
            {picks.map((pick) => {
              const item = menuItems.find(
                (i) => i.id === pick.id && i.available,
              );
              return (
                item && (
                  <Link
                    to={"/menu#" + item.category}
                    className={styles.pick}
                    key={item.id}
                  >
                    <span className={styles.note}>{pick.note}</span>
                    <h3>{item.name}</h3>
                    <span className={styles.price}>
                      {formatPrice(item.price)}{" "}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                )
              );
            })}
            <p className={styles.fine}>
              Наличие блюд и актуальные цены уточняйте в кофейне.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
