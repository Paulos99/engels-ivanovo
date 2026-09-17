import { useEffect, useMemo, useState } from "react";

import { menuCategories, menuItems, formatPrice } from "../data/menu";
import styles from "./MenuPage.module.css";
type MenuType = "kitchen" | "bar";

type MenuRow = {
  id: string;
  name: string;
  descriptions: string[];
  prices: number[];
};

function groupMenuRows(items: typeof menuItems): MenuRow[] {
  const rows = new Map<string, MenuRow>();

  items.forEach((item) => {
    const key = item.name.toLocaleLowerCase("ru").replaceAll("ё", "е");
    const row = rows.get(key);

    if (row) {
      if (item.description) row.descriptions.push(item.description);
      row.prices.push(item.price);
      return;
    }

    rows.set(key, {
      id: item.id,
      name: item.name,
      descriptions: item.description ? [item.description] : [],
      prices: [item.price],
    });
  });

  return [...rows.values()];
}

export function MenuPage({ initialCategory = "" }: { initialCategory?: string }) {
  const categoryFromHash = menuCategories.find(
    (c) => c.id === initialCategory,
  );
  const [type, setType] = useState<MenuType>(
    categoryFromHash?.type ?? "kitchen",
  );
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(categoryFromHash?.id ?? "");
  const normalize = (value: string) =>
    value.toLocaleLowerCase("ru").replaceAll("ё", "е").trim();
  const categories = menuCategories.filter((c) => c.type === type);
  const groups = useMemo(
    () =>
      menuCategories
        .filter((c) => c.type === type)
        .map((category) => ({
          category,
          items: groupMenuRows(
            menuItems.filter(
              (i) =>
              i.available &&
              i.category === category.id &&
              normalize(i.name + " " + (i.description ?? "")).includes(
                normalize(query),
              ),
            ),
          ),
        }))
        .filter((g) => g.items.length),
    [type, query],
  );
  useEffect(() => {
    const c = menuCategories.find((c) => c.id === initialCategory);
    if (c) {
      setType(c.type);
      setQuery("");
      setActiveId(c.id);
    }
  }, [initialCategory]);
  useEffect(() => {
    if (!initialCategory || query) return;
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(initialCategory)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        }),
    );
    return () => cancelAnimationFrame(frame);
  }, [initialCategory, type, query]);
  function changeType(next: MenuType) {
    setType(next);
    setQuery("");
    setActiveId("");
    document.getElementById("menu-scroll")?.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Выбирайте по настроению</p>
        <h2 id="menu-title">Что вам приготовить?</h2>
        <p className={styles.subtitle}>
          Для завтрака, встречи и паузы посреди дня.
        </p>
      </header>
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <div
            className={styles.switcher}
            role="group"
            aria-label="Раздел меню"
          >
            <button
              type="button"
              aria-pressed={type === "kitchen"}
              onClick={() => changeType("kitchen")}
            >
              Кухня
            </button>
            <button
              type="button"
              aria-pressed={type === "bar"}
              onClick={() => changeType("bar")}
            >
              Напитки
            </button>
          </div>
          <label className={styles.search}>
            <span className="sr-only">Поиск в выбранном разделе</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={type === "kitchen" ? "Найти блюдо" : "Найти напиток"}
            />
          </label>
        </div>
        <nav className={styles.categories} aria-label="Категории меню">
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => {
                setQuery("");
                setActiveId(c.id);
                requestAnimationFrame(() => document.getElementById(c.id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
              }}
              aria-current={activeId === c.id ? "location" : undefined}
            >
              {c.title}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.content} key={type}>
        <p className={styles.note}>
          Меню по данным от 31 августа 2026. Наличие и актуальные цены уточняйте
          в кофейне.
        </p>
        <p className="sr-only" role="status">
          Найдено позиций: {groups.reduce((n, g) => n + g.items.length, 0)}
        </p>
        {!groups.length && (
          <div className={styles.empty}>
            <h2>Ничего не нашлось</h2>
            <p>
              Попробуйте другое название или переключитесь на{" "}
              {type === "kitchen" ? "напитки" : "кухню"}.
            </p>
            <button type="button" onClick={() => setQuery("")}>
              Сбросить поиск
            </button>
          </div>
        )}
        {groups.map(({ category, items }, index) => (
          <section
            className={styles.section}
            id={category.id}
            key={category.id}
          >
            <div className={styles.sectionHeading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{category.title}</h2>
            </div>
            <ul>
              {items.map((item) => (
                <li className={styles.item} key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    {!!item.descriptions.length && (
                      <p>{item.descriptions.join(" / ")}</p>
                    )}
                  </div>
                  <span className={styles.price}>
                    {item.prices.map(formatPrice).join(" / ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
