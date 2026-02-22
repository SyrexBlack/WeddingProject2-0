import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionDots } from '@/components/SectionDots';
import { HeroSection } from '@/components/sections/HeroSection';
import { InfoSection } from '@/components/sections/InfoSection';
import { DresscodeSection } from '@/components/sections/DresscodeSection';
import { FooterSection } from '@/components/sections/FooterSection';
import {
  countdownData,
  timelineData,
  sectionOrder,
} from '@/lib/constants';

export default function Home() {
  return (
    <>
      <SectionDots />
      <main>
        {/* 1. Hero section */}
        <HeroSection />

        {/* 2. Countdown — no heading per CONTEXT.md */}
        <AnimatedSection id="countdown" className="py-16">
          <Container>
            <p className="text-center text-xl opacity-60">
              Countdown будет реализован в Phase 3
            </p>
          </Container>
        </AnimatedSection>

        {/* 3. Info — «О торжестве» */}
        <InfoSection />

        {/* 4. Timeline — «Как пройдёт наш день» */}
        <AnimatedSection id="timeline" className="py-16">
          <Container>
            <SectionHeading>Как пройдёт наш день</SectionHeading>
            <div className="mt-8 space-y-4">
              {timelineData.map((event, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-alexandrite font-medium w-16">
                    {event.time}
                  </span>
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
            <p className="text-sm opacity-40 mt-4">
              Полный таймлайн с зигзагом будет в Phase 2 Plan 02
            </p>
          </Container>
        </AnimatedSection>

        {/* 5. Dress code — «Дресс-код» */}
        <DresscodeSection />

        {/* 6. RSVP — «Ждём вашего ответа» */}
        <AnimatedSection id="rsvp" className="py-16">
          <Container>
            <SectionHeading>Ждём вашего ответа</SectionHeading>
            <div className="mt-8 text-center">
              <p className="opacity-60 mb-4">
                RSVP-форма будет реализована в Phase 4
              </p>
              <Button variant="filled" size="large">
                Подтвердить
              </Button>
            </div>
          </Container>
        </AnimatedSection>

        {/* 7. Map — «Место проведения» */}
        <AnimatedSection id="map" className="py-16">
          <Container>
            <SectionHeading>Место проведения</SectionHeading>
            <div className="mt-8 text-center">
              <p className="opacity-60 mb-4">
                Карта будет добавлена в Phase 4
              </p>
              <Button variant="outline">Построить маршрут</Button>
            </div>
          </Container>
        </AnimatedSection>

        {/* 8. Footer */}
        <FooterSection />
      </main>
    </>
  );
}
