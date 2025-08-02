/**
 * Card Skeleton Component
 *
 * Specialized skeleton for card layouts.
 * Demonstrates composition of multiple skeleton elements.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseSkeleton } from './BaseSkeleton';
import { AvatarSkeleton } from './AvatarSkeleton';
import { TextSkeleton } from './TextSkeleton';
import { staggerVariants, itemVariants } from './animations';
import type { CardSkeletonProps } from './types';

/**
 * Card Skeleton Component
 *
 * Creates comprehensive card skeleton with:
 * - Optional avatar section
 * - Optional image placeholder
 * - Configurable text lines
 * - Proper card structure and spacing
 * - Staggered animations for smooth loading
 */
export function CardSkeleton({
  showAvatar = false,
  showImage = false,
  lines = 3,
  className = ''
}: CardSkeletonProps) {
  return (
    <motion.div
      className={cn('p-6 space-y-4', className)}
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Loading card content"
      role="status"
    >
      {/* Header with optional avatar */}
      {showAvatar && (
        <motion.div variants={itemVariants} className="flex items-center space-x-3">
          <AvatarSkeleton size="md" />
          <div className="space-y-2 flex-1">
            <BaseSkeleton height={16} width="40%" />
            <BaseSkeleton height={14} width="60%" />
          </div>
        </motion.div>
      )}

      {/* Optional image placeholder */}
      {showImage && (
        <motion.div variants={itemVariants}>
          <BaseSkeleton
            height={200}
            width="100%"
            variant="rounded"
            className="bg-gray-200 dark:bg-gray-700"
          />
        </motion.div>
      )}

      {/* Content area with text lines */}
      <motion.div variants={itemVariants}>
        <TextSkeleton lines={lines} />
      </motion.div>

      {/* Action area */}
      <motion.div variants={itemVariants} className="flex justify-between items-center pt-2">
        <div className="flex space-x-2">
          <BaseSkeleton height={32} width={80} variant="rounded" />
          <BaseSkeleton height={32} width={60} variant="rounded" />
        </div>
        <BaseSkeleton height={20} width={40} />
      </motion.div>
    </motion.div>
  );
}