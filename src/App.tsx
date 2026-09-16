import { RouteScroll } from "./components/RouteScroll";
import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { MobileNav } from "./components/MobileNav";
import { FloatingMenuButton } from "./components/FloatingMenuButton";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { usePageMeta } from "./utils/usePageMeta";

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  usePageMeta();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <RouteScroll />
      <Header onMenuOpen={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <MobileNav open={menuOpen} onClose={closeMenu} />
      <FloatingMenuButton />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default AppShell;
