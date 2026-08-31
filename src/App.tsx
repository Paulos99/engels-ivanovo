import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { MobileNav } from './components/MobileNav'
import { FloatingMenuButton } from './components/FloatingMenuButton'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { usePageMeta } from './utils/usePageMeta'

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  usePageMeta()

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <FloatingMenuButton />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default AppShell
