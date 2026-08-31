import { Button } from './Button'
import styles from './MobileNav.module.css'

const navItems = [
  { label: 'Кофе', href: '/#coffee' },
  { label: 'Гастрономия', href: '/#food' },
  { label: 'Пространство', href: '/#space' },
  { label: 'Меню', href: '/menu' },
  { label: 'Контакты', href: '/#contacts' },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <nav
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      aria-label="Мобильное меню"
      aria-hidden={!open}
    >
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={styles.link} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.menuCta}>
        <Button to="/menu" variant="primary" onClick={onClose}>
          Смотреть меню
        </Button>
      </div>
    </nav>
  )
}
