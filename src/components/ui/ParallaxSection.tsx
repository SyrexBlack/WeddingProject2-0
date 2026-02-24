'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}

/**
 * Parallax depth wrapper — background moves slower than foreground on scroll.
 *
 * Uses Framer Motion useScroll/useTransform for GPU-accelerated transforms.
 * At speed=0.5 (default): background shifts ~30% range while content scrolls normally.
 * Fully disabled when prefers-reduced-motion is set — background stays static.
 */
export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to vertical offset.
  // At speed=0.5: background moves from -15% to 15% (30% total range)
  // while content scrolls full distance — creates depth illusion.
  const yRange = 30 * speed; // percentage
  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}%`, `${yRange}%`]);

  return (
    <div ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layer — only animates if motion OK */}
      <motion.div
        className="absolute inset-0 -inset-y-[20%]"
        style={prefersReducedMotion ? {} : { y }}
      >
        {/* Background visual — gradient or subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-alexandrite-light/30 via-transparent to-alexandrite-light/20" />
      </motion.div>

      {/* Foreground content — always static position, h-full so children can use absolute/h-full */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
