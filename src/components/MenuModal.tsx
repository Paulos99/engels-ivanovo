import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuPage } from "../pages/MenuPage";
import { lockScroll } from "../utils/lockScroll";
import styles from "./MenuModal.module.css";

export const isMenuHash = (hash: string) => hash === "#menu" || hash.startsWith("#menu-");

export function MenuModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const open = isMenuHash(location.hash);
  const category = location.hash.startsWith("#menu-") ? location.hash.slice(6) : "";
  const ref = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const previous = useRef(location);
  const returnTo = useRef<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const activeCategory = useRef(category);
  if (open) activeCategory.current = category;

  useEffect(() => {
    // Old shared menu URLs now open the same overlay on the landing page.
    if (location.pathname === "/menu") {
      navigate("/#menu" + (location.hash ? "-" + location.hash.slice(1) : ""), { replace: true });
    }
  }, [location.pathname, location.hash, navigate]);

  useEffect(() => {
    if (open && !isMenuHash(previous.current.hash)) {
      returnTo.current = previous.current.pathname === "/" ? previous.current.hash : null;
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    previous.current = location;
    if (open) {
      setClosing(false);
      setVisible(true);
      return;
    }
    if (!ref.current?.open) return;
    setClosing(true);
    const timer = window.setTimeout(() => {
      ref.current?.close();
      setVisible(false);
      setClosing(false);
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
    return () => window.clearTimeout(timer);
  }, [open, location]);

  useEffect(() => {
    if (!visible) return;
    const dialog = ref.current;
    if (!dialog) return;
    const unlock = lockScroll();
    if (!dialog.open) dialog.showModal();
    return () => { dialog.close(); unlock(); };
  }, [visible]);

  function close() {
    if (!open || closing) return;
    if (returnTo.current !== null) navigate(-1);
    else navigate("/", { replace: true });
  }

  return (
    <dialog ref={ref} className={styles.dialog} data-closing={closing || undefined}
      aria-labelledby="menu-title" onCancel={e => { e.preventDefault(); close(); }}
      onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}>
      <div className={styles.top}>
        <span>энгельс <small>меню</small></span>
        <button type="button" onClick={close} aria-label="Закрыть меню" autoFocus><span aria-hidden="true">×</span></button>
      </div>
      <div className={styles.scroll} id="menu-scroll">
        {visible && <MenuPage initialCategory={activeCategory.current} />}
      </div>
    </dialog>
  );
}
