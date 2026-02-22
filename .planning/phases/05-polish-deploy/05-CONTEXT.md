# Phase 5: Polish & Deploy (Полировка и деплой) - Context

**Gathered:** 2026-02-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Финализация и деплой свадебного приглашения: настройка OG-тегов для карточек в мессенджерах, оптимизация изображений через next/image, аудит адаптивности от 320px, деплой на Vercel. Lighthouse Performance > 90 на мобильном.

</domain>

<decisions>
## Implementation Decisions

### OG-карточка в мессенджерах
- Заголовок: «Анна & Михаил — Приглашение на свадьбу»
- Описание: «15 августа 2026 · Усадьба «Архангельское»» — дата и место, практичная информация
- Изображение: стилизованная текстовая карточка (без фото) — имена, дата, место на фоне свадебной палитры
- Генерация OG-изображения через Next.js OG Image (`next/og`, ImageResponse) — динамический рендер
- Содержимое карточки: имена + дата + место на фоне градиента из свадебной палитры
- Фон OG-карточки: градиент из свадебной палитры (плавный переход между цветами)
- Локаль `ru_RU` — уже стоит в layout.tsx, оставить

### Стратегия с изображениями
- Placeholder для Hero: стоковое фото с Unsplash как временная заглушка до получения реальных фотографий
- Формат: JPG исходник, Next.js автоматически конвертирует в WebP
- Blur placeholder: автоматический `placeholder="blur"` через статический импорт next/image
- Два отдельных файла для Hero: desktop (landscape) и mobile (portrait) для оптимального кадрирования

### Адаптивность на узких экранах
- Шрифты: два фиксированных размера через Tailwind breakpoints (`text-2xl md:text-5xl`), не fluid typography
- Карта Яндекс: уменьшенная высота на мобилке (~200px) vs десктоп (~350px)

### Деплой на Vercel
- URL: сначала стандартный `.vercel.app`, кастомный домен подключить позже
- Способ: подключить GitHub-репозиторий (https://github.com/SyrexBlack/WeddingProject2-0) — автодеплой при push в main
- Переменные окружения: настроить EmailJS env vars (`NEXT_PUBLIC_EMAILJS_*`) в Vercel Dashboard вручную
- Предпродакшн: build без ошибок + Lighthouse >= 90 + ручная проверка всех секций

### Claude's Discretion
- Twitter Card тип (рекомендуется `summary_large_image` для визуальных сайтов)
- Таймлайн на 320px — выбрать оптимальный мобильный layout
- Countdown-карточки на 320px — выбрать сетку или уменьшение
- Конкретное стоковое фото для Hero placeholder

</decisions>

<specifics>
## Specific Ideas

- OG-изображение генерируется динамически через `next/og` (ImageResponse API) — всегда актуальное, не нужно менять файл при обновлении данных
- Градиент из цветов свадебной палитры (александрит, шампань, песочный, пудровый, шалфей) как фон OG-карточки
- Два файла Hero-фото: landscape для десктопа, portrait для мобилки — лучшее кадрирование на разных экранах
- GitHub-репозиторий уже существует: https://github.com/SyrexBlack/WeddingProject2-0

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-polish-deploy*
*Context gathered: 2026-02-22*
