/**
 * Данные свадебного приглашения
 *
 * Канонический файл констант — все секции импортируют данные отсюда.
 * Placeholder-данные: заменить реальными при получении.
 */

import type {
  HeroData,
  CountdownData,
  InfoCard,
  TimelineEvent,
  DressCodeData,
  ContactInfo,
  MapData,
  FooterData,
  SectionConfig,
} from '@/lib/types';

// ===========================
// Hero-секция
// ===========================

/** Hero: имена (амперсанд), дата прописью, поэтичная фраза */
export const heroData: HeroData = {
  coupleNames: 'Анна & Михаил',
  date: '15 августа 2026',
  invitationPhrase: 'Приглашаем вас разделить с нами этот особенный день',
  backgroundImageDesktop: '/images/hero-desktop.jpg',
  backgroundImageMobile: '/images/hero-mobile.jpg',
};

// ===========================
// Обратный отсчёт
// ===========================

/** Countdown: дата ISO, timezone Moscow, сообщение после свадьбы */
export const countdownData: CountdownData = {
  weddingDate: '2026-08-15T15:00:00+03:00', // 15:00 по Москве
  timezone: 'Europe/Moscow',
  expiredMessage: 'Спасибо, что были с нами!',
};

// ===========================
// Информационные карточки
// ===========================

/** Инфо-карточки: «Когда» и «Где», одно место проведения */
export const infoCards: InfoCard[] = [
  {
    type: 'when',
    title: 'Когда',
    lines: ['15 августа 2026', 'Сбор гостей в 15:00'],
  },
  {
    type: 'where',
    title: 'Где',
    lines: ['Усадьба «Архангельское»', 'Московская область, Красногорский район'],
  },
];

// ===========================
// Программа дня
// ===========================

/** Таймлайн: ~5 этапов, время + название, без описания */
export const timelineData: TimelineEvent[] = [
  { time: '15:00', title: 'Сбор гостей' },
  { time: '16:00', title: 'Церемония' },
  { time: '17:00', title: 'Банкет' },
  { time: '20:00', title: 'Свадебный торт' },
  { time: '22:00', title: 'Завершение вечера' },
];

// ===========================
// Дресс-код
// ===========================

/** Дресс-код: короткая фраза + 5 цветовых образцов палитры */
export const dressCodeData: DressCodeData = {
  description: 'Мы будем рады видеть вас в нарядах пастельных и природных оттенков',
  palette: [
    { color: '#598c74', name: 'Александрит' },
    { color: '#D4C5A9', name: 'Шампань' },
    { color: '#C9B99A', name: 'Песочный' },
    { color: '#E8D5C4', name: 'Пудровый' },
    { color: '#B8C5B2', name: 'Шалфей' },
  ],
};

// ===========================
// RSVP конфигурация
// ===========================

/** RSVP: контакт для отображения при ошибке отправки */
export const rsvpConfig: { contact: ContactInfo } = {
  contact: {
    phone: '+7 (999) 123-45-67',
    telegramUrl: 'https://t.me/example',
    whatsappUrl: 'https://wa.me/79991234567',
  },
};

// ===========================
// Карта
// ===========================

/** Карта: iframe Яндекс.Карт, кнопка маршрута, адрес, координаты */
export const mapData: MapData = {
  iframeSrc:
    'https://yandex.ru/map-widget/v1/?ll=37.284722%2C55.784444&z=15&l=map&pt=37.284722%2C55.784444%2Cpm2rdm',
  address: 'Усадьба «Архангельское», Московская область, Красногорский район',
  coordinates: { lat: 55.784444, lng: 37.284722 },
  navigationUrl: 'https://yandex.ru/maps/?rtext=~55.784444%2C37.284722&rtt=auto',
};

// ===========================
// Footer
// ===========================

/** Footer: минимальный «Имена · Год» */
export const footerData: FooterData = {
  text: 'Анна & Михаил · 2026',
};

// ===========================
// Порядок секций
// ===========================

/** Порядок секций на странице (8 секций) */
export const sectionOrder: SectionConfig[] = [
  { id: 'hero', title: null },
  { id: 'countdown', title: null }, // без заголовка
  { id: 'info', title: 'О торжестве' },
  { id: 'timeline', title: 'Как пройдёт наш день' },
  { id: 'dresscode', title: 'Дресс-код' },
  { id: 'rsvp', title: 'Ждём вашего ответа' },
  { id: 'map', title: 'Место проведения' },
  { id: 'footer', title: null },
];
