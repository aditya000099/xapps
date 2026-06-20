import { forwardRef } from 'react';

const variantClasses = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  danger: 'bg-danger text-danger-foreground',
  info: 'bg-info text-info-foreground',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
};

/**
 * A small pill-shaped status badge.
 *
 * @param {object} props
 * @param {'default' | 'success' | 'warning' | 'danger' | 'info'} [props.variant='default']
 * @param {'sm' | 'md'} [props.size='sm']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Badge = forwardRef(function Badge(
  { variant = 'default', size = 'sm', className = '', children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={[
        'inline-flex items-center font-medium rounded-full leading-none whitespace-nowrap',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.sm,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  );
});

export { Badge };
