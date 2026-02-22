import { timelineData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
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
 * Timeline section — "Как пройдёт наш день" with zigzag layout.
 * Per CONTEXT.md: events alternate left-right on desktop, collapse to single column on mobile.
 * Each event has a unique Lucide icon in a bordered circle on the vertical line.
 */
export function TimelineSection() {
  return (
    <AnimatedSection id="timeline" className="py-16">
      <Container>
        <SectionHeading>Как пройдёт наш день</SectionHeading>

        {/* Timeline container */}
        <div className="relative mt-12">
          {/* Vertical line — desktop: centered, mobile: left */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-alexandrite"
            aria-hidden="true"
          />

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((event, index) => {
              const Icon = iconMap[event.title] ?? Circle;
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Icon circle on the line */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-white border-2 border-alexandrite rounded-full flex items-center justify-center shadow-sm"
                  >
                    <Icon size={16} className="text-alexandrite" strokeWidth={1.5} />
                  </div>

                  {/* Event content — mobile: always right of line; desktop: alternating */}
                  {/* Mobile layout */}
                  <div className="md:hidden ml-10">
                    <Card>
                      <span className="text-alexandrite font-medium text-sm">
                        {event.time}
                      </span>
                      <h3 className="text-base md:text-lg font-medium mt-1">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm opacity-70 mt-1">{event.description}</p>
                      )}
                    </Card>
                  </div>

                  {/* Desktop layout — zigzag */}
                  <div className="hidden md:flex items-center">
                    {isLeft ? (
                      <>
                        {/* Content on left */}
                        <div className="w-1/2 pr-10 text-right">
                          <Card>
                            <span className="text-alexandrite font-medium text-sm">
                              {event.time}
                            </span>
                            <h3 className="text-lg font-medium mt-1">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm opacity-70 mt-1">{event.description}</p>
                            )}
                          </Card>
                        </div>
                        {/* Empty right side */}
                        <div className="w-1/2" />
                      </>
                    ) : (
                      <>
                        {/* Empty left side */}
                        <div className="w-1/2" />
                        {/* Content on right */}
                        <div className="w-1/2 pl-10">
                          <Card>
                            <span className="text-alexandrite font-medium text-sm">
                              {event.time}
                            </span>
                            <h3 className="text-lg font-medium mt-1">{event.title}</h3>
                            {event.description && (
                              <p className="text-sm opacity-70 mt-1">{event.description}</p>
                            )}
                          </Card>
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
