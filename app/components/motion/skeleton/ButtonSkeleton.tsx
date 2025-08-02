/**
 * Button Skeleton Component
 *
 * Specialized skeleton for button elements.
 * Follows Single Responsibility Principle for button loading states.
 */

'use client';

import { cn } from '@/lib/utils';
import { BaseSkeleton } from './BaseSkeleton';
import { buttonSizeMap } from './types';
import type { ButtonSkeletonProps } from './types';

/**
 * Button Skeleton Component
 *
 * Creates button-shaped skeleton with:
 * - Consistent button sizing
 * - Variant-based styling
 * - Proper button proportions
 * - Accessibility compliance
 */
export function ButtonSkeleton({
  size = 'md',
  variant = 'primary',
  width,
  className = ''
}: ButtonSkeletonProps) {
  const { height, width: defaultWidth } = buttonSizeMap[size];

  return (
    <BaseSkeleton
      height={height}
      width={width || defaultWidth}
      variant="rounded"
      className={cn(
        // Variant-specific styling
        variant === 'primary'
          ? 'bg-blue-200 dark:bg-blue-800'
          : 'bg-gray-200 dark:bg-gray-700',
        className
      )}
      aria-label={`Loading ${size} ${variant} button`}
    />
  );
}