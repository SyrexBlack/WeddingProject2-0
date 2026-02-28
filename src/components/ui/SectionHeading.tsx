import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  tone?: 'default' | 'light';
}

/**
 * Section heading with decorative tapered alexandrite lines on both sides.
 * Per CONTEXT.md: текст + декоративные линии по бокам с утончением к краям.
 * Uses CSS gradient for tapering effect: transparent → alexandrite-light → transparent.
 */
export function SectionHeading({
  children,
  subtitle,
  className = '',
  tone = 'default',
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  const lineCenterColor = isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(89, 140, 116, 0.4)';

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="sm:hidden w-full max-w-xs mb-3 mx-auto">
        <div
          className="h-[1.5px]"
          style={{
            background: `linear-gradient(to right, transparent, ${lineCenterColor}, transparent)`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center justify-center gap-4 w-full text-center">
        <div
          className="hidden sm:block flex-grow h-[1.5px]"
          style={{
            background: `linear-gradient(to right, transparent, ${lineCenterColor})`,
          }}
          aria-hidden="true"
        />

        <h2
          className={`text-3xl sm:text-4xl font-calmius tracking-wide leading-tight max-w-[15ch] sm:max-w-none ${
            isLight ? 'text-white' : 'text-chocolate'
          }`}
        >
          {children}
        </h2>

        <div
          className="hidden sm:block flex-grow h-[1.5px]"
          style={{
            background: `linear-gradient(to left, transparent, ${lineCenterColor})`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="sm:hidden w-full max-w-xs mt-3 mx-auto">
        <div
          className="h-[1.5px]"
          style={{
            background: `linear-gradient(to right, transparent, ${lineCenterColor}, transparent)`,
          }}
          aria-hidden="true"
        />
      </div>

      {subtitle && (
        <p
          className={`text-sm italic mt-3 text-center tracking-wide max-w-md ${
            isLight ? 'text-white/80' : 'text-chocolate/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
