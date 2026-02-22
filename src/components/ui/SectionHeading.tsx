import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

/**
 * Section heading with decorative tapered alexandrite lines on both sides.
 * Per CONTEXT.md: текст + декоративные линии по бокам с утончением к краям.
 * Uses CSS gradient for tapering effect: transparent → alexandrite-light → transparent.
 */
export function SectionHeading({ children, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-4 w-full">
        {/* Left decorative line — tapers from left edge */}
        <div
          className="flex-grow h-[1.5px]"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.4))',
          }}
          aria-hidden="true"
        />

        {/* Heading text */}
        <h2 className="text-3xl sm:text-4xl text-chocolate font-calmius tracking-wide whitespace-nowrap">
          {children}
        </h2>

        {/* Right decorative line — tapers to right edge */}
        <div
          className="flex-grow h-[1.5px]"
          style={{
            background: 'linear-gradient(to left, transparent, rgba(89, 140, 116, 0.4))',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-sm text-chocolate/50 italic mt-2 text-center">
          {subtitle}
        </p>
      )}
    </div>
  );
}
