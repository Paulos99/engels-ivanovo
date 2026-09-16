# Сайт «Энгельс», Иваново

Премиальный имиджевый сайт гастрокофейни «Энгельс».

## Стек

- Vite + React + TypeScript
- React Router
- CSS Modules + CSS variables

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Структура данных

- `src/data/site-config.ts` — контакты, тексты, SEO
- `src/data/menu.ts` — меню (обновляемое)
- `src/data/reviews.ts` — отзывы
- `src/data/images.ts` — пути к фотографиям

## Документация

См. папку `docs/` — brand research, art direction, UX/UI/technical specs.

## Доработка сентября 2026

Актуальное описание изменений, проверки и ограничения: [docs/redesign-2026-09.md](docs/redesign-2026-09.md).

Проверка: `npm run check`. Сборка для GitHub Pages: `GITHUB_PAGES=true npm run build`.
