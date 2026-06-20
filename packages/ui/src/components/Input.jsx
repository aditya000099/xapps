import { forwardRef, useId } from 'react';

/**
 * A text input with optional label, error, and helper text.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {string} [props.className]
 * @param {React.Ref<HTMLInputElement>} ref
 */
const Input = forwardRef(function Input(
  { label, error, helperText, className = '', id: idProp, ...rest },
  ref
) {
  const autoId = useId();
  const id = idProp || autoId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-hint` : undefined
        }
        className={[
          'w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground',
          'placeholder:text-muted-foreground',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-input-border',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />

      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
});

export { Input };
