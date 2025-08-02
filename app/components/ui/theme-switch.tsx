/*
 * ████████╗██╗  ██╗███████╗███╗   ███╗███████╗    ███████╗██╗    ██╗██╗████████╗ ██████╗██╗  ██╗
 * ╚══██╔══╝██║  ██║██╔════╝████╗ ████║██╔════╝    ██╔════╝██║    ██║██║╚══██╔══╝██╔════╝██║  ██║
 *    ██║   ███████║█████╗  ██╔████╔██║█████╗      ███████╗██║ █╗ ██║██║   ██║   ██║     ███████║
 *    ██║   ██╔══██║██╔══╝  ██║╚██╔╝██║██╔══╝      ╚════██║██║███╗██║██║   ██║   ██║     ██╔══██║
 *    ██║   ██║  ██║███████╗██║ ╚═╝ ██║███████╗    ███████║╚███╔███╔╝██║   ██║   ╚██████╗██║  ██║
 *    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝    ╚══════╝ ╚══╝╚══╝ ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
 * High-Design 3D Theme Toggle with Neon Coral Accents
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme';

interface ThemeSwitchProps {
  className?: string;
}

/**
 * Premium 3D Theme Toggle Component
 * 
 * Features:
 * - Miniaturized high-design toggle (40px × 24px)
 * - 3D depth with multiple shadow layers
 * - Neon coral-orange accent when active
 * - Smooth spring animations
 * - Metallic finish with subtle gradients
 * - Haptic-style feedback on interaction
 */
export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center
        w-10 h-6 
        rounded-full 
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      style={{
        // 3D container with depth
        background: isDark 
          ? 'linear-gradient(145deg, #1a1a1a, #0a0a0a)' // Dark sunken track
          : 'linear-gradient(145deg, #e0e0e0, #f5f5f5)', // Light elevated track
        boxShadow: isDark
          ? `
            inset 0 2px 4px rgba(0, 0, 0, 0.6),
            inset 0 -1px 2px rgba(255, 255, 255, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.4),
            0 4px 8px rgba(0, 0, 0, 0.2)
          ` // Deep inset shadow for dark mode
          : `
            inset 0 1px 3px rgba(0, 0, 0, 0.1),
            inset 0 -1px 2px rgba(255, 255, 255, 0.8),
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.04)
          `, // Subtle elevation for light mode
      }}
    >
      {/* Neon coral glow track (only visible when dark mode is active) */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 127, 80, 0.3) 0%, rgba(255, 99, 71, 0.1) 50%, transparent 100%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Inner track lighting effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(255, 127, 80, 0.1) 30%, rgba(255, 127, 80, 0.2) 50%, rgba(255, 127, 80, 0.1) 70%, transparent 100%)'
            : 'none',
          opacity: isDark ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Toggle knob with 3D appearance */}
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        animate={{
          x: isDark ? 20 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        }}
        style={{
          top: '4px',
          // Metallic gradient for the knob
          background: isDark
            ? 'linear-gradient(145deg, #ffffff, #f0f0f0)' // Bright knob for dark mode
            : 'linear-gradient(145deg, #ffffff, #e0e0e0)', // Slightly dimmer for light mode
          // Multiple shadows for 3D effect
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.9),
            inset 0 -1px 1px rgba(0, 0, 0, 0.1),
            ${isDark ? '0 0 12px rgba(255, 127, 80, 0.5)' : '0 0 8px rgba(0, 0, 0, 0.1)'}
          `,
        }}
      >
        {/* Inner highlight for extra depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
          }}
        />

        {/* Neon glow on the knob when active */}
        {isDark && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 127, 80, 0.4) 0%, transparent 70%)',
              filter: 'blur(3px)',
            }}
          />
        )}
      </motion.div>

      {/* Subtle reflection on the track */}
      <div
        className="absolute inset-x-0 top-0 h-2 rounded-t-full opacity-20"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
        }}
      />
    </button>
  );
}