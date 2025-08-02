/**
 * Text Skeleton Component
 *
 * Specialized skeleton for text content with multiple lines.
 * Follows Single Responsibility Principle for text loading states.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseSkeleton } from './BaseSkeleton';
import { staggerVariants, itemVariants } from './animations';
import type { TextSkeletonProps } from './types';

/**
 * Text Skeleton Component
 *
 * Creates multiple skeleton lines for text content with:
 * - Configurable number of lines
 * - Customizable last line width (common UX pattern)
 * - Staggered animation for visual appeal
 * - Proper line spacing
 */
export function TextSkeleton({
  lines = 3,
  className = '',
  lineHeight = 20,
  lastLineWidth = '75%'
}: TextSkeletonProps) {
  return (
    <motion.div
      className={cn('space-y-2', className)}
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
      aria-label={`Loading ${lines} lines of text`}
      role="status"
    >
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1;
        const width = isLastLine ? lastLineWidth : '100%';

        return (
          <motion.div key={`text-line-${index}`} variants={itemVariants}>
            <BaseSkeleton
              height={lineHeight}
              width={width}
              variant="text"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}