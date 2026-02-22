import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionDots } from '@/components/SectionDots';
import { HeroSection } from '@/components/sections/HeroSection';
import { InfoSection } from '@/components/sections/InfoSection';
import { DresscodeSection } from '@/components/sections/DresscodeSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CountdownSection } from '@/components/sections/CountdownSection';


export default function Home() {
  return (
    <>
      <SectionDots />
      <main>
        {/* 1. Hero section */}
        <HeroSection />

        {/* 2. Countdown — live countdown to wedding date */}
        <CountdownSection />

        {/* 3. Info — «О торжестве» */}
        <InfoSection />

        {/* 4. Timeline — «Как пройдёт наш день» */}
        <TimelineSection />

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
