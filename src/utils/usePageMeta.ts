import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../data/site-config";
export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title =
      pathname === "/menu" ? "Меню — Энгельс, Иваново" : siteConfig.seo.title;
    document.title = title;
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    const url = siteConfig.seo.url + (pathname === "/" ? "/" : pathname);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
  }, [pathname]);
}
