'use client';

import Image from 'next/image';
import { mapData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { MapPin } from 'lucide-react';
import heroBackground from '../../../public/images/hero-gemini.png';

/**
 * Map section — "Место проведения" with Yandex Maps iframe and route button.
 * Per CONTEXT.md: iframe embed without API key, route button opens navigation in new tab.
 */
export function MapSection() {
  return (
    <AnimatedSection id="map" className="relative py-20 md:py-28 pb-28 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Фон секции места проведения"
          fill
          sizes="100vw"
          quality={100}
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/50 z-[1]" />

      <Container className="relative z-10">
        <SectionHeading subtitle="Как нас найти" tone="light">
          Место проведения
        </SectionHeading>

        <p
          className="text-center text-white/90 mt-4 mb-8 text-base md:text-lg leading-relaxed"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}
        >
          {mapData.address}
        </p>

        <div className="overflow-hidden rounded-2xl shadow-card border border-white/20">
          <iframe
            src={mapData.iframeSrc}
            width="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Карта места проведения"
            className="block w-full h-[260px] sm:h-[300px] md:h-[350px]"
          />
        </div>

        <div className="mt-8 text-center">
          <a
            href={mapData.navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-3 px-8 text-base rounded-lg font-calmius tracking-wide border border-white/70 text-white hover:bg-white hover:text-chocolate shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
          >
            <MapPin size={18} className="mr-2" strokeWidth={1.5} />
            Построить маршрут
          </a>
        </div>
      </Container>
    </AnimatedSection>
  );
}
