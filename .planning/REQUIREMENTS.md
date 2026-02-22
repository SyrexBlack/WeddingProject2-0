# Requirements: Wedding Invitation (Свадебная визитка)

**Defined:** 2026-02-22
**Core Value:** Гость открывает ссылку из мессенджера, видит красивое приглашение со всей информацией и может подтвердить своё участие в один клик.

## v1 Requirements

Требования для первого релиза. Каждое привязано к фазе роадмапа.

### Фундамент (Foundation)

- [x] **FOUND-01**: Проект инициализирован на Next.js 15 (App Router) с TypeScript, Tailwind CSS 4, src-директорией
- [x] **FOUND-02**: Настроены шрифты через `next/font/google` без FOUT (заголовочный + текстовый шрифт)
- [x] **FOUND-03**: Создан `lib/constants.ts` с типизированными данными свадьбы (имена, дата, место, программа, дресс-код)
- [x] **FOUND-04**: Создана система типов TypeScript для всех данных (WeddingData, TimelineEvent, RSVPFormData)
- [x] **FOUND-05**: Настроены базовые UI-компоненты (Container, Button, Card, AnimatedSection)

### Контент (Content Sections)

- [ ] **CONT-01**: Hero-секция отображает имена пары, дату свадьбы и полноэкранное фоновое фото
- [ ] **CONT-02**: Обратный отсчёт показывает дни, часы, минуты, секунды до свадьбы с корректным timezone
- [ ] **CONT-03**: Информационная секция отображает карточки «Где», «Когда» с иконками Lucide
- [ ] **CONT-04**: Секция дресс-кода отображает текст и цветовую палитру свадьбы
- [ ] **CONT-05**: Секция программы дня отображает вертикальный таймлайн с временем и описанием каждого этапа
- [ ] **CONT-06**: Фотогалерея отображает сетку из 6-12 фото с lazy loading и лайтбоксом при клике
- [ ] **CONT-07**: Footer отображает контактную информацию и копирайт

### Интерактив (Interactive Features)

- [ ] **INTER-01**: Интерактивная карта (Яндекс.Карты iframe) показывает место проведения с возможностью построить маршрут
- [ ] **INTER-02**: RSVP-форма принимает имя, статус участия (приду/не приду/+1) и пожелания
- [ ] **INTER-03**: RSVP-форма отправляет данные через EmailJS или Google Sheets без бэкенда
- [ ] **INTER-04**: RSVP-форма показывает состояния: загрузка, успех, ошибка с визуальной обратной связью
- [ ] **INTER-05**: Секции появляются с анимацией fade-in при скролле через Framer Motion

### Оптимизация и деплой (Polish & Deploy)

- [ ] **DEPLOY-01**: Open Graph теги настроены — при отправке ссылки в Telegram/WhatsApp отображается карточка с фото и заголовком
- [ ] **DEPLOY-02**: Все изображения оптимизированы через `next/image` (WebP, lazy loading, blur placeholder)
- [ ] **DEPLOY-03**: Сайт корректно отображается на мобильных устройствах (от 320px) — mobile-first
- [ ] **DEPLOY-04**: Сайт задеплоен на Vercel с HTTPS и доступен по публичному URL
- [ ] **DEPLOY-05**: Lighthouse Performance score > 90 на мобильном

## v2 Requirements

Отложены до стабильного v1. Добавляются после проверки на реальных гостях.

### Расширенные фичи (Enhanced Features)

- **ENHANCE-01**: Персонализация через URL-параметры — каждый гость видит своё имя в приглашении (`?to=base64(Имя)`)
- **ENHANCE-02**: Анимация «Открыть приглашение» — конверт раскрывается при первом посещении
- **ENHANCE-03**: Фоновая музыка с кнопкой play/pause (не автовоспроизведение)
- **ENHANCE-04**: Конфетти/частицы при открытии приглашения (canvas-confetti)
- **ENHANCE-05**: Кнопка «Добавить в календарь» — генерация .ics файла и ссылки Google Calendar
- **ENHANCE-06**: Кнопки шеринга через мессенджеры (WhatsApp, Telegram, копировать ссылку)
- **ENHANCE-07**: Параллакс-эффекты на Hero и между секциями

### Будущее (Future)

- **FUTURE-01**: Таймлайн «Наша история любви» с ключевыми датами
- **FUTURE-02**: Гостевая книга — пожелания с отображением на сайте
- **FUTURE-03**: Переключение светлой/тёмной темы

## Out of Scope

Явно исключено. Документировано для предотвращения расширения скоупа.

| Feature | Reason |
|---------|--------|
| Аутентификация/логин гостей | Трение при открытии; гости не будут регистрироваться ради приглашения |
| CMS/админ-панель | One-time сайт, контент статический в `constants.ts` |
| Реал-тайм чат | Модерация, серверные затраты; есть WhatsApp/Telegram-группы |
| Платёжная система | Юридические сложности, комиссии; реквизиты текстом |
| Мультиязычность (i18n) | Аудитория русскоязычная; сайт на одном языке |
| Email-уведомления/напоминания | Требует email-сервис, шаблоны, GDPR; рассылка через мессенджеры |
| Дашборд управления гостями | Полноценный бэкенд; Google Sheets как «дашборд» |
| Загрузка фото от гостей | Хранилище, модерация; ссылка на Google Photos альбом |
| Мобильное приложение | Только веб; mobile-first достаточно |
| Docker/контейнеризация | Деплой на Vercel без контейнеров |

## Traceability

Какие фазы покрывают какие требования. Обновлено при создании роадмапа.

### v1 Requirements → Phases

| Требование | Фаза | Описание фазы | Статус |
|------------|------|---------------|--------|
| FOUND-01 | Phase 1 | Foundation (Фундамент) | Complete |
| FOUND-02 | Phase 1 | Foundation (Фундамент) | Complete |
| FOUND-03 | Phase 1 | Foundation (Фундамент) | Complete |
| FOUND-04 | Phase 1 | Foundation (Фундамент) | Complete |
| FOUND-05 | Phase 1 | Foundation (Фундамент) | Complete |
| CONT-01 | Phase 2 | Static Sections (Статические секции) | Pending |
| CONT-03 | Phase 2 | Static Sections (Статические секции) | Pending |
| CONT-04 | Phase 2 | Static Sections (Статические секции) | Pending |
| CONT-05 | Phase 2 | Static Sections (Статические секции) | Pending |
| CONT-07 | Phase 2 | Static Sections (Статические секции) | Pending |
| CONT-02 | Phase 3 | Dynamic Components (Динамические компоненты) | Pending |
| CONT-06 | Phase 3 | Dynamic Components (Динамические компоненты) | Pending |
| INTER-05 | Phase 3 | Dynamic Components (Динамические компоненты) | Pending |
| INTER-01 | Phase 4 | External Integrations (Внешние интеграции) | Pending |
| INTER-02 | Phase 4 | External Integrations (Внешние интеграции) | Pending |
| INTER-03 | Phase 4 | External Integrations (Внешние интеграции) | Pending |
| INTER-04 | Phase 4 | External Integrations (Внешние интеграции) | Pending |
| DEPLOY-01 | Phase 5 | Polish & Deploy (Полировка и деплой) | Pending |
| DEPLOY-02 | Phase 5 | Polish & Deploy (Полировка и деплой) | Pending |
| DEPLOY-03 | Phase 5 | Polish & Deploy (Полировка и деплой) | Pending |
| DEPLOY-04 | Phase 5 | Polish & Deploy (Полировка и деплой) | Pending |
| DEPLOY-05 | Phase 5 | Polish & Deploy (Полировка и деплой) | Pending |

### v2 Requirements → Phases

| Требование | Фаза | Описание фазы | Статус |
|------------|------|---------------|--------|
| ENHANCE-01 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-02 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-03 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-04 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-05 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-06 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |
| ENHANCE-07 | Phase 6 | Enhanced Features (Расширенные фичи) | Pending |

### Покрытие

- **v1 требований:** 22 всего
- **Привязано к фазам:** 22
- **Непокрыто:** 0 ✓
- **v2 требований (Phase 6):** 7 (опциональная фаза)

---
*Требования определены: 2026-02-22*
*Последнее обновление: 2026-02-22 после создания роадмапа*
