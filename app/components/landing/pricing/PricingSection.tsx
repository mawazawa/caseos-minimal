/**
 * Pricing Section - Main Composition Component
 *
 * Clean composition using focused sub-components following SOLID principles.
 * Refactored from 305-line monolith into maintainable, reusable architecture.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

// Focused sub-components
import { PricingCard } from './PricingCard';
import { TestimonialQuote } from './TestimonialQuote';
import { containerVariants, fadeInVariants } from './animations';
import { pricingTiers, testimonialData } from './types';

/**
 * Pricing Section Component
 *
 * Features:
 * - Conversion-optimized pricing plans
 * - Social proof with testimonials
 * - Animated interactions and micro-animations
 * - Mobile-responsive grid layout
 * - Clear value propositions
 * - Money-back guarantee trust signals
 * - Modular, maintainable component architecture
 */
export function PricingSection() {
  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            Choose the plan that fits your legal needs. All plans include our core AI features.
          </p>

          {/* Testimonial Quote */}
          <TestimonialQuote testimonial={testimonialData} />
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInVariants(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--color-text-secondary)] mb-6">
            Need a custom solution for your law firm or organization?
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
          </Link>
        </motion.div>

        {/* Money-back Guarantee */}
        <motion.div
          variants={fadeInVariants(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-full">
            <Shield size={16} className="text-[var(--color-success)]" />
            <span className="text-[var(--color-success)] font-medium">
              30-day money-back guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}