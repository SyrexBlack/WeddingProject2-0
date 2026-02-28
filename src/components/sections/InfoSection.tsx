import { infoCards } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { Calendar, MapPin } from 'lucide-react';

/** Icon map: card type -> Lucide component */
const iconMap = {
  when: Calendar,
  where: MapPin,
} as const;

/**
 * Info section — "О торжестве" with two-column card layout.
 */
export function InfoSection() {
  return (
    <AnimatedSection id="info" className="py-20 md:py-28">
      <Container>
        <SectionHeading subtitle="Мы будем рады видеть вас">О торжестве</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {infoCards.map((card) => {
            const Icon = iconMap[card.type];
            return (
              <Card key={card.type}>
                <div className="w-12 h-[2px] bg-alexandrite/30 mx-auto mb-5" />
                <Icon
                  size={36}
                  className="text-alexandrite mx-auto mb-4 opacity-75"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl md:text-2xl font-calmius font-medium text-center mb-2 text-chocolate">
                  {card.title}
                </h3>
                {card.lines.map((line, i) => (
                  <p key={i} className="text-center text-chocolate/80 leading-relaxed">
                    {line}
                  </p>
                ))}
              </Card>
            );
          })}
        </div>
      </Container>
    </AnimatedSection>
  );
}
