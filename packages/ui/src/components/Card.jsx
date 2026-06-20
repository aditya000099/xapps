import { forwardRef } from 'react';

/**
 * Card container.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Card = forwardRef(function Card({ className = '', children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={[
        'rounded-lg border border-border bg-card text-card-foreground shadow',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * Card header section.
 */
const CardHeader = forwardRef(function CardHeader(
  { className = '', children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={['px-6 py-4 border-b border-border', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * Card body / content section.
 */
const CardBody = forwardRef(function CardBody(
  { className = '', children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={['px-6 py-4', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * Card footer section.
 */
const CardFooter = forwardRef(function CardFooter(
  { className = '', children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={[
        'px-6 py-4 border-t border-border flex items-center gap-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
});

export { Card, CardHeader, CardBody, CardFooter };
