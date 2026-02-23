import { heroData } from '@/lib/constants';

/**
 * Hero section — solid alexandrite background with white text.
 * Clean, elegant, no photo background.
 */
export function HeroSection() {
  return (
    <section id="hero" className="bg-alexandrite py-24 md:py-32">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-7xl font-calmius text-white tracking-wider">
          {heroData.coupleNames}
        </h1>

        <div className="w-16 h-[1px] bg-white/60 mx-auto my-4" />

        <p className="text-sm md:text-xl text-white/90 italic tracking-wide whitespace-nowrap">
          {heroData.invitationPhrase}
        </p>

        <p className="text-lg md:text-2xl text-white/95 font-medium tracking-widest uppercase mt-4">
          {heroData.date}
        </p>

        <p className="text-sm text-white/70 tracking-widest uppercase mt-2">
          {heroData.venue}
        </p>
      </div>
    </section>
  );
}
