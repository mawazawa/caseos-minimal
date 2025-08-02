/**
 * Avatar Skeleton Component
 *
 * Specialized skeleton for user avatars and profile pictures.
 * Follows Single Responsibility Principle for avatar loading states.
 */

'use client';

import { BaseSkeleton } from './BaseSkeleton';
import { avatarSizeMap } from './types';
import type { AvatarSkeletonProps } from './types';

/**
 * Avatar Skeleton Component
 *
 * Creates circular skeleton for avatar content with:
 * - Consistent sizing across the application
 * - Circular variant for profile pictures
 * - Responsive size options
 * - Proper accessibility labeling
 */
export function AvatarSkeleton({
  size = 'md',
  className = ''
}: AvatarSkeletonProps) {
  const dimensions = avatarSizeMap[size];

  return (
    <BaseSkeleton
      width={dimensions}
      height={dimensions}
      variant="circular"
      className={className}
      aria-label={`Loading ${size} avatar`}
    />
  );
}