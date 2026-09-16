import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../data/site-config";
import styles from "./FloatingMenuButton.module.css";
export function FloatingMenuButton() {
  const { pathname } = useLocation();
  return pathname === "/menu" ? null : (
    <nav className={styles.floating} aria-label="Быстрые действия">
      <Link to="/#menu">
        Открыть меню <span aria-hidden="true">↗</span>
      </Link>
      <a
        href={siteConfig.links.route}
        target="_blank"
        rel="noopener noreferrer"
      >
        Маршрут <span aria-hidden="true">↗</span>
      </a>
    </nav>
  );
}
