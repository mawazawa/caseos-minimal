/**
 * Table Skeleton Component
 *
 * Specialized skeleton for table layouts and data grids.
 * Follows Single Responsibility Principle for tabular loading states.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseSkeleton } from './BaseSkeleton';
import { staggerVariants, itemVariants } from './animations';
import type { TableSkeletonProps } from './types';

/**
 * Table Skeleton Component
 *
 * Creates table skeleton with:
 * - Configurable rows and columns
 * - Optional header row
 * - Proper table structure
 * - Varied column widths for realism
 * - Staggered row animations
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = ''
}: TableSkeletonProps) {
  // Generate varied column widths for more realistic appearance
  const getColumnWidth = (index: number) => {
    const widths = ['25%', '35%', '20%', '20%', '30%', '15%'];
    return widths[index % widths.length] || '25%';
  };

  return (
    <motion.div
      className={cn('space-y-4', className)}
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
      aria-label={`Loading table with ${rows} rows and ${columns} columns`}
      role="status"
    >
      {/* Table Header */}
      {showHeader && (
        <motion.div variants={itemVariants}>
          <div className="grid gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
               style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, index) => (
              <BaseSkeleton
                key={`header-${index}`}
                height={16}
                width={getColumnWidth(index)}
                variant="text"
                className="font-medium"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Table Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <motion.div
            key={`row-${rowIndex}`}
            variants={itemVariants}
            className="grid gap-4 py-2"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <BaseSkeleton
                key={`cell-${rowIndex}-${colIndex}`}
                height={14}
                width={getColumnWidth(colIndex)}
                variant="text"
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}