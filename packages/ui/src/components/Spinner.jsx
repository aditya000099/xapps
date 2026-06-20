import { forwardRef } from 'react';

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-3',
};

/**
 * A spinning loading indicator.
 *
 * @param {object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className]
 */
const Spinner = forwardRef(function Spinner(
  { size = 'md', className = '', ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={[
        'inline-block rounded-full animate-spin',
        'border-primary border-t-transparent',
        sizeClasses[size] || sizeClasses.md,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
});

export { Spinner };
