# UX Specification — «Энгельс», Иваново

## Информационная архитектура

```
/ (Home)
├── #hero
├── #intro
├── #coffee
├── #food
├── #space
├── #philosophy
├── #seasonal (conditional)
├── #telegram
├── #reviews
└── #contacts

/menu
├── sticky category nav
└── #category-{id} anchors
```

## Главная страница — порядок секций

1. **Hero** — атмосферное фото, название, tagline, адрес, CTA
2. **Знакомство** — «Кофе. Гастрономия. Пространство.»
3. **Кофе** — фото + specialty-текст + бариста + CTA на меню (кофейная карта)
4. **Гастрономия** — категории + CTA
5. **Пространство** — бонсай, свет, материалы
6. **Философия** — «Внимание к вкусу»
7. **Сезонное** — если есть в menu.ts
8. **Telegram** — «Сейчас в «Энгельсе»»
9. **Отзывы** — цитаты + рейтинг + ссылка
10. **Контакты** — полная информация
11. **Footer**

## Навигация

### Desktop
`ЭНГЕЛЬС | КОФЕ | ГАСТРОНОМИЯ | ПРОСТРАНСТВО | МЕНЮ | КОНТАКТЫ`

### Mobile
- Burger menu с крупными touch targets
- Sticky floating «Меню» button
- Header sticky on scroll

## User paths

| Цель | Путь | Кликов |
|------|------|--------|
| Меню | Nav / Hero CTA / Floating button | ≤ 2 |
| Маршрут | Hero / Contacts → Яндекс Карты | 1 |
| Telegram | Contacts / Telegram block | 1 |
| Instagram | Contacts | 1 |
| Кофейная карта | Coffee section → /menu#coffee | 1 |

## Страница /menu

- Sticky horizontal category nav (scroll on mobile)
- Компактный список: название — описание — цена
- Якоря `#category-id`
- Фильтр/секция «Сезонное» если есть данные
- Back link to home

## CTA

| Текст | Действие |
|-------|----------|
| Смотреть меню | /menu |
| Смотреть кофейную карту | /menu#coffee |
| Построить маршрут | Yandex Maps route URL |
| Перейти в Telegram | t.me/GCsEng3lzz |

## Mobile-first

- Typography scales down gracefully
- Horizontal scroll galleries where needed
- Menu category nav: horizontal scroll + snap
- Hero: full viewport height, readable overlay text
- Touch targets ≥ 44px
