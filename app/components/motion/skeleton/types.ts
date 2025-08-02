/**
 * Skeleton Loading Types & Configuration
 *
 * Centralized type definitions for all skeleton components.
 * Follows Interface Segregation Principle for focused interfaces.
 */

import type { HTMLMotionProps } from 'framer-motion';

export interface BaseSkeletonProps extends HTMLMotionProps<'div'> {
  /**
   * Width of the skeleton (CSS value)
   */
  width?: string | number;
  /**
   * Height of the skeleton (CSS value)
   */
  height?: string | number;
  /**
   * Variant style of the skeleton
   */
  variant?: 'rectangular' | 'rounded' | 'circular' | 'text';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show shimmer effect (default: true)
   */
  shimmer?: boolean;
}

export interface TextSkeletonProps {
  lines?: number;
  className?: string;
  lineHeight?: number;
  lastLineWidth?: string;
}

export interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface CardSkeletonProps {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
  className?: string;
}

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export interface ButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  width?: string | number;
  className?: string;
}

export interface PageSkeletonProps {
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

/**
 * Size mappings for consistent skeleton sizing
 */
export const avatarSizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80
} as const;

export const buttonSizeMap = {
  sm: { height: 32, width: 80 },
  md: { height: 40, width: 100 },
  lg: { height: 48, width: 120 }
} as const;