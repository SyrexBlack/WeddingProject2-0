/**
 * Типы данных свадебного приглашения
 *
 * Канонический файл типов для всего проекта.
 * Все фазы импортируют типы из этого файла.
 */

// ===========================
// Идентификаторы секций
// ===========================

/** Идентификаторы секций для навигации SectionDots */
export type SectionId =
  | 'hero'
  | 'countdown'
  | 'info'
  | 'timeline'
  | 'dresscode'
  | 'rsvp'
  | 'map'
  | 'footer';

// ===========================
// Hero-секция
// ===========================

/** Данные Hero-секции — полноэкранная фотография с именами и датой */
export interface HeroData {
  /** Имена пары: «Анна & Михаил» (только имена, амперсанд) */
  coupleNames: string;
  /** Дата свадьбы прописью: «15 августа 2026» */
  date: string;
  /** Поэтичная фраза-приглашение */
  invitationPhrase: string;
  /** Путь к фото для десктопа */
  backgroundImageDesktop: string;
  /** Путь к фото для мобильных */
  backgroundImageMobile: string;
}

// ===========================
// Обратный отсчёт
// ===========================

/** Данные секции обратного отсчёта */
export interface CountdownData {
  /** ISO-строка даты свадьбы для таргета countdown */
  weddingDate: string;
  /** Таймзона: «Europe/Moscow» (захардкожена) */
  timezone: string;
  /** Сообщение после свадьбы: «Спасибо, что были с нами!» */
  expiredMessage: string;
}

// ===========================
// Информационные карточки
// ===========================

/** Карточка «О торжестве» — «Когда» или «Где» */
export interface InfoCard {
  /** Тип карточки */
  type: 'when' | 'where';
  /** Заголовок: «Когда» / «Где» */
  title: string;
  /** Строки текста */
  lines: string[];
}

// ===========================
// Программа дня (таймлайн)
// ===========================

/** Событие в программе дня */
export interface TimelineEvent {
  /** Время события: «15:00» */
  time: string;
  /** Название этапа: «Сбор гостей» */
  title: string;
  // Примечание: описание отсутствует по решению
  // («Каждый этап: время + название без описания»)
  // Маппинг иконок — в компоненте, не в данных
}

// ===========================
// Дресс-код
// ===========================

/** Цветовой образец палитры дресс-кода */
export interface ColorSwatch {
  /** Цвет в hex-формате */
  color: string;
  /** Название цвета на русском */
  name: string;
}

/** Данные секции дресс-кода */
export interface DressCodeData {
  /** Краткая фраза дресс-кода */
  description: string;
  /** Палитра из 4–5 цветовых образцов */
  palette: ColorSwatch[];
}

// ===========================
// RSVP-форма
// ===========================

/** Статус участия гостя */
export type RSVPStatus = 'attending' | 'not-attending';

/** Данные формы подтверждения участия */
export interface RSVPFormData {
  /** Имя (обязательное) */
  firstName: string;
  /** Фамилия (обязательное) */
  lastName: string;
  /** Статус: «Приду» / «Не смогу прийти» */
  status: RSVPStatus;
  /** Приду с парой (только при status = attending) */
  plusOne: boolean;
  /** Пожелания молодожёнам (обязательное) */
  wishes: string;
}

// ===========================
// Контактная информация
// ===========================

/** Контакт для отображения при ошибке RSVP */
export interface ContactInfo {
  /** Телефон */
  phone: string;
  /** Ссылка на Telegram */
  telegramUrl: string;
  /** Ссылка на WhatsApp */
  whatsappUrl: string;
}

// ===========================
// Карта
// ===========================

/** Данные секции карты (Яндекс.Карты) */
export interface MapData {
  /** URL iframe Яндекс.Карт */
  iframeSrc: string;
  /** Полный адрес текстом */
  address: string;
  /** Координаты места */
  coordinates: {
    lat: number;
    lng: number;
  };
  /** URL для построения маршрута в Яндекс.Картах */
  navigationUrl: string;
}

// ===========================
// Footer
// ===========================

/** Данные футера */
export interface FooterData {
  /** Текст: «Анна & Михаил · 2026» */
  text: string;
}

// ===========================
// Общий тип данных свадьбы
// ===========================

/** Мастер-тип со всеми данными свадьбы */
export interface WeddingData {
  hero: HeroData;
  countdown: CountdownData;
  infoCards: InfoCard[];
  timeline: TimelineEvent[];
  dressCode: DressCodeData;
  rsvp: {
    contact: ContactInfo;
  };
  map: MapData;
  footer: FooterData;
}

// ===========================
// Конфигурация секций
// ===========================

/** Конфигурация секции для заголовков и навигации */
export interface SectionConfig {
  /** Идентификатор секции */
  id: SectionId;
  /** Заголовок секции (null для countdown — без заголовка) */
  title: string | null;
}
