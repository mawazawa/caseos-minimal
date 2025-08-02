/**
 * Skeleton Animation Variants
 *
 * Centralized Framer Motion animations for skeleton components.
 * GPU-optimized animations for 60fps performance following best practices.
 */

import type { Variants } from 'framer-motion';

/**
 * Shimmer animation for loading effect
 * Creates a smooth moving highlight across the skeleton
 */
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0%', '-200% 0%'],
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    }
  }
};

/**
 * Pulse animation for reduced motion accessibility
 * Gentle opacity changes for users who prefer reduced motion
 */
export const pulseVariants: Variants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    }
  }
};

/**
 * Fade in animation for content appearance
 * Used when transitioning from skeleton to actual content
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

/**
 * Staggered animation for multiple skeleton items
 * Creates a wave-like loading effect across multiple elements
 */
export const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Individual item animation for staggered groups
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

/**
 * Animation configuration constants
 */
export const animationConfig = {
  // GPU optimization properties
  willChange: {
    shimmer: 'background-position, opacity',
    pulse: 'opacity',
    default: 'opacity'
  },

  // Transform for GPU layer creation
  transform: 'translateZ(0)',

  // Timing presets
  durations: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    shimmer: 1.5,
    pulse: 2
  },

  // Easing curves
  easings: {
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: 'backOut',
    linear: 'linear'
  }
} as const;