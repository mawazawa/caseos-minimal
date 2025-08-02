/**
 * Cosmic Theme Toggle Component
 *
 * Enhanced theme toggle with cosmic styling for auth pages.
 * Supports larger sizes for better accessibility and cosmic aesthetics.
 */

'use client';

import { useTheme } from './theme-provider';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface CosmicThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'cosmic';
  showLabel?: boolean;
  className?: string;
}

export function CosmicThemeToggle({
  size = 'md',
  variant = 'cosmic',
  showLabel = false,
  className = ''
}: CosmicThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const getNextTheme = () => {
    switch (theme) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
      default: return 'dark';
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={iconSizes[size]} />;
      case 'dark': return <Moon size={iconSizes[size]} />;
      case 'system': return <Monitor size={iconSizes[size]} />;
      default: return <Moon size={iconSizes[size]} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'Dark';
    }
  };

  const baseClasses = variant === 'cosmic'
    ? 'bg-slate-800/60 hover:bg-slate-700/60 border border-blue-400/20 hover:border-blue-400/40 text-blue-200 hover:text-blue-100 backdrop-blur-sm'
    : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        onClick={() => setTheme(getNextTheme())}
        className={`
          ${sizeClasses[size]}
          ${baseClasses}
          rounded-xl
          flex items-center justify-center
          transition-all duration-200
          shadow-lg
          ${variant === 'cosmic' ? 'shadow-blue-500/10 hover:shadow-blue-500/20' : 'shadow-[var(--shadow-sm)]'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${getNextTheme()} theme`}
      >
        {getIcon()}
      </motion.button>

      {showLabel && (
        <span className={`text-sm font-medium ${
          variant === 'cosmic'
            ? 'text-blue-200/80'
            : 'text-[var(--color-text-secondary)]'
        }`}>
          {getLabel()}
        </span>
      )}
    </div>
  );
}