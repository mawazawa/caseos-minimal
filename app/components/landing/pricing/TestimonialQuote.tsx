/**
 * Testimonial Quote Component
 *
 * Reusable testimonial display for social proof.
 * Follows Single Responsibility Principle for testimonial rendering.
 */

'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { TestimonialData } from './types';

interface TestimonialQuoteProps {
  testimonial: TestimonialData;
  className?: string;
}

/**
 * Animated testimonial quote with star rating
 */
export function TestimonialQuote({
  testimonial,
  className = ''
}: TestimonialQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        bg-[var(--color-surface)] border border-[var(--color-border)]
        rounded-xl p-6 max-w-3xl mx-auto
        ${className}
      `}
    >
      <blockquote className="text-lg text-[var(--color-text-primary)] font-medium italic mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center justify-center gap-2">
        {/* Star Rating */}
        <div className="flex text-[var(--color-warning)]">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>

        {/* Author */}
        <span className="text-[var(--color-text-secondary)] text-sm">
          - {testimonial.author}
        </span>
      </div>
    </motion.div>
  );
}