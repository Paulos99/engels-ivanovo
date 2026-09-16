import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { isMenuHash } from "./MenuModal";
export function RouteScroll() {
  const { pathname, hash } = useLocation();
  const previousHash = useRef(hash);
  useEffect(() => {
    const wasMenu = isMenuHash(previousHash.current);
    previousHash.current = hash;
    if (pathname === "/menu" || isMenuHash(hash) || wasMenu) return;
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
