/*
 * ██████╗  █████╗  ██████╗ ███████╗    ████████╗██████╗  █████╗ ███╗   ██╗███████╗██╗████████╗██╗ ██████╗ ███╗   ██╗
 * ██╔══██╗██╔══██╗██╔════╝ ██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██║╚══██╔══╝██║██╔═══██╗████╗  ██║
 * ██████╔╝███████║██║  ███╗█████╗         ██║   ██████╔╝███████║██╔██╗ ██║███████╗██║   ██║   ██║██║   ██║██╔██╗ ██║
 * ██╔═══╝ ██╔══██║██║   ██║██╔══╝         ██║   ██╔══██╗██╔══██║██║╚██╗██║╚════██║██║   ██║   ██║██║   ██║██║╚██╗██║
 * ██║     ██║  ██║╚██████╔╝███████╗       ██║   ██║  ██║██║  ██║██║ ╚████║███████║██║   ██║   ██║╚██████╔╝██║ ╚████║
 * ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 * Page Transition Component - Linear-inspired smooth route transitions
 *
 * Following DESIGN_EXCELLENCE.md patterns for premium transitions
 * Respects reduced motion preferences for accessibility
 * GPU-accelerated transforms for 60fps performance
 */

'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation timing optimized for Linear-like speed perception
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    // Use GPU-accelerated properties only for performance
    filter: 'blur(4px)'
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1], // Custom easing for smooth feel
      filter: { duration: 0.3 },
      scale: { duration: 0.3 }
    }
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.04,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1], // Quicker exit
      filter: { duration: 0.2 }
    }
  }
};

// Reduced motion variants for accessibility compliance
const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  in: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  out: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Animation key to trigger transition on route changes
   * Usually the pathname or route identifier
   */
  pageKey?: string;
}

/**
 * PageTransition Component
 *
 * Provides smooth page-to-page transitions with:
 * - Linear-inspired animation timing
 * - Accessibility compliance (reduced motion support)
 * - GPU-accelerated performance
 * - Clean unmount/mount animations
 *
 * @example
 * ```tsx
 * <PageTransition pageKey={pathname}>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */
export function PageTransition({
  children,
  className = '',
  pageKey = 'default'
}: PageTransitionProps) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's motion preferences for accessibility
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Choose appropriate animation variants based on user preference
  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pageKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        className={`min-h-screen ${className}`}
        // Optimize rendering performance
        style={{
          // Promote to GPU layer for smooth animations
          willChange: 'transform, opacity, filter',
          // Enable hardware acceleration
          transform: 'translateZ(0)',
        }}
        // Add accessibility attributes
        aria-live="polite"
        role="main"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Export animation variants for reuse in other components
export { pageVariants, reducedMotionVariants };