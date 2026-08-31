# Art Direction — «Энгельс», Иваново

## Визуальное направление

Премиальный, спокойный, натуральный сайт. Фотография и типографика — главные носители. Без показной роскоши и шаблонного ресторанного UI.

## Палитра (CSS variables)

| Token | Value | Назначение |
|-------|-------|------------|
| `--color-bg` | `#F7F5F2` | Основной фон, тёплый off-white |
| `--color-bg-alt` | `#EDE8E1` | Альтернативные секции |
| `--color-bg-dark` | `#2A2826` | Footer, контрастные блоки |
| `--color-text` | `#2A2826` | Основной текст |
| `--color-text-muted` | `#6B6560` | Вторичный текст |
| `--color-text-light` | `#F7F5F2` | Текст на тёмном фоне |
| `--color-accent` | `#5C6B52` | Акцент, ссылки, бонсай/природа |
| `--color-wood` | `#8B7355` | Дерево, тёплые детали |
| `--color-border` | `#D9D3CB` | Разделители |

## Типографика

- **Заголовки:** Onest — современная кириллица, спокойная геометрия
- **Текст:** Literata — serif для абзацев, читаемость
- **Масштаб:** fluid через `clamp()` — mobile-first

```css
--font-heading: 'Onest', system-ui, sans-serif;
--font-body: 'Literata', Georgia, serif;
--text-hero: clamp(2.5rem, 6vw, 4.5rem);
--text-h2: clamp(1.75rem, 4vw, 2.75rem);
--text-h3: clamp(1.25rem, 2.5vw, 1.5rem);
--text-body: clamp(1rem, 1.5vw, 1.125rem);
--text-small: 0.875rem;
```

## Сетка и отступы

- Max content width: 1280px
- Section padding: `clamp(3rem, 8vw, 7rem)` vertical
- Horizontal padding: `clamp(1.25rem, 4vw, 3rem)`
- Border radius: 2–4px (минимальный)

## Фотографии

- Edge-to-edge, большие блоки
- `object-fit: cover`, aspect-ratio по контексту
- Lazy loading, responsive src when real photos added
- Плейсхолдеры: нейтральный gradient + subtle grain

## Анимация

- Fade-in on scroll (Intersection Observer / CSS)
- Лёгкий scale на hover фото (1.02)
- Плавные transitions 300–400ms ease
- `prefers-reduced-motion: reduce` — отключить анимации

## UI-характер

- Минималистичная навигация
- Кнопки: solid primary + ghost outline
- Меню: компактные строки, не тяжёлые карточки
- Без excessive shadows, glassmorphism, neon
