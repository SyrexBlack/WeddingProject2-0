'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimationVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  id?: string;
}

/** Initial state for each animation variant */
const variantInitial: Record<AnimationVariant, Record<string, number>> = {
  'fade-up': { opacity: 0, y: 30 },
  'fade-in': { opacity: 0 },
  'fade-left': { opacity: 0, x: -30 },
  'fade-right': { opacity: 0, x: 30 },
};

/** Target state: fully visible, centered */
const variantAnimate = { opacity: 1, y: 0, x: 0 };

/**
 * Framer Motion wrapper for scroll-triggered animations.
 * Per CONTEXT.md: fade-up default, 4 variants, slow ~0.9s, triggers every scroll.
 * When prefers-reduced-motion is set: renders plain div, content immediately visible.
 *
 * SSR renders content fully visible (no opacity:0) to prevent invisible content
 * if JS fails to load. Animation initial state only applied after hydration.
 */
export function AnimatedSection({
  children,
  variant = 'fade-up',
  className = '',
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // prefers-reduced-motion or SSR: render plain div, content immediately visible
  if (prefersReducedMotion || !isHydrated) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={variantInitial[variant]}
      whileInView={variantAnimate}
      transition={{
        duration: 0.9,
        ease: 'easeOut',
        delay,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
    >
      {children}
    </motion.div>
  );
}
