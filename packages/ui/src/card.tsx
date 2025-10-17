import type { HTMLAttributes } from 'react';
import { cx } from './utils';

type CardVariant = 'elevated' | 'outline' | 'tonal';

type BaseProps<T extends HTMLElement> = HTMLAttributes<T> & {
  className?: string;
};

export type CardProps = BaseProps<HTMLElement> & {
  variant?: CardVariant;
};

const baseCardStyles =
  'group/card relative flex flex-col gap-4 rounded-2xl border transition-shadow duration-200 focus-within:shadow-notebook focus-within:outline-none';

const variantStyles: Record<CardVariant, string> = {
  elevated:
    'border-atelier-sand bg-white shadow-sm hover:shadow-notebook dark:border-atelier-shadow dark:bg-atelier-charcoal/80 dark:hover:shadow-notebook',
  outline:
    'border-atelier-sand bg-transparent dark:border-atelier-shadow',
  tonal:
    'border-transparent bg-atelier-mist shadow-sm hover:shadow-notebook dark:bg-atelier-charcoal',
};

export const Card = ({ variant = 'elevated', className, ...props }: CardProps) => {
  return <section className={cx(baseCardStyles, variantStyles[variant], className)} {...props} />;
};

export const CardHeader = ({ className, ...props }: BaseProps<HTMLDivElement>) => (
  <div
    className={cx(
      'flex flex-col gap-2 border-b border-atelier-sand/60 pb-4 dark:border-atelier-shadow/70',
      className,
    )}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }: BaseProps<HTMLHeadingElement>) => (
  <h3
    className={cx(
      'font-display text-2xl text-atelier-ink dark:text-atelier-parchment',
      className,
    )}
    {...props}
  />
);

export const CardEyebrow = ({ className, ...props }: BaseProps<HTMLParagraphElement>) => (
  <p
    className={cx(
      'text-xs font-semibold uppercase tracking-[0.12em] text-atelier-shadow/80 dark:text-atelier-haze/80',
      className,
    )}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }: BaseProps<HTMLParagraphElement>) => (
  <p
    className={cx(
      'text-base text-atelier-shadow dark:text-atelier-haze',
      className,
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: BaseProps<HTMLDivElement>) => (
  <div className={cx('flex flex-col gap-4', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: BaseProps<HTMLDivElement>) => (
  <div
    className={cx(
      'mt-auto flex items-center justify-end gap-3 border-t border-atelier-sand/60 pt-4 dark:border-atelier-shadow/70',
      className,
    )}
    {...props}
  />
);
