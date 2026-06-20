import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'xui-theme';

/**
 * @typedef {'light' | 'dark'} Theme
 * @typedef {{ theme: Theme, toggleTheme: () => void }} ThemeContextValue
 */

/** @type {React.Context<ThemeContextValue | undefined>} */
const ThemeContext = createContext(undefined);

/**
 * Returns the initial theme by checking localStorage first,
 * then falling back to the system preference.
 * @returns {Theme}
 */
function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Provides `theme` and `toggleTheme` to the component tree.
 *
 * On mount the provider reads a saved preference from localStorage
 * (key: `xui-theme`) or falls back to the operating-system preference.
 * When the theme changes it sets `data-theme` on `<html>` and persists
 * the choice to localStorage.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Sync the data-theme attribute and localStorage whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme and toggle function.
 *
 * @returns {ThemeContextValue}
 * @throws {Error} If used outside of a `<ThemeProvider>`.
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
