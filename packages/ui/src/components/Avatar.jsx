import { forwardRef, useState } from 'react';

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

/**
 * Extract up to two initials from a name.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * User avatar with image or initials fallback.
 *
 * @param {object} props
 * @param {string} [props.src]
 * @param {string} [props.name]
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {string} [props.className]
 */
const Avatar = forwardRef(function Avatar(
  { src, name = '', size = 'md', className = '', ...rest },
  ref
) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <span
      ref={ref}
      className={[
        'inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
        'bg-muted text-muted-foreground font-medium select-none',
        sizeClasses[size] || sizeClasses.md,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={name || undefined}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  );
});

export { Avatar };
