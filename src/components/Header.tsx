import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../data/site-config'
import styles from './Header.module.css'

const navItems = [
  { label: 'Кофе', href: '/#coffee' },
  { label: 'Гастрономия', href: '/#food' },
  { label: 'Пространство', href: '/#space' },
  { label: 'Меню', href: '/menu' },
  { label: 'Контакты', href: '/#contacts' },
]

interface HeaderProps {
  onMenuOpen: () => void
  menuOpen: boolean
}

export function Header({ onMenuOpen, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${location.pathname === '/' && !scrolled ? styles.light : ''}`}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Энгельс — на главную">
          <img
            src="/logo.jpg"
            alt=""
            className={styles.logoImg}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          {siteConfig.name}
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${location.pathname === '/menu' && item.href === '/menu' ? styles.navActive : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
          onClick={onMenuOpen}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
