import type { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Centered content container with max-width.
 * Default max-width: 768px (per CONTEXT.md decisions).
 */
export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`mx-auto max-w-content px-4 sm:px-6 ${className}`}>
      {children}
    </Tag>
  );
}
