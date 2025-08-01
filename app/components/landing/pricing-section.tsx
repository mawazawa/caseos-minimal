/*
 * ██████╗ ██████╗ ██╗ ██████╗██╗███╗   ██╗ ██████╗
 * ██╔══██╗██╔══██╗██║██╔════╝██║████╗  ██║██╔════╝
 * ██████╔╝██████╔╝██║██║     ██║██╔██╗ ██║██║  ███╗
 * ██╔═══╝ ██╔══██╗██║██║     ██║██║╚██╗██║██║   ██║
 * ██║     ██║  ██║██║╚██████╗██║██║ ╚████║╚██████╔╝
 * ╚═╝     ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝╚═╝  ╚═══╝ ╚═════╝
 * Landing Page Pricing Section - Conversion-Optimized Plans
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
}

/**
 * Pricing Section Component
 *
 * Based on mockup showing Basic ($299/mo) and Pro ($599/mo) tiers
 * Optimized for conversion with clear value propositions
 */
export function PricingSection() {
  const pricingTiers: PricingTier[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 299,
      period: '/mo',
      description: 'Perfect for individuals handling simple legal matters',
      features: [
        'AI-powered document generation',
        'Basic legal research access',
        'Court filing assistance',
        'Email support',
        '5 active cases',
        'Standard templates library',
        'Basic deadline tracking',
        'Mobile app access'
      ],
      ctaText: 'Get Started',
      ctaVariant: 'secondary'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 599,
      period: '/mo',
      description: 'Comprehensive solution for complex litigation and businesses',
      badge: 'Most Popular',
      highlighted: true,
      features: [
        'Advanced AI legal assistant',
        'Unlimited legal research',
        'Priority court filing',
        '24/7 phone & chat support',
        'Unlimited active cases',
        'Premium templates & forms',
        'Advanced case management',
        'Expert legal consultation',
        'Custom document review',
        'Priority processing',
        'API access',
        'Team collaboration tools'
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'primary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section className="py-24 bg-[var(--color-background-secondary)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-success)]/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
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
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 max-w-3xl mx-auto">
            <blockquote className="text-lg text-[var(--color-text-primary)] font-medium italic mb-4">
              &ldquo;CaseOS has transformed the way I approach my legal matters. The AI tools are intuitive and highly effective.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-[var(--color-warning)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-[var(--color-text-secondary)] text-sm">
                - Sarah Chen, Self-Represented Litigant
              </span>
            </div>
          </div>
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
            <motion.div
              key={tier.id}
              variants={cardVariants}
              className={`relative group ${tier.highlighted ? 'lg:scale-105' : ''}`}
            >
              {/* Highlight Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-[var(--color-accent)] text-[var(--color-accent-text)] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <Crown size={14} />
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* Pricing Card */}
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
                      {tier.highlighted ? <Zap size={24} /> : <Shield size={24} />}
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                        ${tier.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-[var(--color-text-secondary)]">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-tertiary)] text-sm mt-2">
                      Billed monthly, cancel anytime
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            tier.highlighted
                              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                              : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                          }`}>
                            <Check size={12} />
                          </div>
                          <span className="text-[var(--color-text-secondary)] text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={tier.ctaVariant}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link href="/auth/signup">
                      {tier.ctaText}
                    </Link>
                  </Button>

                  {/* Additional Info */}
                  <div className="mt-6 text-center">
                    <p className="text-[var(--color-text-tertiary)] text-xs">
                      14-day free trial • No setup fees • Cancel anytime
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--color-text-secondary)] mb-6">
            Need a custom solution for your law firm or organization?
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">
              Contact Sales
            </Link>
          </Button>
        </motion.div>

        {/* Money-back Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
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