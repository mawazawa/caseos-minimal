/**
 * Pricing Badge Component
 *
 * Reusable badge for highlighted pricing tiers (e.g., "Most Popular").
 * Follows Single Responsibility Principle for badge display.
 */

'use client';

import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { badgeVariants } from './animations';

interface PricingBadgeProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Animated badge component for pricing tiers
 */
export function PricingBadge({
  text,
  icon = <Crown size={14} />,
  className = ''
}: PricingBadgeProps) {
  return (
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
      <motion.div
        variants={badgeVariants}
        className={`
          bg-[var(--color-accent)] text-[var(--color-accent-text)]
          px-4 py-1 rounded-full text-sm font-medium
          flex items-center gap-2 shadow-lg
          ${className}
        `}
      >
        {icon}
        {text}
      </motion.div>
    </div>
  );
}