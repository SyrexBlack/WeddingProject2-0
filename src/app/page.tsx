import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { heroData, sectionOrder } from '@/lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <Container>
        <AnimatedSection>
          <SectionHeading>Свадебное приглашение</SectionHeading>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card className="mt-8">
            <h2 className="text-2xl font-calmius text-center mb-4">
              {heroData.coupleNames}
            </h2>
            <p className="text-center text-chocolate/70">{heroData.date}</p>
            <p className="text-center text-chocolate/60 mt-2">
              {heroData.invitationPhrase}
            </p>
          </Card>
        </AnimatedSection>

        <AnimatedSection variant="fade-in" delay={0.4}>
          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="outline">Подробнее</Button>
            <Button variant="filled" size="large">
              Подтвердить
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.6}>
          <div className="mt-8 text-center text-sm text-chocolate/50">
            {sectionOrder.length} секций на странице
          </div>
        </AnimatedSection>
      </Container>
    </main>
  );
}
