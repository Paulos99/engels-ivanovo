import { useState } from "react";
import { Link } from "react-router-dom";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { ScrollReveal } from "../components/ScrollReveal";
import styles from "./CoffeeSection.module.css";
import shared from "../styles/shared.module.css";

const methods = [
  { id: "espresso", name: "Эспрессо", mood: "Ярко и концентрированно", principle: "Вода под давлением проходит через плотно собранный слой мелко смолотого кофе.", cup: "Небольшая, насыщенная чашка с плотной текстурой. Основа капучино и латте.", choose: "Когда хочется короткой кофейной паузы и выразительного вкуса.", detail: "Давление · мелкий помол", path: "M20 37h35v12a15 15 0 0 1-15 15h-5a15 15 0 0 1-15-15z M55 40h5a8 8 0 0 1 0 16h-7 M16 69h50 M30 28v-7 M43 28v-7" },
  { id: "filter", name: "Фильтр", mood: "Легко и на каждый день", principle: "Вода проливается через молотый кофе и фильтр. В капельной кофеварке подачей воды управляет машина.", cup: "Менее концентрированный, чем эспрессо. В большой чашке удобно замечать, как меняется аромат при остывании.", choose: "Для неспешного завтрака, разговора или работы с чашкой рядом.", detail: "Пролив · большая чашка", path: "M24 18h32l-7 19H31z M35 37v8 M22 48h38l5 24H17z M27 61h29 M56 22h8 M30 18v-5h20v5" },
  { id: "pour-over", name: "Воронка", mood: "Тонко и многогранно", principle: "Ручной фильтр-метод: бариста льёт воду порциями и управляет скоростью пролива.", cup: "С бумажным фильтром — обычно лёгкая, чистая текстура. Удобно знакомиться с фруктовыми и цветочными оттенками зерна.", choose: "Если интересно попробовать новое зерно и различить нюансы вкуса.", detail: "Ручной пролив · бумажный фильтр", path: "M16 22h50L45 49H37z M22 30h37 M25 38h28 M30 54h24l8 20H22z M40 13v-6 M34 61h14" },
  { id: "aeropress", name: "Аэропресс", mood: "Округло и выразительно", principle: "Кофе настаивается в воде, затем напиток продавливают поршнем через фильтр.", cup: "Рецепт позволяет получить и лёгкую, и более плотную чашку. Настаивание и фильтрация дают много свободы для настройки вкуса.", choose: "Когда хочется исследовать другой характер знакомого зерна.", detail: "Настаивание · мягкое давление", path: "M29 12h25 M33 12v17 M50 12v17 M27 29h29v34H27z M22 64h39 M31 39h20 M31 47h20 M28 69v8h27v-8" },
];

export function CoffeeSection() {
  const [selected, setSelected] = useState(0);
  const method = methods[selected];
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
      <div className={styles.craft}>
        <div className={styles.craftHeading}><p className={shared.eyebrow}>За хорошей чашкой</p><h3>Зерно. Точность.<br /><i>Внимание к вкусу.</i></h3></div>
        <div className={styles.craftItems}>
          <article><span>01 / Зерно</span><h4>Откуда берётся вкус</h4><p>Регион, разновидность кофейного дерева и обработка влияют на аромат. Обжарка помогает раскрыть особенности зерна. Ягодные и шоколадные ноты могут быть естественными оттенками кофе.</p></article>
          <article><span>02 / Бариста</span><h4>Умение настроить чашку</h4><p>Подобрать помол, соотношение кофе и воды, время заваривания. Попробовать результат и скорректировать рецепт. Для молочных напитков — создать гладкую, мелкую пену.</p></article>
          <article><span>03 / Оборудование</span><h4>Стабильность в деталях</h4><p>Кофемолка помогает точно настроить помол, кофемашина — контролировать температуру и давление. Весы, подготовленная вода и чистота оборудования поддерживают повторяемость вкуса.</p></article>
        </div>
      </div>
      <div className={styles.guide}>
        <header className={styles.guideHeading}><div><p className={shared.eyebrow}>Небольшой гид</p><h3>Какую чашку<br /><i>выбрать сегодня?</i></h3></div><p>Один кофе может звучать по-разному.<br />Познакомьтесь с четырьмя способами заваривания.</p></header>
        <div className={styles.selector} role="group" aria-label="Способ заваривания">
          {methods.map((m, index) => <button type="button" key={m.id} aria-pressed={selected === index} aria-controls="brew-description" onClick={() => setSelected(index)}><span>0{index + 1}</span>{m.name}<span aria-hidden="true">↗</span></button>)}
        </div>
        <div id="brew-description" className={styles.brew} aria-live="polite" aria-atomic="true">
          <div className={styles.brewVisual}><svg viewBox="0 0 82 88" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={method.path} /></svg><span>{method.detail}</span></div>
          <div className={styles.brewCopy} key={method.id}><p className={styles.brewLabel}>{method.name}</p><h4>{method.mood}</h4><div className={styles.brewColumns}><div><h5>Как готовится</h5><p>{method.principle}</p></div><div><h5>В чашке</h5><p>{method.cup}</p></div></div><p className={styles.choose}>{method.choose}</p></div>
        </div>
        <div className={styles.guideFoot}><p>Вкус зависит от зерна и рецепта. Воронка — тоже фильтр-кофе; здесь «фильтр» означает напиток из капельной кофеварки. Зерно и доступные способы сегодня подскажет бариста.</p><Link to={method.id === "espresso" ? "/#menu-espresso" : "/#menu-filter"}>Посмотреть в меню <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
