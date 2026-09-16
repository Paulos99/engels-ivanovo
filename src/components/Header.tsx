import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navigation";
import styles from "./Header.module.css";
interface Props {
  onMenuOpen: () => void;
  menuOpen: boolean;
}
export function Header({ onMenuOpen, menuOpen }: Props) {
  const { hash } = useLocation();
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main-content">
        К содержимому
      </a>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Энгельс — на главную">
          энгельс<span>кофе и кухня</span>
        </Link>
        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={styles.navLink}
              aria-current={
                hash.startsWith("#menu") && item.href === "/#menu"
                  ? "true"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={styles.city}>Иваново / Шереметевский, 52</span>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onMenuOpen}
          aria-label={menuOpen ? "Закрыть навигацию" : "Открыть навигацию"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
