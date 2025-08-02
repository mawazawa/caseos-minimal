'use client';

/**
 * ████████╗██╗  ██╗███████╗███╗   ███╗███████╗
 * ╚══██╔══╝██║  ██║██╔════╝████╗ ████║██╔════╝
 *    ██║   ███████║█████╗  ██╔████╔██║█████╗
 *    ██║   ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══╝
 *    ██║   ██║  ██║███████╗██║ ╚═╝ ██║███████╗
 *    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝
 * Comprehensive Dark Mode System - Best Practices Implementation
 * Following Linear.app design excellence standards
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'caseos-theme';

/**
 * Gets the user's system theme preference
 * Returns 'dark' if user prefers dark mode, 'light' otherwise
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Gets the stored theme preference from localStorage
 * Returns 'dark' as default if no preference is stored
 */
function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme;
    return stored || 'dark';
  } catch (error) {
    console.warn('⚠️  Failed to read theme from localStorage:', error);
    return 'dark';
  }
}

/**
 * Stores the theme preference in localStorage
 */
function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
    console.log(`🎨 Theme preference saved: ${theme}`);
  } catch (error) {
    console.warn('⚠️  Failed to save theme to localStorage:', error);
  }
}

/**
 * Applies the resolved theme to the document
 * This function handles both the data attribute and class-based approaches
 */
function applyTheme(resolvedTheme: ResolvedTheme): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Apply data attribute approach (for CSS custom properties)
  root.setAttribute('data-theme', resolvedTheme);

  // Apply class-based approach (as fallback)
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  // Set color-scheme for browser UI elements (scrollbars, form inputs)
  root.style.colorScheme = resolvedTheme;

  console.log(`🌙 Applied theme: ${resolvedTheme}`);
}

/**
 * Theme Provider Component
 * Provides comprehensive dark mode support with:
 * - localStorage persistence
 * - System preference detection
 * - No-flash loading
 * - Smooth transitions
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  enableTransitions?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  enableSystem = true,
  enableTransitions = true
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Calculate resolved theme based on current theme and system preference
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  /**
   * Updates the theme and persists it to localStorage
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);

    const newResolvedTheme = newTheme === 'system' ? systemTheme : newTheme;
    applyTheme(newResolvedTheme);
  }, [systemTheme]);

  /**
   * Toggles between light and dark themes
   * Skips 'system' option for simpler UX
   */
  const toggleTheme = useCallback(() => {
    const currentResolved = theme === 'system' ? systemTheme : theme;
    const newTheme = currentResolved === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, systemTheme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const currentSystemTheme = getSystemTheme();

    setSystemTheme(currentSystemTheme);
    setThemeState(storedTheme);

    const initialResolvedTheme = storedTheme === 'system' ? currentSystemTheme : storedTheme;
    applyTheme(initialResolvedTheme);

    setMounted(true);
    console.log(`🚀 Theme provider initialized - stored: ${storedTheme}, resolved: ${initialResolvedTheme}`);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newSystemTheme = event.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);

      // If user is using system theme, apply the new system preference
      if (theme === 'system') {
        applyTheme(newSystemTheme);
      }

      console.log(`🔄 System theme changed: ${newSystemTheme}`);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, enableSystem]);

  // Enable smooth transitions after initial mount to prevent flash
  useEffect(() => {
    if (!mounted || !enableTransitions) return;

    const timer = setTimeout(() => {
      document.documentElement.style.setProperty(
        '--theme-transition',
        'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted, enableTransitions]);

  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * Provides access to current theme state and theme control functions
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Theme script to be injected in document head
 * Prevents flash of wrong theme on page load
 */
export const THEME_SCRIPT = `
(function() {
  try {
    var theme = localStorage.getItem('${STORAGE_KEY}') || 'dark';
    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var resolvedTheme = theme === 'system' ? systemTheme : theme;

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.classList.add(resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch (error) {
    console.warn('Theme script error:', error);
  }
})();
`;