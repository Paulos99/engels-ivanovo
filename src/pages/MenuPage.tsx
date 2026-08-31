import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './MenuPage.module.css'
import { menuCategories, getItemsByCategory, formatPrice } from '../data/menu'

export function MenuPage() {
  const location = useLocation()
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      setActiveId(id)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location.hash])

  useEffect(() => {
    const sections = menuCategories.map((c) => document.getElementById(c.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>
          ← На главную
        </Link>
        <h1 className={styles.title}>Меню</h1>
        <p className={styles.subtitle}>Кухня и бар</p>
      </header>

      <nav className={styles.nav} aria-label="Категории меню">
        <div className={styles.navInner}>
          {menuCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`${styles.navLink} ${activeId === cat.id ? styles.navActive : ''}`}
            >
              {cat.title}
            </a>
          ))}
        </div>
      </nav>

      <main className={styles.content}>
        {menuCategories.map((cat) => {
          const items = getItemsByCategory(cat.id)
          if (items.length === 0) return null

          return (
            <section key={cat.id} id={cat.id} className={styles.section}>
              <p className={styles.sectionType}>
                {cat.type === 'bar' ? 'Бар' : 'Кухня'}
              </p>
              <h2 className={styles.sectionTitle}>{cat.title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                    {item.description && (
                      <p className={styles.itemDesc}>{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>
    </div>
  )
}
