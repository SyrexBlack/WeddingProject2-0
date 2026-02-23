'use client';

import Image from 'next/image';
import { heroData } from '@/lib/constants';
import { ParallaxSection } from '@/components/ui/ParallaxSection';
import heroDesktop from '../../../public/images/hero-desktop.jpg';
import heroMobile from '../../../public/images/hero-mobile.jpg';

/**
 * Hero section — dramatic fullscreen with text overlay on photo.
 * Dark gradient overlay for readability, text-shadow on all text elements.
 * Per CONTEXT.md: names -> phrase -> date order.
 * Two images: landscape (desktop md+) and portrait (mobile <md).
 * Static imports enable automatic blur placeholder generation.
 * Parallax: background moves ~50% slower than content on scroll via ParallaxSection.
 * Scroll indicator at bottom with subtle bounce animation.
 */
export function HeroSection() {
  return (
    <ParallaxSection id="hero" className="py-24 md:py-32" speed={0.5}>
      {/* Background hero images */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroDesktop}
          alt="Свадебное фото"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          className="hidden md:block object-cover"
        />
        <Image
          src={heroMobile}
          alt="Свадебное фото"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          className="md:hidden object-cover"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-[1]" />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1
          className="text-4xl md:text-7xl font-calmius text-white tracking-wider"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          {heroData.coupleNames}
        </h1>

        <div className="w-16 h-[1px] bg-white/60 mx-auto my-4" />

        <p
          className="text-sm md:text-xl text-white/90 italic tracking-wide whitespace-nowrap"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
        >
          {heroData.invitationPhrase}
        </p>

        <p
          className="text-lg md:text-2xl text-white/95 font-medium tracking-widest uppercase mt-4"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
        >
          {heroData.date}
        </p>

        <p
          className="text-sm text-white/70 tracking-widest uppercase mt-2"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
        >
          {heroData.venue}
        </p>
      </div>
    </ParallaxSection>
  );
}
