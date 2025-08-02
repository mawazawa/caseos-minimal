/**
 * Feature List Component
 *
 * Reusable feature list with consistent styling and animations.
 * Eliminates code duplication following DRY principle.
 */

'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { featureListVariants, featureItemVariants } from './animations';

interface FeatureListProps {
  features: string[];
  highlighted?: boolean;
  className?: string;
}

/**
 * Animated feature list for pricing cards
 */
export function FeatureList({
  features,
  highlighted = false,
  className = ''
}: FeatureListProps) {
  return (
    <motion.ul
      variants={featureListVariants}
      className={`space-y-4 ${className}`}
    >
      {features.map((feature, index) => (
        <motion.li
          key={`feature-${index}`}
          variants={featureItemVariants}
          className="flex items-start gap-3"
        >
          <div className={`
            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
            ${highlighted
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
              : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
            }
          `}>
            <Check size={12} />
          </div>
          <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
            {feature}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}