# Stack Research

**Domain:** Свадебный одностраничный сайт-приглашение
**Researched:** 2026-02-22
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Next.js** | 15.x (App Router) | Фреймворк, SSG, маршрутизация, оптимизация изображений | Статическая генерация (SSG) — страница предгенерирована, мгновенная загрузка. Встроенный `next/image` сжимает фото автоматически. Деплой на Vercel в один клик. App Router — актуальный стандарт. |
| **React** | 19.x | UI-библиотека | Устанавливается вместе с Next.js 15. React 19 содержит улучшения серверных компонентов и стабилизацию хуков. |
| **TypeScript** | 5.x | Типизация | Автодополнение в IDE, ловит ошибки на этапе разработки. Next.js 15 поддерживает TS из коробки через `--typescript` флаг. |
| **Tailwind CSS** | 4.x | Стилизация | Утилитарные классы ускоряют вёрстку в 3–5 раз. Mobile-first по умолчанию — критично для свадебного сайта (гости открывают с телефона). Tailwind 4 — новый движок Oxide, быстрее сборка, CSS-first конфигурация. |
| **Framer Motion** | 12.x | Анимации при скролле, переходы | Декларативный API (`motion.div`, `whileInView`). Легко создать fade-in, slide-up при скролле. Лёгкий (~30KB gzip). Отличная интеграция с React 19. |
| **Lucide React** | 0.474.x | Иконки | Современная замена Feather Icons. Tree-shakeable — в бандл попадут только используемые иконки. Единый стиль, SVG. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **date-fns** | 4.x | Вычисление обратного отсчёта (countdown) | Для расчёта разницы между текущей датой и датой свадьбы. Tree-shakeable — импортируешь только `differenceInDays`, `differenceInHours` и т.д. Лёгче moment.js в ~10 раз. |
| **react-intersection-observer** | 9.x | Отслеживание видимости секций при скролле | Обёртка над Intersection Observer API. Используется совместно с Framer Motion: `useInView` → запуск анимации. Без неё пришлось бы писать хук вручную. |
| **@emailjs/browser** | 4.x | Отправка RSVP без бэкенда | Отправляет email прямо из браузера через EmailJS. Бесплатный тариф: 200 писем/мес — более чем достаточно для свадьбы (обычно 50–150 гостей). Альтернатива: Formspree (см. ниже). |
| **next-seo** (или встроенный `metadata` API) | — | Open Graph теги для превью в Telegram/WhatsApp | Next.js 15 App Router имеет встроенный `metadata` export в `layout.tsx`. Поэтому `next-seo` **не обязателен** — используем нативный API. Устанавливать только если нужен JSON-LD. |
| **Яндекс.Карты (iframe/виджет)** | — | Интерактивная карта с меткой места | Для российской аудитории Яндекс.Карты надёжнее Google Maps: лучшая детализация РФ, не требует API-ключа при использовании iframe-виджета. Нулевой бюджет — iframe бесплатен. |

**Примечание по картам:**
- **Яндекс.Карты iframe** — рекомендуется для РФ. Бесплатно, без API-ключа. Просто вставить `<iframe>` с URL конструктора карт.
- **Google Maps iframe** — альтернатива, если аудитория международная. Тоже бесплатно через embed.
- **`@react-google-maps/api`** — использовать **только** если нужна кастомная интерактивность (кастомные маркеры, зум). Требует Google Cloud API-ключ (бесплатный до лимита).

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **ESLint** | Линтинг кода | Устанавливается автоматически с `create-next-app`. Конфиг `next/core-web-vitals` включает правила для Next.js и React. |
| **Prettier** | Форматирование кода | Установить отдельно. Настроить `prettier-plugin-tailwindcss` для автосортировки Tailwind-классов. |
| **sharp** | Оптимизация изображений на сервере | Next.js использует `sharp` для `next/image` в production. На Vercel установлен по умолчанию, но для локальной разработки нужен в `devDependencies`. |
| **Vercel CLI** (опционально) | Превью деплоев | `vercel --prod` для деплоя. Не обязателен — можно деплоить через Git push. |

## Installation

```bash
# Core — создание проекта Next.js 15 с TypeScript, Tailwind CSS 4, App Router, src-директорией
npx create-next-app@latest wedding --typescript --tailwind --app --src-dir

# Перейти в директорию проекта
cd wedding

# Анимации и иконки
npm install framer-motion lucide-react

# Утилиты: дата для countdown, наблюдатель скролла, email-отправка RSVP
npm install date-fns react-intersection-observer @emailjs/browser

# Dev-зависимости: оптимизация изображений, форматирование, сортировка Tailwind-классов
npm install -D sharp prettier prettier-plugin-tailwindcss
```

### Структура проекта (рекомендация)

```
src/
├── app/
│   ├── layout.tsx          # Корневой layout, metadata (OG-теги), шрифты
│   ├── page.tsx            # Главная страница — сборка всех секций
│   └── globals.css         # Tailwind директивы + кастомные стили
├── components/
│   ├── Hero.tsx            # Имена, дата, фоновое фото
│   ├── Countdown.tsx       # Таймер обратного отсчёта
│   ├── InfoSection.tsx     # Где, когда, дресс-код, программа
│   ├── MapSection.tsx      # Яндекс/Google карта (iframe)
│   ├── Gallery.tsx         # Фотогалерея
│   ├── RsvpForm.tsx        # Форма подтверждения участия
│   └── Footer.tsx          # Подвал
├── lib/
│   ├── constants.ts        # Дата свадьбы, имена, тексты
│   └── emailjs.ts          # Конфиг EmailJS
└── public/
    ├── images/             # Фотографии пары
    └── og-image.jpg        # Превью для Telegram/WhatsApp
```

## Alternatives Considered

| Альтернатива | Против чего | Вердикт | Причина отказа |
|--------------|-------------|---------|----------------|
| **Gatsby** | Next.js | ❌ Отклонено | Экосистема Gatsby стагнирует (последний major-релиз давно). GraphQL-слой избыточен для статического одностраничника. Next.js SSG (`output: 'export'`) делает то же самое проще. Деплой на Vercel нативен для Next.js. |
| **Plain React (Vite)** | Next.js | ❌ Отклонено | Нет SSG из коробки — страница рендерится на клиенте (плохо для OG-тегов в Telegram/WhatsApp). Нет `next/image` для автооптимизации фото. Пришлось бы настраивать роутинг, SEO, image optimization вручную. |
| **CSS Modules** | Tailwind CSS | ❌ Отклонено | Медленнее в разработке — нужно переключаться между файлами .tsx и .module.css. Нет утилит для респонсива из коробки. Tailwind быстрее для одностраничника, где много визуала. |
| **styled-components** | Tailwind CSS | ❌ Отклонено | Runtime CSS-in-JS — увеличивает размер бандла и замедляет рендер. Проблемы с SSR в App Router. Tailwind — zero-runtime. |
| **moment.js** | date-fns | ❌ Отклонено | 300KB+ без tree-shaking. Проект заморожен (legacy). date-fns — 20KB за нужные функции, tree-shakeable, современный API. |
| **dayjs** | date-fns | ⚠️ Допустимо | dayjs (2KB) легче date-fns, но API беднее. Для countdown хватит обоих. Рекомендуем date-fns как более полное решение с лучшей типизацией. |
| **Formspree** | EmailJS | ⚠️ Допустимо | Formspree — альтернатива EmailJS. Бесплатный тариф: 50 submissions/мес. Проще настроить (просто endpoint), но лимит ниже. Выбрать EmailJS если гостей >50, Formspree если нужна максимальная простота. |
| **Google Sheets (через fetch)** | EmailJS | ⚠️ Допустимо | Можно отправлять RSVP в Google Таблицу через Apps Script. Плюс: удобно видеть все ответы в таблице. Минус: нужно настроить Apps Script, CORS. Можно использовать **совместно** с EmailJS. |

## What NOT to Use

| Технология | Причина | Что использовать вместо |
|------------|---------|------------------------|
| **Redux / Zustand / MobX** | Одностраничник без сложного состояния. RSVP-форма — это `useState` на 3–5 полей. Глобальный стейт-менеджер — overkill. | `useState` / `useReducer` из React |
| **jQuery** | Увеличивает бандл на 90KB. Все задачи решаются React + Framer Motion. Анахронизм в 2026. | React, Framer Motion |
| **GSAP** | Мощная, но тяжёлая (~50KB+). Императивный API сложнее в React. Для свадебного сайта достаточно fade-in/slide-up, которые Framer Motion делает декларативно. | Framer Motion |
| **Three.js / React Three Fiber** | 3D-графика не нужна для свадебного сайта. Огромный бандл, сложность, проблемы на мобильных. | CSS-анимации, Framer Motion |
| **Headless CMS (Sanity, Strapi, Contentful)** | Контент статический и не меняется. CMS добавляет сложность, API-запросы, зависимость от внешнего сервиса. Текст просто в `constants.ts`. | Статические данные в коде |
| **Prisma / Drizzle / любая ORM** | Нет базы данных. RSVP отправляется через EmailJS/Formspree. База данных — overkill для одностраничника. | EmailJS / Formspree |
| **NextAuth / Clerk** | Авторизация не нужна. Сайт публичный, гости не логинятся. | — |
| **i18next / next-intl** | Сайт на одном языке (русский). Мультиязычность явно вне скоупа проекта. | Хардкод текстов в `constants.ts` |
| **Storybook** | Overkill для 6–7 компонентов одностраничника. Окупается на больших проектах с дизайн-системой. | Разработка прямо в page.tsx |
| **Docker** | Деплой на Vercel — без контейнеров. Docker усложняет процесс для статического сайта. | `vercel deploy` или Git push |

## Version Compatibility

| Связка | Статус | Известные проблемы / Заметки |
|--------|--------|------------------------------|
| **Next.js 15 + React 19** | ✅ Совместимы | Next.js 15 требует React 19. Устанавливаются вместе через `create-next-app@latest`. |
| **Next.js 15 + Tailwind CSS 4** | ✅ Совместимы | `create-next-app` автоматически настраивает Tailwind 4. В Tailwind 4 конфигурация через CSS (`@theme`), а не `tailwind.config.ts`. Если шаблон использует старый конфиг — нужна миграция. |
| **Framer Motion 12 + React 19** | ✅ Совместимы | Framer Motion 12 полностью поддерживает React 19. Убедиться, что версия ≥ 11.15 (там добавлена поддержка React 19). |
| **Framer Motion + Next.js App Router** | ⚠️ Нюанс | Компоненты с анимациями должны быть **Client Components** (`"use client"` директива вверху файла). Server Components не поддерживают хуки и browser API. |
| **Tailwind CSS 4 + prettier-plugin-tailwindcss** | ⚠️ Проверить версию | Плагин `prettier-plugin-tailwindcss` версии ≥ 0.6.x поддерживает Tailwind 4. Использовать последнюю версию. |
| **@emailjs/browser 4 + Next.js SSG** | ✅ Совместимы | EmailJS работает только на клиенте. Вызывать `emailjs.send()` внутри `"use client"` компонента в обработчике формы. Не вызывать на сервере. |
| **next/image + `output: 'export'`** | ⚠️ Нюанс | При статическом экспорте (`output: 'export'` в `next.config.ts`) нужно указать `images: { unoptimized: true }` или использовать кастомный loader. На Vercel — работает без ограничений (сервер оптимизирует на лету). |
| **sharp + Windows** | ⚠️ Нюанс | На Windows `sharp` может требовать Visual C++ Build Tools. Если установка падает — запустить `npm install -D sharp --ignore-scripts` и полагаться на Vercel для оптимизации в production. |
| **Lucide React + Tree-shaking** | ✅ Работает | Импортировать иконки поимённо: `import { Heart } from 'lucide-react'`. НЕ импортировать `import * as icons` — это отключит tree-shaking. |
| **date-fns 4 + TypeScript 5** | ✅ Совместимы | date-fns 4 полностью типизирован. ESM-first. Работает с Next.js без дополнительной конфигурации. |

## Ключевые конфигурационные решения

### 1. Режим деплоя: Vercel (по умолчанию) vs Static Export

| Режим | `next/image` | RSVP | Рекомендация |
|-------|-------------|------|-------------|
| **Vercel (рекомендуется)** | Автооптимизация на лету | EmailJS из браузера | ✅ Рекомендуется — zero config |
| **Static Export** (`output: 'export'`) | Нужен `unoptimized: true` или внешний loader | EmailJS из браузера | ⚠️ Только если деплой НЕ на Vercel |

### 2. OG-теги (превью в Telegram/WhatsApp)

Использовать встроенный `metadata` API в `layout.tsx`:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'Свадьба Имя & Имя',
  description: 'Приглашаем вас на нашу свадьбу!',
  openGraph: {
    title: 'Свадьба Имя & Имя',
    description: 'Дата — Место',
    images: ['/og-image.jpg'],
  },
}
```

### 3. Шрифты

Использовать `next/font/google` для подключения шрифтов без layout shift:

```typescript
import { Playfair_Display, Inter } from 'next/font/google'
```

Рекомендуемые пары для свадебного сайта:
- **Заголовки:** Playfair Display, Cormorant Garamond, Great Vibes (курсив)
- **Основной текст:** Inter, Nunito, Lora

## Sources

1. [Next.js 15 Documentation — App Router](https://nextjs.org/docs) — официальная документация, SSG, metadata API, Image Optimization
2. [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs) — CSS-first конфигурация, новый движок Oxide
3. [Framer Motion Documentation](https://motion.dev/) — API `motion`, `whileInView`, `AnimatePresence`
4. [EmailJS Documentation](https://www.emailjs.com/docs/) — отправка email из браузера, бесплатный тариф
5. [Vercel Deployment Documentation](https://vercel.com/docs) — деплой Next.js, переменные окружения
6. [nextjs-wedding-invite (wzulfikar)](https://github.com/wzulfikar/nextjs-wedding-invite) — референсный шаблон, структура секций
7. [wedding-invitation (LeeKyuHyuk)](https://github.com/LeeKyuHyuk/wedding-invitation) — референс: минимализм, countdown
8. [sakeenah (mrofisr)](https://github.com/mrofisr/sakeenah) — референс: типографика, галерея
9. [react-wedding-card (uyu423)](https://github.com/uyu423/react-wedding-card) — референс: простая архитектура
10. [Bundlephobia](https://bundlephobia.com/) — анализ размеров пакетов (framer-motion, date-fns, moment.js)

---
*Stack research for: свадебный сайт-приглашение (wedding invitation website)*
*Researched: 2026-02-22*
