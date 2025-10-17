import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';

type AlertTone = 'info' | 'success' | 'warning' | 'danger';

type BaseProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type AlertProps = BaseProps & {
  tone?: AlertTone;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
};

const baseAlertStyles = 'rounded-2xl border px-4 py-3 shadow-sm sm:px-5 sm:py-4';

const toneStyles: Record<AlertTone, string> = {
  info: 'border-atelier-shadow/20 bg-atelier-mist text-atelier-ink dark:border-atelier-shadow/50 dark:bg-atelier-charcoal/80 dark:text-atelier-parchment',
  success:
    'border-atelier-moss/30 bg-atelier-moss/10 text-atelier-moss dark:border-atelier-sage/40 dark:bg-atelier-moss-strong/20 dark:text-atelier-sage',
  warning:
    'border-atelier-sun/30 bg-atelier-sun/10 text-atelier-sun dark:border-atelier-sun/40 dark:bg-atelier-sun/20 dark:text-atelier-highlight',
  danger:
    'border-atelier-berry/30 bg-atelier-berry/10 text-atelier-berry dark:border-atelier-berry/40 dark:bg-atelier-berry-strong/20 dark:text-atelier-berry',
};

const toneIcons: Record<AlertTone, ReactNode> = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8.5v.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.1 11.5h1.2v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M5.5 12.5 10 17l8.5-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M12 6.5 4.5 19h15L12 6.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17.2v.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  danger: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M8.5 8.5 15.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m15.5 8.5-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export const Alert = ({
  tone = 'info',
  title,
  description,
  icon,
  className,
  role,
  children,
  ...props
}: AlertProps) => {
  const resolvedRole = role ?? (tone === 'danger' ? 'alert' : 'status');

  return (
    <div role={resolvedRole} className={cx(baseAlertStyles, toneStyles[tone], className)} {...props}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/30 bg-white/80 text-current dark:bg-atelier-night/60">
          {icon ?? toneIcons[tone]}
        </span>
        <div className="flex flex-col gap-1 text-current">
          {title ? <p className="font-semibold text-base tracking-[0.01em]">{title}</p> : null}
          {description ? <p className="text-sm leading-relaxed opacity-90">{description}</p> : null}
          {children}
        </div>
      </div>
    </div>
  );
};
