/**
 * Base Skeleton Component
 *
 * Core skeleton component following Single Responsibility Principle.
 * Foundation for all other skeleton variants with consistent behavior.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { shimmerVariants, pulseVariants, animationConfig } from './animations';
import type { BaseSkeletonProps } from './types';

/**
 * Detect if user prefers reduced motion
 * Respects accessibility preferences for motion sensitivity
 */
const prefersReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

/**
 * Base Skeleton Component
 *
 * Provides the fundamental skeleton loading UI with:
 * - Shimmer or pulse animations based on user preferences
 * - GPU-optimized performance
 * - Accessibility compliance
 * - Consistent theming
 */
export function BaseSkeleton({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  className = '',
  shimmer = true,
  ...props
}: BaseSkeletonProps) {
  // Use reduced motion animation if user prefers it
  const shouldUseReducedMotion = prefersReducedMotion();
  const shouldShimmer = shimmer && !shouldUseReducedMotion;

  // Select appropriate animation variant
  const animationVariants = shouldShimmer ? shimmerVariants : pulseVariants;

  // Generate variant-specific styles
  const variantStyles = {
    rectangular: 'rounded-md',
    rounded: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded-sm'
  };

  // Animation styles based on shimmer preference
  const animationStyles = shouldShimmer
    ? {
        background: `linear-gradient(
          90deg,
          var(--color-background-secondary) 25%,
          var(--color-background-tertiary) 50%,
          var(--color-background-secondary) 75%
        )`,
        backgroundSize: '200% 100%',
      }
    : {
        backgroundColor: 'var(--color-background-secondary)',
      };

  return (
    <motion.div
      className={cn(
        'animate-pulse',
        variantStyles[variant],
        className
      )}
      style={{
        width,
        height,
        ...animationStyles,
        // GPU optimization
        willChange: shouldShimmer
          ? animationConfig.willChange.shimmer
          : animationConfig.willChange.pulse,
        transform: animationConfig.transform,
      }}
      variants={animationVariants}
      animate={shouldShimmer || !shouldUseReducedMotion ? 'animate' : undefined}
      aria-label="Loading content"
      role="status"
      {...props}
    />
  );
}