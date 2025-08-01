/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Loading Components - Linear-inspired Design System
 */

'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

// Base skeleton component with shimmer animation
export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'rounded-md bg-[var(--color-background-secondary)]',
        'relative overflow-hidden',
        className
      )}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            translateX: ['100%', '-100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}

// Text skeleton with proper line heights
export function SkeletonText({ 
  lines = 1, 
  className 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx(
            'h-4',
            i === lines - 1 && lines > 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  );
}

// Card skeleton for dashboard cards
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'rounded-[var(--radius-lg)] p-4',
        'bg-[var(--color-surface-elevated)]',
        'border border-[var(--color-border-subtle)]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}

// Table row skeleton
export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <div className="px-6 py-4 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-center gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={i}
            className={clsx(
              'h-4',
              i === 0 && 'w-48 flex-shrink-0',
              i === 1 && 'w-24',
              i === 2 && 'w-32',
              i === 3 && 'flex-1'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// List item skeleton for sidebar or lists
export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5">
      <Skeleton className="h-4 w-4 flex-shrink-0" />
      <Skeleton className="h-4 flex-1" />
    </div>
  );
}

// Avatar skeleton
export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return <Skeleton className={clsx('rounded-full', sizeClasses[size])} />;
}

// Button skeleton
export function SkeletonButton({ 
  size = 'default',
  className 
}: { 
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    default: 'h-10 w-24',
    lg: 'h-12 w-32',
  };

  return (
    <Skeleton 
      className={clsx(
        'rounded-[var(--radius-md)]',
        sizeClasses[size],
        className
      )} 
    />
  );
}

// Complete page skeleton
export function SkeletonPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
              <Skeleton className="h-6 w-32" />
            </div>
            <div>
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonTableRow key={i} columns={3} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form skeleton
export function SkeletonForm() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full rounded-[var(--radius-md)]" />
        </div>
      ))}
      <div className="flex gap-3">
        <SkeletonButton />
        <SkeletonButton size="sm" />
      </div>
    </div>
  );
}