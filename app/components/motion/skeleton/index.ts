/**
 * Skeleton Loading System - Main Module
 *
 * Comprehensive skeleton system following compound component pattern.
 * Provides focused, reusable skeleton components for all loading states.
 */

// Base skeleton component
export { BaseSkeleton } from './BaseSkeleton';

// Specialized skeleton components
export { TextSkeleton } from './TextSkeleton';
export { AvatarSkeleton } from './AvatarSkeleton';
export { ButtonSkeleton } from './ButtonSkeleton';
export { CardSkeleton } from './CardSkeleton';
export { TableSkeleton } from './TableSkeleton';
export { PageSkeleton } from './PageSkeleton';

// Types for external usage
export type {
  BaseSkeletonProps,
  TextSkeletonProps,
  AvatarSkeletonProps,
  ButtonSkeletonProps,
  CardSkeletonProps,
  TableSkeletonProps,
  PageSkeletonProps
} from './types';

// Configuration and constants
export { avatarSizeMap, buttonSizeMap } from './types';

// Animation variants for custom implementations
export {
  shimmerVariants,
  pulseVariants,
  fadeInVariants,
  staggerVariants,
  itemVariants,
  animationConfig
} from './animations';

// Convenience re-export of base skeleton as main Skeleton
export { BaseSkeleton as Skeleton } from './BaseSkeleton';