import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

/**
 * Section heading with decorative tapered alexandrite lines on both sides.
 * Per CONTEXT.md: текст + декоративные линии по бокам с утончением к краям.
 * Uses CSS gradient for tapering effect: transparent → alexandrite-light → transparent.
 */
export function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Left decorative line — tapers from left edge */}
      <div
        className="flex-grow h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.4))',
        }}
        aria-hidden="true"
      />

      {/* Heading text */}
      <h2 className="text-2xl sm:text-3xl text-chocolate font-calmius whitespace-nowrap">
        {children}
      </h2>

      {/* Right decorative line — tapers to right edge */}
      <div
        className="flex-grow h-px"
        style={{
          background: 'linear-gradient(to left, transparent, rgba(89, 140, 116, 0.4))',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
