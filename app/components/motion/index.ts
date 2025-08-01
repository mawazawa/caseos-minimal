/*
 * Motion Components Library - Linear-inspired animations and interactions
 *
 * Export all motion components for easy importing
 * Provides the foundation for premium user experiences
 */

// Page transitions and layout animations
export { PageTransition, pageVariants, reducedMotionVariants } from './page-transition';

// Button interactions and micro-animations
export {
  InteractiveButton,
  buttonVariants,
  rippleVariants
} from './button-interactions';

// Command palette for global navigation
export {
  CommandPalette,
  type CommandItem
} from './command-palette';

// Skeleton loading states
export {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  CardSkeleton,
  TableSkeleton,
  ButtonSkeleton,
  PageSkeleton,
  type SkeletonProps,
  type TextSkeletonProps,
  type AvatarSkeletonProps,
  type CardSkeletonProps,
  type TableSkeletonProps,
  type ButtonSkeletonProps,
  type PageSkeletonProps,
} from './skeleton';