import { useEffect, useRef } from "react";
import { lockScroll } from "../utils/lockScroll";
import { Link } from "react-router-dom";
import { navItems } from "./navigation";
import { siteConfig } from "../data/site-config";
import styles from "./MobileNav.module.css";
interface Props {
  open: boolean;
  onClose: () => void;
}
export function MobileNav({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) return lockScroll();
  }, [open]);
  return (
    <dialog
      ref={ref}
      id="mobile-navigation"
      className={styles.dialog}
      aria-label="Навигация по сайту"
      onCancel={onClose}
      onClose={onClose}
    >
      <div className={styles.top}>
        <span>Энгельс</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть навигацию"
          autoFocus
        >
          ×
        </button>
      </div>
      <nav aria-label="Мобильная навигация">
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={styles.link}
          >
            <small>0{i + 1}</small>
            {item.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
      <p className={styles.address}>{siteConfig.address.full}</p>
      <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
    </dialog>
  );
}
