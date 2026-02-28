'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { CalendarDays } from 'lucide-react';
import { heroData, calendarData, countdownData } from '@/lib/constants';
import { ParallaxSection } from '@/components/ui/ParallaxSection';
import { Button } from '@/components/ui/Button';
import heroBackground from '../../../public/images/hero-gemini.png';

interface HeroSectionProps {
  guestName?: string;
}

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

/**
 * Hero section — fullscreen with photo background, dark overlay, white text.
 */
export function HeroSection({ guestName }: HeroSectionProps) {
  const normalizedGuestName = guestName?.trim() || '';

  const greeting = normalizedGuestName
    ? `${heroData.personalizedGreeting}, ${normalizedGuestName}!`
    : heroData.personalizedGreeting;

  const googleCalendarUrl = useMemo(() => buildGoogleCalendarUrl(), []);

  return (
    <ParallaxSection id="hero" className="min-h-screen min-h-[100svh] md:min-h-dvh" speed={0.5}>
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Свадебное фото"
          fill
          priority
          sizes="100vw"
          quality={100}
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45 z-[1]" />

      <div className="relative z-10 min-h-screen min-h-[100svh] md:min-h-dvh flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <p
            className="text-sm sm:text-base text-white/85 tracking-[0.14em] uppercase mb-5"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
          >
            {greeting}
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-calmius text-white tracking-wide leading-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            {heroData.coupleNames}
          </h1>

          <div className="w-16 h-[1px] bg-white/60 mx-auto my-5" />

          <p
            className="text-base sm:text-lg md:text-xl text-white/90 italic tracking-wide leading-relaxed max-w-[32ch] mx-auto"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
          >
            {heroData.invitationPhrase}
          </p>

          <p
            className="text-lg md:text-2xl text-white/95 font-medium tracking-[0.2em] uppercase mt-6"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
          >
            {heroData.date}
          </p>

          <p
            className="text-sm text-white/80 tracking-[0.18em] uppercase mt-2"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            {heroData.venue}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="normal"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[220px] border-white text-white hover:bg-white hover:text-chocolate"
            >
              <CalendarDays size={18} strokeWidth={1.5} />
              {calendarData.googleLabel}
            </Button>

            <a
              href="/api/calendar"
              className="inline-flex items-center justify-center gap-2 py-2 px-6 text-base rounded-card font-calmius transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 border border-white/70 text-white hover:bg-white/15 w-full sm:w-auto min-w-[220px]"
            >
              <CalendarDays size={18} strokeWidth={1.5} />
              {calendarData.yandexLabel}
            </a>
          </div>
        </div>
      </div>

    </ParallaxSection>
  );
}
