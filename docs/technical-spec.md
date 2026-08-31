# Technical Specification — «Энгельс», Иваново

## Stack

- **Vite** 6.x — build tool
- **React** 18 — UI
- **TypeScript** — type safety
- **React Router** 7 — routing
- **Plain CSS** with CSS variables — styling

No Framer Motion / GSAP / Lenis — CSS-only animations sufficient.

## Project structure

```
├── docs/
├── public/
│   ├── favicon.svg
│   └── images/{coffee,food,interior,details,people}/
├── src/
│   ├── components/
│   ├── sections/
│   ├── pages/
│   ├── data/
│   │   ├── site-config.ts
│   │   ├── menu.ts
│   │   └── reviews.ts
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Routing

| Path | Component |
|------|-----------|
| `/` | HomePage |
| `/menu` | MenuPage |

## Data architecture

All repeated data in `src/data/`:
- `site-config.ts` — contacts, links, SEO, hours, features
- `menu.ts` — categories + items
- `reviews.ts` — quotes from Yandex Maps

## SEO

- Title: «Энгельс — спешелти-кофейня и гастрономия в Иваново»
- Meta description, OG tags, canonical
- JSON-LD LocalBusiness with confirmed fields only
- Semantic HTML: header, main, section, nav, footer
- Single H1 on home, H1 on menu page

## Accessibility

- Alt text on all images (descriptive when real photos)
- Keyboard navigation, focus visible
- aria-label on icon-only buttons
- prefers-reduced-motion
- Color contrast ≥ 4.5:1

## Performance

- Lazy load images below fold
- Font display: swap
- Minimal JS bundle
- No heavy dependencies

## Image config

`src/data/images.ts` — maps section keys to image paths. Placeholders when file missing.

## Build & dev

```bash
npm install
npm run dev
npm run build
npm run preview
```
