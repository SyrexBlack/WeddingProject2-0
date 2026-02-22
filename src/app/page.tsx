import { SectionDots } from '@/components/SectionDots';
import { HeroSection } from '@/components/sections/HeroSection';
import { InfoSection } from '@/components/sections/InfoSection';
import { DresscodeSection } from '@/components/sections/DresscodeSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { MapSection } from '@/components/sections/MapSection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { SectionDivider } from '@/components/ui/SectionDivider';


export default function Home() {
  return (
    <>
      <SectionDots />
      <main>
        {/* 1. Hero section */}
        <HeroSection />

        {/* 2. Countdown — live countdown to wedding date */}
        <div className="section-cream">
          <CountdownSection />
        </div>

        <SectionDivider variant="leaf" />

        {/* 3. Info — «О торжестве» */}
        <div className="section-sand">
          <InfoSection />
        </div>

        <SectionDivider variant="dot" />

        {/* 4. Timeline — «Как пройдёт наш день» */}
        <div className="section-cream">
          <TimelineSection />
        </div>

        <SectionDivider variant="leaf" />

        {/* 5. Dress code — «Дресс-код» */}
        <div className="section-sage">
          <DresscodeSection />
        </div>

        <SectionDivider variant="dot" />

        {/* 6. RSVP — «Ждём вашего ответа» */}
        <div className="section-cream">
          <RSVPSection />
        </div>

        <SectionDivider variant="line" />

        {/* 7. Map — «Место проведения» */}
        <div className="section-sand">
          <MapSection />
        </div>

        {/* 8. Footer */}
        <FooterSection />
      </main>
    </>
  );
}
