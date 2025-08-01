/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Loading Components - Linear-inspired premium loading states
 * 
 * Creates shimmer effects and loading patterns that match the design system
 * Provides smooth transitions from loading to loaded content
 * GPU-accelerated animations for 60fps performance
 */

'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Shimmer animation variants for smooth loading effect
const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0%', '-200% 0%'],
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    }
  }
};

// Fade in variants for content appearance (reserved for future use)
// const fadeInVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       duration: 0.3,
//       ease: [0.4, 0, 0.2, 1]
//     }
//   }
// };

// Pulse variants for reduced motion
const pulseVariants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    }
  }
};

interface SkeletonProps extends HTMLMotionProps<'div'> {
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

/**
 * Base Skeleton Component
 * 
 * Provides a loading placeholder with shimmer effect
 * Respects reduced motion preferences
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height={20} variant="text" />
 * <Skeleton width={40} height={40} variant="circular" />
 * ```
 */
export function Skeleton({ 
  width = '100%',
  height = 20,
  variant = 'rectangular',
  className = '',
  shimmer = true,
  style = {},
  ...props 
}: SkeletonProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Variant-specific styles
  const variantStyles = {
    rectangular: 'rounded-md',
    rounded: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded-sm'
  }[variant];

  // Base skeleton styles
  const baseStyles = cn(
    'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200',
    'dark:from-gray-800 dark:via-gray-700 dark:to-gray-800',
    variantStyles,
    className
  );

  // Animation styles based on user preference
  const animationStyles = shimmer && !prefersReducedMotion
    ? {
        backgroundSize: '200% 100%',
        ...style
      }
    : style;

  // Choose animation variant based on preferences
  const animationVariants = shimmer
    ? (prefersReducedMotion ? pulseVariants : shimmerVariants)
    : {};

  return (
    <motion.div
      className={baseStyles}
      style={{
        width,
        height,
        ...animationStyles,
        // GPU optimization
        willChange: shimmer ? 'background-position, opacity' : 'opacity',
        transform: 'translateZ(0)',
      }}
      variants={animationVariants}
      animate={shimmer ? 'animate' : undefined}
      {...props}
    />
  );
}

/**
 * Text Skeleton Component
 * 
 * Specialized skeleton for text content with multiple lines
 */
interface TextSkeletonProps {
  lines?: number;
  className?: string;
  lineHeight?: number;
  lastLineWidth?: string;
}

export function TextSkeleton({ 
  lines = 3,
  className = '',
  lineHeight = 20,
  lastLineWidth = '75%'
}: TextSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          variant="text"
        />
      ))}
    </div>
  );
}

/**
 * Avatar Skeleton Component
 * 
 * Specialized skeleton for user avatars
 */
interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarSkeleton({ size = 'md', className = '' }: AvatarSkeletonProps) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80
  };

  return (
    <Skeleton
      width={sizeMap[size]}
      height={sizeMap[size]}
      variant="circular"
      className={className}
    />
  );
}

/**
 * Card Skeleton Component
 * 
 * Specialized skeleton for card components
 */
interface CardSkeletonProps {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
  className?: string;
}

export function CardSkeleton({ 
  showAvatar = false,
  showImage = false,
  lines = 3,
  className = ''
}: CardSkeletonProps) {
  return (
    <div className={cn('p-6 space-y-4', className)}>
      {/* Header with optional avatar */}
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <AvatarSkeleton size="md" />
          <div className="space-y-2 flex-1">
            <Skeleton height={16} width="40%" />
            <Skeleton height={14} width="60%" />
          </div>
        </div>
      )}

      {/* Optional image */}
      {showImage && (
        <Skeleton height={200} width="100%" variant="rounded" />
      )}

      {/* Content lines */}
      <TextSkeleton lines={lines} />

      {/* Action buttons area */}
      <div className="flex items-center space-x-2 pt-2">
        <Skeleton height={32} width={80} variant="rounded" />
        <Skeleton height={32} width={60} variant="rounded" />
      </div>
    </div>
  );
}

/**
 * Table Skeleton Component
 * 
 * Specialized skeleton for table/list data
 */
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export function TableSkeleton({ 
  rows = 5,
  columns = 4,
  showHeader = true,
  className = ''
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Table Header */}
      {showHeader && (
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={`header-${index}`} height={16} width="80%" />
          ))}
        </div>
      )}

      {/* Table Rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton 
                key={`cell-${rowIndex}-${colIndex}`}
                height={20}
                width={colIndex === 0 ? '90%' : '70%'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Button Skeleton Component
 * 
 * Specialized skeleton for button elements
 */
interface ButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  width?: string | number;
  className?: string;
}

export function ButtonSkeleton({ 
  size = 'md',
  variant = 'primary',
  width,
  className = ''
}: ButtonSkeletonProps) {
  const sizeMap = {
    sm: { height: 32, defaultWidth: 80 },
    md: { height: 40, defaultWidth: 100 },
    lg: { height: 48, defaultWidth: 120 }
  };

  const { height, defaultWidth } = sizeMap[size];

  return (
    <Skeleton
      height={height}
      width={width || defaultWidth}
      variant="rounded"
      className={cn(
        variant === 'primary' ? 'bg-blue-200 dark:bg-blue-800' : '',
        className
      )}
    />
  );
}

/**
 * Page Skeleton Component
 * 
 * Full page loading skeleton with header, content, and sidebar
 */
interface PageSkeletonProps {
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

export function PageSkeleton({ 
  showSidebar = true,
  showHeader = true,
  className = ''
}: PageSkeletonProps) {
  return (
    <div className={cn('min-h-screen bg-gray-50 dark:bg-gray-900', className)}>
      {/* Header */}
      {showHeader && (
        <div className="border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton width={120} height={32} />
              <Skeleton width={200} height={32} />
            </div>
            <div className="flex items-center space-x-2">
              <ButtonSkeleton size="sm" />
              <ButtonSkeleton size="sm" variant="secondary" />
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 space-y-4">
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Skeleton width={20} height={20} variant="rounded" />
                  <Skeleton width="70%" height={16} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <Skeleton width="30%" height={32} className="mb-2" />
              <Skeleton width="50%" height={16} />
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSkeleton showAvatar lines={4} />
              <CardSkeleton showImage lines={3} />
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <TableSkeleton rows={8} columns={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export all skeleton variants
export {
  type SkeletonProps,
  type TextSkeletonProps,
  type AvatarSkeletonProps,
  type CardSkeletonProps,
  type TableSkeletonProps,
  type ButtonSkeletonProps,
  type PageSkeletonProps,
};