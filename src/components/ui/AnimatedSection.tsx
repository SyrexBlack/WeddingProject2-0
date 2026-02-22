'use client';

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
 */
export function AnimatedSection({
  children,
  variant = 'fade-up',
  className = '',
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // prefers-reduced-motion: render static div, no animation whatsoever
  if (prefersReducedMotion) {
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
        once: false, // срабатывают каждый раз при скролле
        amount: 0.15, // порог ~15% видимости
      }}
    >
      {children}
    </motion.div>
  );
}
