/**
 * Command Palette Animations
 *
 * Linear-inspired animation variants for smooth, delightful interactions.
 * Separates animation logic following Single Responsibility Principle.
 */

import type { Variants } from 'framer-motion';

/**
 * Main dialog animation variants
 * Smooth scale and blur effects inspired by Linear.app
 */
export const dialogVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: -20,
    filter: 'blur(4px)'
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1] as const // Linear-inspired easing
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -10,
    filter: 'blur(2px)',
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1] as const
    }
  }
};

/**
 * Backdrop animation variants
 * Subtle backdrop fade for depth perception
 */
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

/**
 * Command item hover animations
 * Micro-interactions for individual command items
 */
export const itemVariants: Variants = {
  initial: {
    x: 0,
    backgroundColor: 'transparent'
  },
  hover: {
    x: 2,
    backgroundColor: 'var(--hover-bg)',
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

/**
 * List container animations
 * Staggered appearance for command groups
 */
export const listVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.02,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.1
    }
  }
};

/**
 * Animation configuration constants
 */
export const animationConfig = {
  // Spring configurations for natural movement
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30
  },

  // Easing curves matching Linear.app design system
  easings: {
    primary: [0.16, 1, 0.3, 1] as const,
    secondary: [0.4, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const
  },

  // Duration presets for consistency
  durations: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2
  }
} as const;