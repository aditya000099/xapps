import { forwardRef } from 'react';
import { Spinner } from './Spinner.jsx';

/**
 * @typedef {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

const variantClasses = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-ring',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-secondary focus-visible:ring-ring',
  ghost:
    'bg-transparent text-foreground hover:bg-secondary focus-visible:ring-ring',
  danger:
    'bg-danger text-danger-foreground hover:bg-danger-hover focus-visible:ring-ring',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-sm',
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
};

/**
 * A reusable button component.
 *
 * @param {object} props
 * @param {ButtonVariant} [props.variant='primary']
 * @param {ButtonSize} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {React.Ref<HTMLButtonElement>} ref
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    children,
    disabled,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-colors duration-150 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        'cursor-pointer disabled:cursor-not-allowed',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {isLoading && <Spinner size="sm" className="shrink-0" />}
      {children}
    </button>
  );
});

export { Button };
