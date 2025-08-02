/**
 * Page Skeleton Component
 *
 * Comprehensive page skeleton with header, sidebar, and content areas.
 * Demonstrates complex composition of multiple skeleton components.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseSkeleton } from './BaseSkeleton';
import { CardSkeleton } from './CardSkeleton';
import { TableSkeleton } from './TableSkeleton';
import { ButtonSkeleton } from './ButtonSkeleton';
import { staggerVariants, itemVariants } from './animations';
import type { PageSkeletonProps } from './types';

/**
 * Page Skeleton Component
 *
 * Creates full page skeleton layout with:
 * - Optional header with navigation elements
 * - Optional sidebar with menu items
 * - Main content area with various components
 * - Responsive grid layouts
 * - Coordinated animations across all elements
 */
export function PageSkeleton({
  showSidebar = true,
  showHeader = true,
  className = ''
}: PageSkeletonProps) {
  return (
    <motion.div
      className={cn('min-h-screen bg-gray-50 dark:bg-gray-900', className)}
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Loading page content"
      role="status"
    >
      {/* Header */}
      {showHeader && (
        <motion.div variants={itemVariants}>
          <div className="border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <BaseSkeleton width={120} height={32} />
                <BaseSkeleton width={200} height={32} />
              </div>
              <div className="flex items-center space-x-2">
                <ButtonSkeleton size="sm" />
                <ButtonSkeleton size="sm" variant="secondary" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <motion.div variants={itemVariants}>
            <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 space-y-4">
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={`nav-item-${index}`} className="flex items-center space-x-3">
                    <BaseSkeleton width={20} height={20} variant="rounded" />
                    <BaseSkeleton width="70%" height={16} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div variants={itemVariants} className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <BaseSkeleton width="30%" height={32} className="mb-2" />
              <BaseSkeleton width="50%" height={16} />
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <CardSkeleton showAvatar lines={4} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <CardSkeleton showImage lines={3} />
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <BaseSkeleton width="20%" height={24} className="mb-2" />
                <BaseSkeleton width="40%" height={14} />
              </div>
              <TableSkeleton rows={8} columns={5} />
            </div>

            {/* Action Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <BaseSkeleton width="25%" height={20} />
                <div className="flex space-x-2">
                  <ButtonSkeleton size="sm" />
                  <ButtonSkeleton size="sm" variant="secondary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={`metric-${index}`} className="text-center">
                    <BaseSkeleton width="60%" height={32} className="mx-auto mb-2" />
                    <BaseSkeleton width="80%" height={14} className="mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}