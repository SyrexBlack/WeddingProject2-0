import { footerData } from '@/lib/constants';

/**
 * Footer section — gradient top line and muted copyright.
 * Per CONTEXT.md: only copyright, alexandrite gradient line, muted text,
 * slightly different background, compact padding, no icons.
 */
export function FooterSection() {
  return (
    <footer id="footer" className="bg-chocolate/[0.03]">
      {/* Gradient line — alexandrite, matching SectionHeading style */}
      <div
        className="h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.4), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Copyright */}
      <div className="py-4 sm:py-6 text-center">
        <p className="text-sm opacity-50">{footerData.text}</p>
      </div>
    </footer>
  );
}
