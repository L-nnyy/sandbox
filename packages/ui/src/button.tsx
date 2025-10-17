import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
  }
>;

const baseStyles =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:text-indigo-100',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-400 disabled:text-slate-400 disabled:border-slate-200',
};

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  const classes = `${baseStyles} ${variants[variant]} ${className}`.trim();

  return <button className={classes} {...props} />;
};

Button.displayName = 'Button';
