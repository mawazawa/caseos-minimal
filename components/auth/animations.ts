/**
 * Authentication Form Animations
 *
 * Centralized animation variants for auth components.
 * Follows Single Responsibility Principle for animation logic.
 */

import type { Variants } from 'framer-motion';

/**
 * Main form container animation
 */
export const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
      staggerChildren: 0.1
    }
  }
};

/**
 * Individual field animation
 */
export const fieldVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

/**
 * Error message animation
 */
export const errorVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15
    }
  }
};

/**
 * Button loading animation
 */
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  loading: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  },
  success: {
    scale: 1,
    backgroundColor: 'var(--color-success)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

/**
 * Google button specific animation
 */
export const googleButtonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  },
  loading: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  }
};

/**
 * Container animation for mode switching
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};