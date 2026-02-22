'use client';

import { heroData } from '@/lib/constants';
import { ParallaxSection } from '@/components/ui/ParallaxSection';

/**
 * Hero section — full-screen glassmorphism overlay with couple names, phrase, date.
 * Per CONTEXT.md: names -> phrase -> date order, no scroll indicator.
 * Background: SVG feTurbulence paper texture (via globals.css body::before) with subtle tint.
 * Parallax: background moves ~50% slower than content on scroll via ParallaxSection.
 */
export function HeroSection() {
  return (
    <ParallaxSection id="hero" className="h-screen bg-chocolate/5" speed={0.5}>
      <div className="h-full flex items-center justify-center">
        {/* Glassmorphism overlay */}
        <div className="backdrop-blur-md bg-white/30 rounded-2xl p-8 sm:p-12 shadow-lg border border-white/20 text-center max-w-lg mx-4">
          {/* Names */}
          <h1 className="text-5xl sm:text-7xl font-calmius text-chocolate">
            {heroData.coupleNames}
          </h1>

          {/* Invitation phrase */}
          <p className="text-lg sm:text-xl opacity-80 mt-4">
            {heroData.invitationPhrase}
          </p>

          {/* Date */}
          <p className="text-xl sm:text-2xl mt-6 text-alexandrite font-medium">
            {heroData.date}
          </p>
        </div>
      </div>
    </ParallaxSection>
  );
}
