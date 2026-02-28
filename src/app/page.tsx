import { SectionDots } from '@/components/SectionDots';
import { MobileQuickActions } from '@/components/MobileQuickActions';
import { HeroSection } from '@/components/sections/HeroSection';
import { InfoSection } from '@/components/sections/InfoSection';
import { DresscodeSection } from '@/components/sections/DresscodeSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { MapSection } from '@/components/sections/MapSection';
import { OrganizerSection } from '@/components/sections/OrganizerSection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { SectionDivider } from '@/components/ui/SectionDivider';

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function normalizeGuestParam(value: string | string[] | undefined): string {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return '';
  }

  return rawValue
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 50);
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const guestName = normalizeGuestParam(params?.guest);

  return (
    <>
      <SectionDots />
      <MobileQuickActions />
      <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <HeroSection guestName={guestName} />

        <div className="section-cream">
          <CountdownSection />
        </div>

        <SectionDivider variant="leaf" />

        <div className="section-sand">
          <InfoSection />
        </div>

        <SectionDivider variant="dot" />

        <div className="section-cream">
          <TimelineSection />
        </div>

        <SectionDivider variant="leaf" />

        <div className="section-sage">
          <DresscodeSection />
        </div>

        <SectionDivider variant="dot" />

        <div className="section-cream">
          <OrganizerSection />
        </div>

        <SectionDivider variant="line" />

        <div className="section-cream">
          <RSVPSection guestName={guestName} />
        </div>

        <SectionDivider variant="line" />

        <div className="section-sand">
          <MapSection />
        </div>

        <FooterSection />
      </main>
    </>
  );
}
