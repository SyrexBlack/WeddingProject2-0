import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionDots } from '@/components/SectionDots';
import {
  heroData,
  countdownData,
  infoCards,
  timelineData,
  dressCodeData,
  footerData,
  sectionOrder,
} from '@/lib/constants';

export default function Home() {
  return (
    <>
      <SectionDots />
      <main>
        {/* 1. Hero section — full screen placeholder */}
        <section
          id="hero"
          className="h-screen flex items-center justify-center bg-chocolate/10 relative"
        >
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl mb-4">{heroData.coupleNames}</h1>
            <p className="text-xl sm:text-2xl mb-2">{heroData.date}</p>
            <p className="text-lg opacity-70">{heroData.invitationPhrase}</p>
          </div>
          <p className="absolute bottom-4 text-sm opacity-40">
            Hero фото будет добавлено в Phase 2
          </p>
        </section>

        {/* 2. Countdown — no heading per CONTEXT.md */}
        <AnimatedSection id="countdown" className="py-16">
          <Container>
            <p className="text-center text-xl opacity-60">
              Countdown будет реализован в Phase 3
            </p>
          </Container>
        </AnimatedSection>

        {/* 3. Info — «О торжестве» */}
        <AnimatedSection id="info" className="py-16">
          <Container>
            <SectionHeading>О торжестве</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {infoCards.map((card) => (
                <Card key={card.type}>
                  <h3 className="text-xl font-medium mb-2">{card.title}</h3>
                  {card.lines.map((line, i) => (
                    <p key={i} className="opacity-80">
                      {line}
                    </p>
                  ))}
                </Card>
              ))}
            </div>
          </Container>
        </AnimatedSection>

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
              Полный таймлайн с зигзагом будет в Phase 2
            </p>
          </Container>
        </AnimatedSection>

        {/* 5. Dress code — «Дресс-код» */}
        <AnimatedSection id="dresscode" className="py-16">
          <Container>
            <SectionHeading>Дресс-код</SectionHeading>
            <p className="text-center mt-6 mb-4">{dressCodeData.description}</p>
            <div className="flex justify-center gap-4">
              {dressCodeData.palette.map((swatch) => (
                <div key={swatch.name} className="text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <span className="text-xs opacity-70">{swatch.name}</span>
                </div>
              ))}
            </div>
          </Container>
        </AnimatedSection>

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
        <footer id="footer" className="py-8 text-center opacity-60">
          <p>{footerData.text}</p>
        </footer>
      </main>
    </>
  );
}
