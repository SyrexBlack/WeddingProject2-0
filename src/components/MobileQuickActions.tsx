'use client';

import { useMemo } from 'react';
import { CalendarPlus, MapPinned, MessageCircleHeart } from 'lucide-react';
import { calendarData, countdownData, mapData } from '@/lib/constants';

function toGoogleDateTime(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function buildGoogleCalendarUrl(): string {
  const start = new Date(countdownData.weddingDate);
  const end = new Date(start.getTime() + calendarData.durationHours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: calendarData.eventTitle,
    dates: `${toGoogleDateTime(start)}/${toGoogleDateTime(end)}`,
    details: calendarData.description,
    location: calendarData.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function MobileQuickActions() {
  const googleCalendarUrl = useMemo(() => buildGoogleCalendarUrl(), []);

  const handleRsvpClick = () => {
    const section = document.getElementById('rsvp');
    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="fixed bottom-safe-offset left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1rem)] max-w-xl lg:hidden">
      <div className="rounded-2xl border border-chocolate/10 bg-white/90 backdrop-blur-md shadow-[0_10px_40px_rgba(60,21,24,0.15)] px-1.5 py-1.5 pb-safe-bottom">
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={handleRsvpClick}
            className="quick-action-btn"
            aria-label="Перейти к RSVP"
          >
            <MessageCircleHeart size={17} strokeWidth={1.7} />
            <span>RSVP</span>
          </button>

          <a
            href={mapData.navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-btn"
            aria-label="Построить маршрут"
          >
            <MapPinned size={17} strokeWidth={1.7} />
            <span>Маршрут</span>
          </a>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-btn"
            aria-label="Добавить в календарь"
          >
            <CalendarPlus size={17} strokeWidth={1.7} />
            <span>Календарь</span>
          </a>
        </div>
      </div>
    </div>
  );
}
