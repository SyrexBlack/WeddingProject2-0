'use client';

import { useState, useEffect, useCallback } from 'react';
import { sectionOrder } from '@/lib/constants';

/**
 * Right-side fixed dot navigation for section scrolling.
 *
 * Per CONTEXT.md:
 * - Dots on right side, clickable with smooth scroll (~1200ms)
 * - Active dot: filled alexandrite
 * - Inactive: light alexandrite
 * - Hidden on mobile
 */

/** Sections to show dots for (exclude hero and footer) */
const dotSections = sectionOrder.filter(
  (s) => s.id !== 'hero' && s.id !== 'footer'
);

/**
 * Smooth scroll to an element with custom duration using requestAnimationFrame.
 * CSS scroll-behavior: smooth has inconsistent speed across browsers.
 */
function smoothScrollTo(
  element: HTMLElement,
  options: { duration?: number; reducedMotion?: boolean } = {}
) {
  const { duration = 1200, reducedMotion = false } = options;

  if (reducedMotion) {
    element.scrollIntoView({ behavior: 'auto', block: 'start' });
    return;
  }

  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  let startTime: number | null = null;

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function SectionDots() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    let maxRatio = 0;
    let maxId = '';

    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        maxId = entry.target.id;
      }
    }

    if (maxId) {
      setActiveSection(maxId);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '0px',
    });

    for (const section of sectionOrder) {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [handleIntersect]);

  const handleClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      smoothScrollTo(el, { duration: 1200, reducedMotion });
    }
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {dotSections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`
            w-3 h-3 rounded-full cursor-pointer
            transition-all duration-300 ease-in-out
            hover:scale-125
            focus:outline-none focus:ring-2 focus:ring-alexandrite/30 focus:ring-offset-2
            ${
              activeSection === section.id
                ? 'bg-alexandrite scale-110'
                : 'bg-alexandrite/20 hover:bg-alexandrite/40'
            }
          `}
          aria-label={section.title || section.id}
          title={section.title || undefined}
        />
      ))}
    </nav>
  );
}
