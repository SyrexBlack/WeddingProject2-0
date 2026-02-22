import { mapData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { MapPin } from 'lucide-react';

/**
 * Map section — "Место проведения" with Yandex Maps iframe and route button.
 * Per CONTEXT.md: iframe embed without API key, route button opens navigation in new tab.
 */
export function MapSection() {
  return (
    <AnimatedSection id="map" className="py-20 md:py-28">
      <Container>
        <SectionHeading subtitle="Как нас найти">Место проведения</SectionHeading>

        <p className="text-center opacity-70 mt-4 mb-8 text-base md:text-lg">
          {mapData.address}
        </p>

        {/* Yandex Maps iframe with card-like container */}
        <div className="overflow-hidden rounded-2xl shadow-card border border-chocolate/5">
          <iframe
            src={mapData.iframeSrc}
            width="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Карта места проведения"
            className="block w-full h-[200px] md:h-[350px]"
          />
        </div>

        {/* Route button — opens Yandex Maps navigation in new tab */}
        <div className="mt-8 text-center">
          <a
            href={mapData.navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-3 px-8 text-base rounded-lg font-calmius tracking-wide border border-alexandrite text-alexandrite hover:bg-alexandrite hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-alexandrite/50 focus:ring-offset-2"
          >
            <MapPin size={18} className="mr-2" strokeWidth={1.5} />
            Построить маршрут
          </a>
        </div>
      </Container>
    </AnimatedSection>
  );
}
