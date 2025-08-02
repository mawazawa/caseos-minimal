/**
 * Skeleton Loading Components - Legacy Compatibility Layer
 *
 * Re-exports the new modular skeleton system for backward compatibility.
 * The original 446-line monolith has been refactored into focused, maintainable modules.
 *
 * New architecture follows compound component pattern:
 * - types.ts: Interface definitions and size mappings (ISP)
 * - animations.ts: Framer Motion variants and GPU optimizations (SRP)
 * - BaseSkeleton.tsx: Core skeleton with accessibility (SRP)
 * - TextSkeleton.tsx: Multi-line text skeleton (SRP)
 * - AvatarSkeleton.tsx: Circular avatar skeleton (SRP)
 * - ButtonSkeleton.tsx: Button-shaped skeleton (SRP)
 * - CardSkeleton.tsx: Complex card layout skeleton (Composition)
 * - TableSkeleton.tsx: Data table skeleton (SRP)
 * - PageSkeleton.tsx: Full page skeleton (Composition)
 * - index.ts: Barrel exports and main module (Clean Interface)
 *
 * Benefits:
 * - 446 lines → 10 focused modules (~30-80 lines each)
 * - Compound component pattern for flexible usage
 * - Single responsibility components (SOLID)
 * - GPU-optimized animations (60fps performance)
 * - Accessibility compliance (reduced motion, ARIA labels)
 * - Better maintainability and testing
 * - Consistent theming across all skeleton types
 * - Easy to extend with new skeleton variants
 */

// Export the new modular skeleton system
export {
  // Main skeleton component (most common usage)
  BaseSkeleton as Skeleton, // Primary export for backward compatibility
  BaseSkeleton,

  // Specialized skeleton components
  TextSkeleton,
  AvatarSkeleton,
  ButtonSkeleton,
  CardSkeleton,
  TableSkeleton,
  PageSkeleton,

  // Animation variants for custom usage
  shimmerVariants,
  pulseVariants,
  fadeInVariants,
  staggerVariants,
  itemVariants,
  animationConfig
} from './skeleton/index';

// Export types for TypeScript users
export type {
  BaseSkeletonProps as SkeletonProps, // Legacy compatibility
  BaseSkeletonProps,
  TextSkeletonProps,
  AvatarSkeletonProps,
  ButtonSkeletonProps,
  CardSkeletonProps,
  TableSkeletonProps,
  PageSkeletonProps
} from './skeleton/types';