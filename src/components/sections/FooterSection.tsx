import { footerData } from '@/lib/constants';

/**
 * Footer section — decorative couple initials, gradient top line, and muted copyright.
 * Per CONTEXT.md: alexandrite gradient line, muted text, subtle background gradient, compact padding.
 */
export function FooterSection() {
  return (
    <footer id="footer" className="bg-gradient-to-b from-transparent to-chocolate/[0.04]">
      {/* Decorative couple initials */}
      <div className="text-center pt-12 pb-2">
        <p className="text-2xl md:text-3xl font-calmius text-chocolate/30 italic tracking-wider">
          А &hearts; М
        </p>
      </div>

      {/* Gradient line — alexandrite, matching SectionHeading style */}
      <div
        className="h-[1.5px]"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.5), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Copyright */}
      <div className="py-6 md:py-8 text-center">
        <p className="text-xs tracking-widest uppercase opacity-40">{footerData.text}</p>
      </div>
    </footer>
  );
}
