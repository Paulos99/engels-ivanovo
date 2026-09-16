import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (pathname === "/menu" && hash) return;
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
