import { Phone, Send } from 'lucide-react';
import { rsvpConfig } from '@/lib/constants';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export function OrganizerSection() {
  return (
    <AnimatedSection id="organizer" className="py-16 md:py-20">
      <Container>
        <SectionHeading>Контакт организатора</SectionHeading>

        <Card className="mt-8 max-w-lg mx-auto text-center">
          <p className="text-base md:text-lg text-chocolate/70">По всем организационным вопросам</p>

          <p className="mt-3 text-3xl md:text-4xl font-calmius text-chocolate tracking-wide">
            {rsvpConfig.contact.name}
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={`tel:${rsvpConfig.contact.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 text-base rounded-card font-calmius transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-alexandrite/40 focus:ring-offset-2 border border-alexandrite/35 text-alexandrite hover:bg-alexandrite/8"
            >
              <Phone size={17} strokeWidth={1.6} />
              {rsvpConfig.contact.phone}
            </a>

            <a
              href={rsvpConfig.contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 text-base rounded-card font-calmius transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-alexandrite/40 focus:ring-offset-2 border border-chocolate/15 text-chocolate/80 hover:bg-chocolate/5"
            >
              <Send size={17} strokeWidth={1.6} />
              Telegram
            </a>
          </div>
        </Card>
      </Container>
    </AnimatedSection>
  );
}
