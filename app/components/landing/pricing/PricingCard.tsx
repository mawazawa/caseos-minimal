/**
 * Pricing Card Component
 *
 * Reusable pricing card eliminating massive code duplication.
 * Follows DRY principle - was repeated for each tier in original.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PricingBadge } from './PricingBadge';
import { FeatureList } from './FeatureList';
import { cardVariants, priceVariants, ctaVariants } from './animations';
import type { PricingTier } from './types';

interface PricingCardProps {
  tier: PricingTier;
  className?: string;
}

/**
 * Individual pricing card with all features and animations
 */
export function PricingCard({ tier, className = '' }: PricingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`relative group ${tier.highlighted ? 'lg:scale-105' : ''} ${className}`}
    >
      {/* Highlight Badge */}
      {tier.badge && <PricingBadge text={tier.badge} />}

      {/* Pricing Card Container */}
      <div className={`
        h-full bg-[var(--color-surface-elevated)] border rounded-2xl p-8 relative overflow-hidden
        transition-all duration-300 hover:shadow-[var(--shadow-xl)]
        ${tier.highlighted
          ? 'border-[var(--color-accent)] shadow-[var(--shadow-lg)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/20'
        }
      `}>
        {/* Background Gradient */}
        <div className={`
          absolute inset-0 transition-opacity duration-300
          ${tier.highlighted
            ? 'bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-success)]/5 opacity-100'
            : 'bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-success)]/5 opacity-0 group-hover:opacity-100'
          }
        `} />

        {/* Content */}
        <div className="relative z-10">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center ${
              tier.highlighted
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)]'
            }`}>
              {tier.highlighted ? <Star size={24} /> : <Zap size={24} />}
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              {tier.name}
            </h3>

            <p className="text-[var(--color-text-secondary)] text-sm">
              {tier.description}
            </p>
          </div>

          {/* Pricing */}
          <motion.div
            variants={priceVariants}
            className="text-center mb-8"
          >
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-[var(--color-text-primary)]">
                ${tier.price}
              </span>
              <span className="text-[var(--color-text-secondary)] ml-1">
                {tier.period}
              </span>
            </div>
          </motion.div>

          {/* Features */}
          <div className="mb-8">
            <FeatureList
              features={tier.features}
              highlighted={tier.highlighted}
            />
          </div>

          {/* CTA Button */}
          <motion.div variants={ctaVariants} whileHover="hover" whileTap="tap">
            <Link href="/auth/signup">
              <Button
                variant={tier.ctaVariant}
                size="lg"
                className="w-full"
              >
                {tier.ctaText}
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-[var(--color-text-tertiary)] text-xs">
              14-day free trial • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}