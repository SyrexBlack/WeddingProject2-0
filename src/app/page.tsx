import { SectionDots } from '@/components/SectionDots';
import { HeroSection } from '@/components/sections/HeroSection';
import { InfoSection } from '@/components/sections/InfoSection';
import { DresscodeSection } from '@/components/sections/DresscodeSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { MapSection } from '@/components/sections/MapSection';
import { RSVPSection } from '@/components/sections/RSVPSection';


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
        <RSVPSection />

        {/* 7. Map — «Место проведения» */}
        <MapSection />

        {/* 8. Footer */}
        <FooterSection />
      </main>
    </>
  );
}
