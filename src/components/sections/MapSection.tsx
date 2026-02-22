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
    <AnimatedSection id="map" className="py-16">
      <Container>
        <SectionHeading>Место проведения</SectionHeading>

        <p className="text-center opacity-80 mt-2 mb-6">
          {mapData.address}
        </p>

        {/* Yandex Maps iframe with rounded corners */}
        <div className="overflow-hidden rounded-card">
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
        <div className="mt-6 text-center">
          <a
            href={mapData.navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-2 px-6 text-base rounded-card font-calmius border border-alexandrite text-alexandrite hover:bg-alexandrite hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-alexandrite/50 focus:ring-offset-2"
          >
            <MapPin size={18} className="mr-2" strokeWidth={1.5} />
            Построить маршрут
          </a>
        </div>
      </Container>
    </AnimatedSection>
  );
}
