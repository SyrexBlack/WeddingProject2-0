import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'outline' | 'filled';
type ButtonSize = 'normal' | 'large';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button with two styles (outline + filled) and two sizes (normal + large).
 * Per CONTEXT.md: outline is primary, filled for CTA/RSVP.
 * Renders as <a> if href provided, <button> otherwise.
 */
export function Button({
  children,
  variant = 'outline',
  size = 'normal',
  className = '',
  disabled = false,
  href,
  ...rest
}: ButtonProps) {
  const sizeClasses = size === 'large'
    ? 'py-3 px-8 text-lg'
    : 'py-2 px-6 text-base';

  const variantClasses = variant === 'filled'
    ? 'bg-alexandrite text-white hover:bg-alexandrite/85 border border-transparent'
    : 'border border-alexandrite text-alexandrite hover:bg-alexandrite hover:text-white';

  const baseClasses = [
    'inline-flex items-center justify-center',
    'rounded-card',
    'font-calmius',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-alexandrite/50 focus:ring-offset-2',
    sizeClasses,
    variantClasses,
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className,
  ].join(' ');

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
