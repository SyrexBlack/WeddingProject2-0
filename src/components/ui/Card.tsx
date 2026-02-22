import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card with subtle shadow and moderate rounding.
 * Per CONTEXT.md: умеренное скругление (10px), едва заметные тени.
 */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/90 rounded-card shadow-card p-6 md:p-8 border border-chocolate/5 transition-shadow duration-300 hover:shadow-cardHover ${className}`}>
      {children}
    </div>
  );
}
