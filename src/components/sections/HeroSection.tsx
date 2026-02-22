'use client';

import Image from 'next/image';
import { heroData } from '@/lib/constants';
import { ParallaxSection } from '@/components/ui/ParallaxSection';
import heroDesktop from '../../../public/images/hero-desktop.jpg';
import heroMobile from '../../../public/images/hero-mobile.jpg';

/**
 * Hero section — full-screen with optimized background photo via next/image.
 * Per CONTEXT.md: names -> phrase -> date order, no scroll indicator.
 * Two images: landscape (desktop md+) and portrait (mobile <md).
 * Static imports enable automatic blur placeholder generation.
 * Parallax: background moves ~50% slower than content on scroll via ParallaxSection.
 *
 * Images are positioned absolute within the ParallaxSection's overflow-hidden container.
 * The z-10 foreground layer from ParallaxSection keeps the glassmorphism card above images.
 */
export function HeroSection() {
  return (
    <ParallaxSection id="hero" className="h-screen" speed={0.5}>
      {/* Background hero images — positioned absolute, behind z-10 content */}
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

      <div className="h-full flex items-center justify-center">
        {/* Glassmorphism overlay */}
        <div className="backdrop-blur-md bg-white/30 rounded-2xl p-5 md:p-12 shadow-lg border border-white/20 text-center max-w-lg mx-4">
          {/* Names */}
          <h1 className="text-2xl md:text-5xl font-calmius text-chocolate">
            {heroData.coupleNames}
          </h1>

          {/* Invitation phrase */}
          <p className="text-base md:text-xl opacity-80 mt-4">
            {heroData.invitationPhrase}
          </p>

          {/* Date */}
          <p className="text-lg md:text-2xl mt-6 text-alexandrite font-medium">
            {heroData.date}
          </p>
        </div>
      </div>
    </ParallaxSection>
  );
}
