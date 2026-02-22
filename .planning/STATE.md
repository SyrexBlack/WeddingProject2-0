# Project State

**Проект:** Wedding Invitation (Свадебная визитка)
**Текущая фаза:** 3 — Dynamic Components (Динамические компоненты)
**Текущий план:** Plan 2 of 2 complete
**Статус:** Phase Complete

## Ссылки на проект

См.: .planning/PROJECT.md (обновлён 2026-02-22)

**Основная ценность:** Гость открывает ссылку из мессенджера, видит красивое приглашение и подтверждает участие в один клик.
**Текущий фокус:** Phase 4 — External Integrations (RSVP форма, карта, EmailJS)

## Прогресс по фазам

| Фаза | Статус | Планы |
|------|--------|-------|
| 1. Foundation (Фундамент) | ● Complete | 3/3 done |
| 2. Static Sections (Статические секции) | ● Complete | 2/2 done |
| 3. Dynamic Components (Динамические компоненты) | ● Complete | 2/2 done |
| 4. External Integrations (Внешние интеграции) | ○ Pending | — |
| 5. Polish & Deploy (Полировка и деплой) | ○ Pending | — |
| 6. Enhanced Features (Расширенные фичи) | ○ Pending | — |

## Решения

| Решение | Контекст | Дата |
|---------|----------|------|
| Next.js 15 + Tailwind CSS 4 + Framer Motion 12 | Стек подтверждён исследованием, оптимален для одностраничника | 2026-02-22 |
| EmailJS для RSVP | 200 писем/мес бесплатно, достаточно для свадьбы, не нужен бэкенд | 2026-02-22 |
| Яндекс.Карты iframe | Бесплатно, без API-ключа, хорошая детализация для РФ | 2026-02-22 |
| Без бэкенда | Нулевой бюджет, serverless подход, данные в constants.ts | 2026-02-22 |
| Lucide React для иконок | Tree-shakeable, единый стиль, лёгкий вес | 2026-02-22 |
| date-fns 4 для countdown | Tree-shakeable, в 10x легче moment.js | 2026-02-22 |
| Next.js 16 вместо 15 | create-next-app@latest устанавливает v16.1.6 как текущую стабильную | 2026-02-22 |
| Cormorant Garamond как stand-in для Calmius | Визуально похожий тонкий serif с Cyrillic subset, вес 300 | 2026-02-22 |
| SVG feTurbulence для текстуры бумаги | Inline SVG шум вместо внешнего PNG — ноль HTTP-запросов | 2026-02-22 |

| Separate named exports в constants.ts | Tree-shaking, чистые импорты по секциям | 2026-02-22 |
| CSS gradient для линий SectionHeading | Чище чем pseudo-elements, линии с утончением | 2026-02-22 |
| AnimatedSection viewport.once: false | Анимации повторяются при каждом скролле по CONTEXT.md | 2026-02-22 |
| SectionDots без hero и footer | Точки навигации только для средних секций (countdown—map) | 2026-02-22 |
| Custom rAF smooth scroll | requestAnimationFrame с easeInOutCubic для стабильных 1200ms | 2026-02-22 |
| Server components для секций без интерактивности | Hero, Info, Dresscode, Footer — чистый рендеринг данных из constants | 2026-02-22 |
| Glassmorphism backdrop-blur-md bg-white/30 для Hero | Читаемость текста поверх SVG текстуры | 2026-02-22 |
| IntersectionObserver multi-threshold | Пороги [0.1, 0.3, 0.5] для точного определения активной секции | 2026-02-22 |
| Dual render для zigzag timeline | Отдельные mobile/desktop DOM блоки (md:hidden / hidden md:flex) | 2026-02-22 |
| Wine/Heart/UtensilsCrossed/Cake/Sparkles иконки | Уникальная Lucide-иконка на каждый этап таймлайна | 2026-02-22 |
| Inline card styling для countdown | Александритная рамка, спецразмеры чисел — не подходит generic Card | 2026-02-22 |
| isHydrated pattern для SSR-safe хуков | Статические значения до клиентского useEffect, без hydration mismatch | 2026-02-22 |
| Stagger viewport once:true для countdown | Вход по очереди один раз, далее только digit AnimatePresence | 2026-02-22 |
| ParallaxSection speed=0.5 — 30% y-range | Subtle depth без дискомфорта, useScroll/useTransform | 2026-02-22 |
| Conditional render для reduced-motion | Plain div вместо motion.div — полное отключение анимаций | 2026-02-22 |
| CSS reduced-motion media query как fallback | Ловит CSS-анимации вне Framer Motion контроля | 2026-02-22 |

## Блокеры

Нет.

## Ожидающие задачи

- [ ] Получить конкретную дату свадьбы для countdown и текстов
- [ ] Получить имена пары для Hero-секции и OG-тегов
- [ ] Получить адрес и координаты места проведения для карты
- [ ] Получить фотографии пары для галереи и Hero-секции
- [ ] Настроить EmailJS аккаунт (service ID, template ID, public key)

## Накопленный контекст

### Критические подводные камни (из исследования)

1. **Тяжёлые изображения** → `next/image`, WebP, lazy loading, blur placeholders
2. **Карта не загружается** → iframe без API-ключа, статическая картинка как fallback
3. **RSVP ломается при массовой рассылке** → лимиты EmailJS (200/мес), обработка ошибок, localStorage backup
4. **Анимации тормозят на бюджетных Android** → только `transform`/`opacity`, `once: true`, `prefers-reduced-motion`
5. **OG-теги не работают в мессенджерах** → статические meta, изображение 1200x630, тест через @WebpageBot

### Флаги исследований по фазам

- **Phase 4:** Проверить актуальные API EmailJS и формат iframe Яндекс.Карт
- **Phase 6:** Конверт-анимация — нетривиальная CSS/Framer Motion задача, требует прототипирования

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

---
*Последнее обновление: 2026-02-22 после Phase 4 context gathered*
*Остановлено на: Phase 4 context gathered*
*Файл для продолжения: .planning/phases/04-external-integrations/04-CONTEXT.md*
