import { forwardRef, useId } from 'react';

/**
 * A styled select dropdown.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {Array<{ value: string, label: string }>} [props.options=[]]
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {string} [props.className]
 * @param {React.Ref<HTMLSelectElement>} ref
 */
const Select = forwardRef(function Select(
  {
    label,
    options = [],
    placeholder,
    error,
    helperText,
    className = '',
    id: idProp,
    ...rest
  },
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

      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-hint` : undefined
          }
          className={[
            'w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm text-foreground',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </div>

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

export { Select };
