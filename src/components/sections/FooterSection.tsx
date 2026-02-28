import { footerData } from '@/lib/constants';

/**
 * Footer section — decorative couple initials, gradient top line, and muted copyright.
 * Per CONTEXT.md: alexandrite gradient line, muted text, subtle background gradient, compact padding.
 */
export function FooterSection() {
  return (
    <footer id="footer" className="bg-gradient-to-b from-transparent to-chocolate/[0.04]">
      <div className="text-center pt-12 pb-2">
        <p className="text-2xl md:text-3xl font-calmius text-chocolate/45 italic tracking-wider">
          Г &hearts; П
        </p>
      </div>

      <div
        className="h-[1.5px]"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.5), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="py-6 md:py-8 text-center pb-28 lg:pb-8">
        <p className="text-xs tracking-widest uppercase text-chocolate/60">{footerData.text}</p>
      </div>
    </footer>
  );
}
