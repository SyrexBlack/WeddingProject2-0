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
 * Info section — "О торжестве" with stacked cards for "Когда" and "Где".
 * Per CONTEXT.md: single column, large centered Lucide icons above titles.
 */
export function InfoSection() {
  return (
    <AnimatedSection id="info" className="py-16">
      <Container>
        <SectionHeading>О торжестве</SectionHeading>
        <div className="space-y-6 mt-8">
          {infoCards.map((card) => {
            const Icon = iconMap[card.type];
            return (
              <Card key={card.type}>
                <Icon
                  size={44}
                  className="text-alexandrite mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg md:text-xl font-medium text-center mb-2">
                  {card.title}
                </h3>
                {card.lines.map((line, i) => (
                  <p key={i} className="text-center opacity-80">
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
