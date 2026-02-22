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
    <div className={`bg-white/80 rounded-card shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
