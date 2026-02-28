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
  CalendarData,
} from '@/lib/types';

// ===========================
// Hero-секция
// ===========================

/** Hero: имена (амперсанд), дата прописью, поэтичная фраза */
export const heroData: HeroData = {
  coupleNames: 'Григорий & Полина',
  date: '16 мая 2026',
  venue: 'База отдыха «Ёлки»',
  invitationPhrase: 'Приглашаем вас разделить с нами этот особенный день',
  personalizedGreeting: 'Дорогой гость',
  backgroundImageDesktop: '/images/hero-desktop.jpg',
  backgroundImageMobile: '/images/hero-mobile.jpg',
};

// ===========================
// Обратный отсчёт
// ===========================

/** Countdown: дата ISO, timezone Moscow, сообщение после свадьбы */
export const countdownData: CountdownData = {
  weddingDate: '2026-05-16T15:00:00+05:00', // 15:00 по Перми
  timezone: 'Asia/Yekaterinburg',
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
    lines: ['16 мая 2026', 'Сбор гостей в 15:00'],
  },
  {
    type: 'where',
    title: 'Где',
    lines: ['База отдыха «Ёлки»', '7 минут езды от г. Чусовой'],
  },
];

// ===========================
// Программа дня
// ===========================

/** Таймлайн: ~5 этапов, время + название + описание */
export const timelineData: TimelineEvent[] = [
  { time: '15:00', title: 'Сбор гостей', description: 'Встреча с шампанским и лёгкими закусками' },
  { time: '16:00', title: 'Церемония', description: 'Торжественная регистрация брака' },
  { time: '17:00', title: 'Банкет', description: 'Праздничный ужин и поздравления' },
  { time: '20:00', title: 'Свадебный торт', description: 'Традиционное разрезание торта' },
  { time: '22:00', title: 'Свободное общение', description: 'Остаёмся с ночёвкой — можно отдыхать, общаться и наслаждаться вечером без спешки' },
];

// ===========================
// Дресс-код
// ===========================

/** Дресс-код: короткая фраза + 5 цветовых образцов палитры */
export const dressCodeData: DressCodeData = {
  description: 'Мы будем рады видеть Вас в предложенной цветовой гамме',
  palette: [
    { color: '#6b2128', name: 'Бордовый' },
    { color: '#051c2e', name: 'Ночной синий' },
    { color: '#f4d5aa', name: 'Ваниль' },
    { color: '#3b302c', name: 'Мокко' },
    { color: '#cea086', name: 'Терракота' },
    { color: '#243628', name: 'Тёмный лес' },
  ],
};

// ===========================
// Календарь
// ===========================

/** Calendar: данные для Google Calendar + ICS */
export const calendarData: CalendarData = {
  eventTitle: 'Свадьба Григорий и Полина',
  description: 'Приглашаем вас разделить с нами этот особенный день! База отдыха «Ёлки».',
  location: 'База отдыха «Ёлки», рядом с г. Чусовой',
  durationHours: 8,
  buttonLabel: 'Добавить в календарь',
  googleLabel: 'Google Calendar',
  yandexLabel: 'Яндекс Календарь (.ics)',
};

// ===========================
// RSVP конфигурация
// ===========================

/** RSVP: контакт для отображения при ошибке отправки */
export const rsvpConfig: { contact: ContactInfo } = {
  contact: {
    name: 'Эмилия',
    phone: '+79097336564',
    telegramUrl: 'https://t.me/SyrexIsBack',
    whatsappUrl: '',
  },
};

// ===========================
// Карта
// ===========================

/** Карта: iframe Яндекс.Карт, кнопка маршрута, адрес, координаты */
export const mapData: MapData = {
  iframeSrc:
    'https://yandex.ru/map-widget/v1/?ll=57.857352%2C58.308982&z=16&l=map&pt=57.857352%2C58.308982%2Cpm2rdm',
  address: 'База отдыха «Ёлки», рядом с г. Чусовой',
  coordinates: { lat: 58.308982, lng: 57.857352 },
  navigationUrl: 'https://yandex.ru/maps/?rtext=~58.308982%2C57.857352&rtt=auto',
};

// ===========================
// Footer
// ===========================

/** Footer: минимальный «Имена · Год» */
export const footerData: FooterData = {
  text: 'Григорий & Полина · 2026',
};

// ===========================
// Порядок секций
// ===========================

/** Порядок секций на странице */
export const sectionOrder: SectionConfig[] = [
  { id: 'hero', title: null },
  { id: 'countdown', title: 'До нашего дня' },
  { id: 'info', title: 'О торжестве' },
  { id: 'timeline', title: 'Как пройдёт наш день' },
  { id: 'dresscode', title: 'Дресс-код' },
  { id: 'organizer', title: 'Контакт организатора' },
  { id: 'rsvp', title: 'Ждём вашего ответа' },
  { id: 'map', title: 'Место проведения' },
  { id: 'footer', title: null },
];
