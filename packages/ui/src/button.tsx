import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';

type ButtonVariant = 'primary' | 'secondary' | 'tonal' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: ReactNode;
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[0.02em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atelier-terracotta focus-visible:ring-offset-2 ring-offset-atelier-paper dark:ring-offset-atelier-night disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-atelier-terracotta text-white shadow-sm hover:bg-atelier-terracotta-strong focus-visible:ring-atelier-terracotta dark:text-atelier-parchment',
  secondary:
    'border border-atelier-moss text-atelier-moss hover:bg-atelier-moss/10 focus-visible:ring-atelier-moss dark:border-atelier-sage dark:text-atelier-sage dark:hover:bg-atelier-sage/20 dark:focus-visible:ring-atelier-sage',
  tonal:
    'bg-atelier-mist text-atelier-ink shadow-sm hover:bg-atelier-parchment focus-visible:ring-atelier-terracotta dark:bg-atelier-charcoal dark:text-atelier-parchment dark:hover:bg-atelier-shadow',
  ghost:
    'text-atelier-terracotta hover:bg-atelier-mist focus-visible:ring-atelier-terracotta dark:text-atelier-highlight dark:hover:bg-atelier-charcoal',
  destructive:
    'bg-atelier-berry text-atelier-parchment shadow-sm hover:bg-atelier-berry-strong focus-visible:ring-atelier-berry dark:bg-atelier-berry dark:hover:bg-atelier-berry-strong',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingLabel,
      className,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const classes = cx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      isLoading && 'pointer-events-none opacity-70',
      className,
    );

    const content = isLoading ? (
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
        <span>{loadingLabel ?? 'Working…'}</span>
      </span>
    ) : (
      children
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        data-variant={variant}
        type={type}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
