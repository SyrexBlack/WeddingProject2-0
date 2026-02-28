interface SectionDividerProps {
  variant?: 'leaf' | 'dot' | 'line';
  className?: string;
}

/**
 * Decorative SVG divider placed between page sections.
 * Three variants: botanical leaf, three dots, or gradient line with diamond.
 */
export function SectionDivider({ variant = 'leaf', className = '' }: SectionDividerProps) {
  return (
    <div className={`py-5 flex justify-center ${className}`} aria-hidden="true">
      {variant === 'leaf' && <LeafDivider />}
      {variant === 'dot' && <DotDivider />}
      {variant === 'line' && <LineDivider />}
    </div>
  );
}

/** Two mirrored olive branches meeting in the center */
function LeafDivider() {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-55"
    >
      {/* Left branch */}
      <path
        d="M58 20 C50 20, 40 18, 10 20"
        stroke="#598c74"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left leaves */}
      <ellipse cx="22" cy="17" rx="5" ry="2.5" transform="rotate(-30 22 17)" fill="#598c74" opacity="0.6" />
      <ellipse cx="32" cy="22" rx="4.5" ry="2.2" transform="rotate(25 32 22)" fill="#598c74" opacity="0.5" />
      <ellipse cx="42" cy="17" rx="4" ry="2" transform="rotate(-25 42 17)" fill="#598c74" opacity="0.6" />
      <ellipse cx="50" cy="21" rx="3.5" ry="1.8" transform="rotate(20 50 21)" fill="#598c74" opacity="0.5" />

      {/* Right branch (mirrored) */}
      <path
        d="M62 20 C70 20, 80 18, 110 20"
        stroke="#598c74"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right leaves */}
      <ellipse cx="98" cy="17" rx="5" ry="2.5" transform="rotate(30 98 17)" fill="#598c74" opacity="0.6" />
      <ellipse cx="88" cy="22" rx="4.5" ry="2.2" transform="rotate(-25 88 22)" fill="#598c74" opacity="0.5" />
      <ellipse cx="78" cy="17" rx="4" ry="2" transform="rotate(25 78 17)" fill="#598c74" opacity="0.6" />
      <ellipse cx="70" cy="21" rx="3.5" ry="1.8" transform="rotate(-20 70 21)" fill="#598c74" opacity="0.5" />

      {/* Center dot */}
      <circle cx="60" cy="20" r="1.5" fill="#598c74" opacity="0.7" />
    </svg>
  );
}

/** Three small dots in a row */
function DotDivider() {
  return (
    <div className="flex items-center gap-3 opacity-55">
      <span className="block w-1.5 h-1.5 rounded-full bg-alexandrite" />
      <span className="block w-2 h-2 rounded-full bg-alexandrite" />
      <span className="block w-1.5 h-1.5 rounded-full bg-alexandrite" />
    </div>
  );
}

/** Thin gradient line with a diamond in the center */
function LineDivider() {
  return (
    <div className="flex items-center gap-0 w-48 opacity-55">
      <div
        className="flex-grow h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(89, 140, 116, 0.5))',
        }}
      />
      {/* Diamond */}
      <div
        className="w-2 h-2 rotate-45 bg-alexandrite/50 shrink-0 mx-1"
      />
      <div
        className="flex-grow h-px"
        style={{
          background: 'linear-gradient(to left, transparent, rgba(89, 140, 116, 0.5))',
        }}
      />
    </div>
  );
}
