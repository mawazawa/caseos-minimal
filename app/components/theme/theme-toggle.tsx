'use client';

/**
 * ████████╗ ██████╗  ██████╗  ██████╗ ██╗     ███████╗
 * ╚══██╔══╝██╔═══██╗██╔════╝ ██╔════╝ ██║     ██╔════╝
 *    ██║   ██║   ██║██║  ███╗██║  ███╗██║     █████╗
 *    ██║   ██║   ██║██║   ██║██║   ██║██║     ██╔══╝
 *    ██║   ╚██████╔╝╚██████╔╝╚██████╔╝███████╗███████╗
 *    ╚═╝    ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
 * Theme Toggle Component - Linear-inspired Design
 */

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from './theme-provider';
import { useState } from 'react';
import { ThemeSwitch } from '../ui/theme-switch';

/**
 * Animation variants for smooth icon transitions
 * Using Linear's signature easing curves
 */
const iconVariants: Variants = {
  initial: {
    scale: 0.5,
    opacity: 0,
    rotate: -180
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] // Linear's easing
    }
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};

const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  }
};

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'minimal' | 'compact';
}

/**
 * Theme Toggle Component
 * Provides smooth animated toggle between light, dark, and system themes
 *
 * Features:
 * - Smooth icon transitions with Framer Motion
 * - Visual feedback for current theme
 * - Accessibility support
 * - Multiple variants and sizes
 * - Keyboard navigation support
 */
export function ThemeToggle({
  className,
  size = 'md',
  showLabel = false,
  variant = 'default'
}: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icon size mapping
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const iconSize = iconSizes[size];

  /**
   * Get the appropriate icon for the current theme
   */
  const getCurrentIcon = () => {
    if (theme === 'system') {
      return <Monitor size={iconSize} />;
    }
    return resolvedTheme === 'dark'
      ? <Moon size={iconSize} />
      : <Sun size={iconSize} />;
  };

  /**
   * Get theme description for accessibility
   */
  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light mode';
      case 'dark': return 'Dark mode';
      case 'system': return 'System mode';
      default: return 'Theme toggle';
    }
  };

  /**
   * Handle theme toggle with enhanced UX
   * Simple toggle for better user experience
   */
  const handleToggle = () => {
    toggleTheme();

    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  /**
   * Handle advanced theme selection (when menu is open)
   */
  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    setIsMenuOpen(false);
  };

  if (variant === 'compact') {
    return <ThemeSwitch className={className} />;
  }

  // Full variant with optional menu
  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={clsx(
          'relative rounded-md flex items-center gap-2',
          'text-[var(--color-text-secondary)]',
          'hover:bg-[var(--color-background-secondary)]',
          'hover:text-[var(--color-text-primary)]',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2',
          showLabel ? 'px-3 py-1.5' : 'p-1.5',
          className
        )}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        aria-label={getThemeLabel()}
        title={`${getThemeLabel()} (Right-click for options)`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${theme}-${resolvedTheme}`}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center"
          >
            {getCurrentIcon()}
          </motion.span>
        </AnimatePresence>

        {showLabel && (
          <span className="text-[var(--font-size-sm)] font-medium">
            {getThemeLabel()}
          </span>
        )}
      </motion.button>

      {/* Advanced theme menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute right-0 bottom-full mb-2 z-50',
              'bg-[var(--color-surface)] border border-[var(--color-border)]',
              'rounded-md shadow-lg min-w-[120px]',
              'py-1'
            )}
            onBlur={() => setIsMenuOpen(false)}
          >
            {[
              { key: 'light', label: 'Light', icon: Sun },
              { key: 'dark', label: 'Dark', icon: Moon },
              { key: 'system', label: 'System', icon: Monitor },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleThemeSelect(key as 'light' | 'dark' | 'system')}
                className={clsx(
                  'w-full flex items-center gap-2 px-3 py-1.5',
                  'text-[var(--font-size-sm)] font-medium text-left',
                  'hover:bg-[var(--color-background-secondary)]',
                  'transition-colors duration-150',
                  theme === key && 'text-[var(--color-accent)] bg-[var(--color-background-secondary)]'
                )}
              >
                <Icon size={12} />
                {label}
                {theme === key && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Simple theme toggle hook for programmatic usage
 */
export function useThemeToggle() {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useTheme();

  return {
    currentTheme: theme,
    resolvedTheme,
    toggleTheme,
    setTheme,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    isSystem: theme === 'system'
  };
}