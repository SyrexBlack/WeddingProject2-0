# Project State

**Проект:** Wedding Invitation (Свадебная визитка)
**Текущий milestone:** v2.0 — Firebase + Telegram Bot
**Текущая фаза:** Not started (defining requirements)
**Текущий план:** —
**Статус:** Defining requirements

## Ссылки на проект

См.: .planning/PROJECT.md (обновлён 2026-02-24)

**Основная ценность:** Гость открывает ссылку из мессенджера, видит красивое приглашение и подтверждает участие в один клик.
**Текущий фокус:** Milestone v2.0 — Firebase Firestore для RSVP данных + Telegram бот для организатора

## Прогресс по фазам

### v1.0 (завершён)

| Фаза | Статус | Планы |
|------|--------|-------|
| 1. Foundation (Фундамент) | ● Complete | 3/3 done |
| 2. Static Sections (Статические секции) | ● Complete | 2/2 done |
| 3. Dynamic Components (Динамические компоненты) | ● Complete | 2/2 done |
| 4. External Integrations (Внешние интеграции) | ● Complete | 2/2 done |
| 5. Polish & Deploy (Полировка и деплой) | ● Complete | 3/3 done |
| 6. Enhanced Features (Расширенные фичи) | ○ Deferred | — |

### v2.0 (текущий)

| Фаза | Статус | Планы |
|------|--------|-------|
| TBD | ○ Pending | — |

## Решения

| Решение | Контекст | Дата |
|---------|----------|------|
| Firebase Firestore | Бесплатный Spark plan, хранение RSVP | 2026-02-24 |
| EmailJS остаётся | Параллельное дублирование на email | 2026-02-24 |
| Next.js API Routes (не Cloud Functions) | Проще, без дополнительных сервисов | 2026-02-24 |
| Telegram Bot API напрямую | Минимальный бот, HTTP API достаточно | 2026-02-24 |
| Бот только для организатора | Гостям бот не нужен | 2026-02-24 |
| Бюджет $0 | Бесплатные тарифы всех сервисов | 2026-02-24 |

## Блокеры

Нет.

## Ожидающие задачи

- [ ] Создать Firebase проект и получить конфигурацию (apiKey, authDomain, projectId)
- [ ] Создать Telegram бота через @BotFather и получить токен
- [ ] Завершить Vercel deploy (если не завершён)

## Накопленный контекст

### Из v1.0

- Next.js 16 + Tailwind 4 + Framer Motion 12 — рабочий стек
- EmailJS интеграция работает для RSVP
- RSVP форма: имя, статус (приду/не приду/+1), пожелания
- Типы определены в `src/lib/types.ts` (RSVPFormData)
- Константы в `src/lib/constants.ts`
- Mobile-first, OG-теги настроены, анимации с reduced-motion

### Критические подводные камни

1. **Firebase SDK размер** → использовать modular imports (`firebase/firestore`) для tree-shaking
2. **Telegram Bot API rate limits** → 30 msg/sec, достаточно для свадебного RSVP
3. **Vercel serverless cold starts** → API Routes могут иметь задержку ~1-2с на первый вызов
4. **Env variables** → Firebase config + Telegram token должны быть в Vercel env

## Метрики выполнения

| Фаза-План | Длительность | Задач | Файлов |
|-----------|-------------|-------|--------|
| 01-01 | 9 min | 2 | 12 |
| 01-02 | 3 min | 2 | 9 |
| 01-03 | 2 min | 2 | 2 |
| 02-01 | 4 min | 2 | 5 |
| 02-02 | 6 min | 2 | 4 |
| 03-01 | 3 min | 2 | 6 |
| 03-02 | 2 min | 2 | 5 |
| 04-01 | 2 min | 2 | 4 |
| 04-02 | 3 min | 2 | 2 |
| 05-01 | 4 min | 2 | 5 |
| 05-02 | 3 min | 2 | 7 |

---
*Последнее обновление: 2026-02-24 после старта Milestone v2.0*
