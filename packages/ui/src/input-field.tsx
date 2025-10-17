import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from './utils';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  hideLabel?: boolean;
  optionalLabel?: string | null;
};

const baseInputStyles =
  'w-full rounded-xl border px-4 py-2.5 text-base shadow-sm outline-none transition placeholder:text-atelier-shadow/60 focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-atelier-paper dark:ring-offset-atelier-night disabled:cursor-not-allowed disabled:opacity-70';

const activeInputStyles =
  'border-atelier-sand bg-white text-atelier-ink focus:border-atelier-terracotta focus-visible:ring-atelier-terracotta dark:border-atelier-shadow dark:bg-atelier-charcoal dark:text-atelier-parchment';

const errorInputStyles =
  'border-atelier-berry text-atelier-ink focus:border-atelier-berry focus-visible:ring-atelier-berry dark:border-atelier-berry dark:text-atelier-parchment';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      hideLabel = false,
      optionalLabel = 'Optional',
      className,
      required,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hasAssistiveText = Boolean(helperText) || Boolean(error);
    const descriptionId = hasAssistiveText ? `${inputId}-description` : undefined;
    const showOptional = optionalLabel && !required;

    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label
            htmlFor={inputId}
            className={cx(
              'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-atelier-shadow dark:text-atelier-sage',
              hideLabel && 'sr-only',
            )}
          >
            <span>{label}</span>
            {showOptional ? (
              <span className="text-[0.65rem] font-normal normal-case tracking-normal text-atelier-shadow/70 dark:text-atelier-haze/80">
                {optionalLabel}
              </span>
            ) : null}
          </label>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          className={cx(baseInputStyles, error ? errorInputStyles : activeInputStyles, className)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={descriptionId}
          required={required}
          {...rest}
        />

        {hasAssistiveText ? (
          <p
            id={descriptionId}
            className={cx(
              'text-sm leading-relaxed',
              error ? 'text-atelier-berry' : 'text-atelier-shadow dark:text-atelier-haze',
            )}
          >
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
