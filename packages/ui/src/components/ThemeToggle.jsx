import { forwardRef } from 'react';
import { useTheme } from '../theme.jsx';

/**
 * A toggle button that switches between light and dark themes.
 *
 * Displays a **sun** icon when the active theme is dark (click → go light)
 * and a **moon** icon when the active theme is light (click → go dark).
 *
 * @param {{ className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
const ThemeToggle = forwardRef(function ThemeToggle({ className = '', ...props }, ref) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`
        inline-flex items-center justify-center
        size-9 rounded-md
        bg-muted text-foreground
        cursor-pointer
        transition-colors duration-200
        hover:bg-muted/80
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
        ${className}
      `}
      {...props}
    >
      {/* Container for the crossfade transition */}
      <span className="relative size-5">
        {/* Sun icon — visible in dark mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
            absolute inset-0 size-5
            transition-all duration-300 ease-in-out
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon icon — visible in light mode */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
            absolute inset-0 size-5
            transition-all duration-300 ease-in-out
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
});

export { ThemeToggle };
