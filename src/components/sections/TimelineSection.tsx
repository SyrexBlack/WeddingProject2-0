import { timelineData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import {
  Wine,
  Heart,
  UtensilsCrossed,
  Cake,
  Sparkles,
  Circle,
  type LucideIcon,
} from 'lucide-react';

/** Icon map: event title → Lucide component */
const iconMap: Record<string, LucideIcon> = {
  'Сбор гостей': Wine,
  'Церемония': Heart,
  'Банкет': UtensilsCrossed,
  'Свадебный торт': Cake,
  'Завершение вечера': Sparkles,
};

/**
 * Timeline section — "Как пройдёт наш день" with premium zigzag layout.
 */
export function TimelineSection() {
  return (
    <AnimatedSection id="timeline" className="py-20 md:py-28">
      <Container>
        <SectionHeading>Как пройдёт наш день</SectionHeading>

        <div className="relative mt-12">
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#243628]/85 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-16">
            {timelineData.map((event, index) => {
              const Icon = iconMap[event.title] ?? Circle;
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 bg-cream border-2 border-[#243628]/70 rounded-full flex items-center justify-center shadow-sm">
                    <Icon size={18} className="text-[#243628]" strokeWidth={1.5} />
                  </div>

                  <div className="md:hidden ml-12">
                    <div className="bg-white/90 rounded-lg p-4 shadow-sm border border-[#243628]/35 transition-all duration-300 hover:shadow-card">
                      <span className="text-alexandrite font-medium text-sm tracking-wide uppercase">
                        {event.time}
                      </span>
                      <h3 className="text-lg font-calmius font-medium mt-1 text-chocolate">{event.title}</h3>
                      {event.description && (
                        <p className="mt-2 text-sm text-chocolate/70 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center">
                    {isLeft ? (
                      <>
                        <div className="w-1/2 pr-10 text-right">
                          <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm border border-[#243628]/35 transition-all duration-300 hover:shadow-card">
                            <span className="text-alexandrite font-medium text-sm tracking-wide uppercase">
                              {event.time}
                            </span>
                            <h3 className="text-lg md:text-xl font-calmius font-medium mt-1 text-chocolate">{event.title}</h3>
                            {event.description && (
                              <p className="mt-2 text-sm text-chocolate/70 leading-relaxed">
                          {event.description}
                        </p>
                            )}
                          </div>
                        </div>
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        <div className="w-1/2" />
                        <div className="w-1/2 pl-10">
                          <div className="bg-white/90 rounded-lg p-4 md:p-5 shadow-sm border border-[#243628]/35 transition-all duration-300 hover:shadow-card">
                            <span className="text-alexandrite font-medium text-sm tracking-wide uppercase">
                              {event.time}
                            </span>
                            <h3 className="text-lg md:text-xl font-calmius font-medium mt-1 text-chocolate">{event.title}</h3>
                            {event.description && (
                              <p className="mt-2 text-sm text-chocolate/70 leading-relaxed">
                          {event.description}
                        </p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
