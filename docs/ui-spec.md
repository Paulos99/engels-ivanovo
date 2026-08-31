# UI Specification — «Энгельс», Иваново

## Компоненты

### Layout
- `Header` — logo/wordmark, desktop nav, mobile burger trigger
- `MobileNav` — full-screen overlay menu
- `Footer` — minimal, copyright, links
- `Section` — wrapper with id, padding, optional bg variant
- `Container` — max-width centering

### Content
- `Hero` — full-viewport image + overlay + title + CTAs
- `ImageBlock` — large photo with optional caption
- `PlaceholderImage` — gradient placeholder with label for missing photos
- `Button` — variants: `primary`, `ghost`, `text`
- `ReviewQuote` — quote + author + source
- `ContactBlock` — hours, phone, links grid

### Menu
- `MenuCategoryNav` — sticky horizontal tabs
- `MenuCategory` — category heading + items list
- `MenuItemRow` — name, description, price in one row

### Navigation
- `FloatingMenuButton` — mobile sticky CTA to /menu
- `ScrollReveal` — fade-in wrapper

## Button styles

**Primary:** bg `--color-text`, text `--color-text-light`, padding 0.875rem 1.75rem  
**Ghost:** border 1px `--color-text`, transparent bg  
**Hover:** opacity 0.85, no scale on buttons

## Menu item row

```
[Name                    ] [Price]
[Description if any      ]
```

- Border-bottom 1px `--color-border`
- Price right-aligned, tabular nums
- No card shadows

## Header behavior

- Transparent over hero → solid bg on scroll
- Height: 64px mobile, 72px desktop
- Logo left, nav center/right

## Responsive breakpoints

- Mobile: < 768px
- Tablet: 768px – 1023px
- Desktop: ≥ 1024px

## Image treatment

- Hero: 100vh min, object-fit cover
- Section images: 16/10 or 4/3 aspect
- Hover: scale 1.02, transition 400ms

## Focus states

- outline: 2px solid `--color-accent`
- outline-offset: 2px
