# Wedding Invitation (Свадебная визитка)

## What This Is

Персональный свадебный веб-сайт (одностраничная визитка-приглашение) для пары с серверной частью. Сайт содержит всю информацию о торжестве — дату, время, место, программу дня, дресс-код, интерактивную карту и форму RSVP. Данные RSVP сохраняются в Firebase Firestore, а организатор получает уведомления и управляет списком гостей через Telegram-бот. Ориентирован на мобильные устройства (гости получают ссылку через мессенджеры).

## Core Value

Гость открывает ссылку из мессенджера, видит красивое приглашение со всей информацией и может подтвердить своё участие в один клик.

## Current Milestone: v2.0 Firebase + Telegram Bot

**Goal:** RSVP данные сохраняются в Firebase Firestore, организатор получает мгновенные уведомления и управляет списком гостей через Telegram-бот с inline-кнопками.

**Target features:**
- Firebase Firestore как хранилище RSVP данных (параллельно с EmailJS)
- Next.js API Routes для записи в Firestore и отправки уведомлений в Telegram
- Telegram бот для организатора: уведомления при RSVP, список гостей, детали по каждому гостю
- Inline-кнопки для навигации по списку гостей

## Requirements

### Validated

- ✓ Hero-секция с именами пары, датой и фоновым фото — Phase 2
- ✓ Информационные блоки: «Где», «Когда», «Дресс-код», «Программа дня» — Phase 2
- ✓ Обратный отсчёт (таймер) до начала торжества — Phase 3
- ✓ Интерактивная карта (Yandex Maps) с меткой места проведения — Phase 4
- ✓ Форма RSVP с отправкой через EmailJS — Phase 4
- ✓ Open Graph теги для превью в Telegram/WhatsApp — Phase 5
- ✓ Оптимизация изображений (next/image) — Phase 5
- ✓ Mobile responsive (от 320px) — Phase 5
- ✓ Анимации при скролле (Framer Motion) — Phase 3

### Active

- [ ] Firebase Firestore для хранения RSVP данных
- [ ] Next.js API Route для записи в Firestore
- [ ] Next.js API Route для отправки уведомлений в Telegram
- [ ] Telegram бот с inline-кнопками для управления списком гостей
- [ ] Уведомления организатору при каждом заполнении RSVP

### Out of Scope

- Мультиязычность — визитка на одном языке (русский)
- Личный кабинет / авторизация гостей — не нужна для одностраничника
- Мобильное приложение — только веб
- CMS / админ-панель — контент статический
- Платёжная система — сбор денег не через сайт
- Галерея фотографий — убрана из проекта
- Telegram бот для гостей — бот только для организатора
- Firebase Cloud Functions — используем Next.js API Routes вместо триггеров
- Удаление EmailJS — оставляем параллельно с Firebase как дублирование

## Context

**Тип проекта:** Brownfield — добавление серверной части (Firebase + Telegram) к существующему одностраничному свадебному сайту.

**Существующий стек:** Next.js 16, Tailwind CSS 4, Framer Motion 12, EmailJS, Яндекс.Карты iframe, Lucide React.

**Существующая архитектура:** 
- Одностраничник с секциями: Hero, Info, Dresscode, Timeline, Countdown, Map, RSVP, Footer
- Данные в `lib/constants.ts`, типы в `lib/types.ts`
- RSVP форма отправляет через EmailJS (`@emailjs/browser`)
- Деплой на Vercel (в процессе)

**Целевая аудитория:** Гости свадьбы (сайт), организатор (Telegram бот).

**Репозиторий GitHub:** https://github.com/SyrexBlack/WeddingProject2-0

## Constraints

- **Стек:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion 12, Lucide React
- **Новые зависимости:** Firebase SDK (`firebase`), Telegram Bot API (через HTTP, без библиотек)
- **Бэкенд:** Next.js API Routes (serverless) — без отдельного сервера
- **БД:** Firebase Firestore (бесплатный Spark plan — 1 GiB storage, 50K reads/day)
- **Хостинг:** Vercel (бесплатный tier)
- **Бюджет:** $0 — бесплатные тарифы Firebase, Vercel, Telegram Bot API
- **Устройства:** Mobile-first для сайта, Telegram для бота

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js как основа | SSG для скорости, экосистема React, деплой на Vercel | ✓ Working (Next.js 16) |
| Tailwind CSS для стилизации | Быстрая разработка, mobile-first утилиты | ✓ Working (Tailwind 4) |
| Framer Motion для анимаций | Декларативный API, хорошая интеграция с React | ✓ Working (AnimatedSection) |
| EmailJS для RSVP email | Дублирование данных на email, 200 писем/мес бесплатно | ✓ Working |
| Firebase Firestore для хранения | Бесплатный Spark plan, realtime capabilities, хороший SDK | — Pending |
| Next.js API Route для Telegram | Проще чем Cloud Functions, без дополнительных сервисов | — Pending |
| Telegram Bot API напрямую | Минимальный бот, HTTP API достаточно, без лишних зависимостей | — Pending |
| Glassmorphism для Hero overlay | backdrop-blur-md + bg-white/30, элегантный стиль поверх текстуры | ✓ Shipped Phase 2 |
| SVG feTurbulence для текстуры фона | Inline SVG шум вместо PNG — ноль HTTP-запросов | ✓ Shipped Phase 1 |
| Zigzag timeline layout | Чередование лево-право на десктопе, линейный на мобильном | ✓ Shipped Phase 2 |

---
*Last updated: 2026-02-24 after Milestone v2.0 start*
