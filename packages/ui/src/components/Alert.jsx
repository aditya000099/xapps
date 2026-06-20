import { forwardRef } from 'react';

const variantClasses = {
  info: 'bg-info/10 text-info border-info/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
};

const icons = {
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v4M10 7h.01" />
    </svg>
  ),
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M7 10l2 2 4-4" />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M10 3l7.5 13H2.5L10 3z" />
      <path d="M10 9v3M10 14h.01" />
    </svg>
  ),
  danger: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M13 7l-6 6M7 7l6 6" />
    </svg>
  ),
};

/**
 * Notification alert banner.
 *
 * @param {object} props
 * @param {'info' | 'success' | 'warning' | 'danger'} [props.variant='info']
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClose]
 * @param {string} [props.className]
 */
const Alert = forwardRef(function Alert(
  { variant = 'info', title, children, onClose, className = '', ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={[
        'flex gap-3 rounded-md border p-4',
        variantClasses[variant] || variantClasses.info,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="mt-0.5">{icons[variant] || icons.info}</span>

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss"
        >
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
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>
      )}
    </div>
  );
});

export { Alert };
