/*
 * ██╗      █████╗ ███╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗     ██████╗  █████╗  ██████╗ ███████╗
 * ██║     ██╔══██╗████╗  ██║██╔══██╗██║████╗  ██║██╔════╝     ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
 * ██║     ███████║██╔██╗ ██║██║  ██║██║██╔██╗ ██║██║  ███╗    ██████╔╝███████║██║  ███╗█████╗
 * ██║     ██╔══██║██║╚██╗██║██║  ██║██║██║╚██╗██║██║   ██║    ██╔═══╝ ██╔══██║██║   ██║██╔══╝
 * ███████╗██║  ██║██║ ╚████║██████╔╝██║██║ ╚████║╚██████╔╝    ██║     ██║  ██║╚██████╔╝███████╗
 * ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 * Landing Page - Marketing Site with Hero, Features, and Pricing
 */

import { Metadata } from 'next';
import { HeroSection } from '../components/landing/hero-section';
import { FeaturesSection } from '../components/landing/features-section';
import { PricingSection } from '../components/landing/pricing-section';

export const metadata: Metadata = {
  title: 'CaseOS™ - Legal AI for Self-Represented Litigants',
  description: 'Revolutionary access to justice platform empowering the 75% of litigants navigating the legal system alone. AI-powered case management, document generation, and legal guidance.',
  keywords: [
    'legal AI',
    'self-represented litigants',
    'legal tech',
    'case management',
    'access to justice',
    'legal documents',
    'court filing',
    'legal research'
  ],
  authors: [{ name: 'CaseOS Team' }],
  openGraph: {
    title: 'CaseOS™ - Legal AI for Self-Represented Litigants',
    description: 'Revolutionary access to justice platform empowering legal self-representation.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-landing.jpg',
        width: 1200,
        height: 630,
        alt: 'CaseOS Legal AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CaseOS™ - Legal AI for Self-Represented Litigants',
    description: 'Revolutionary access to justice platform empowering legal self-representation.',
    images: ['/og-landing.jpg'],
  },
};

/**
 * Landing Page Component
 *
 * Marketing-focused page designed for conversion
 * Based on mockup analysis featuring:
 * - Hero section with cosmic background
 * - Three feature cards (Legal Research, Court Filing, AI Form Drafting)
 * - Pricing section (Basic $299/mo, Pro $599/mo)
 * - Theme-aware design system integration
 */
export default function LandingPage() {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer CTA */}
      <section className="py-16 bg-[var(--color-background)] border-t border-[var(--color-border)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Ready to Take Control of Your Legal Matters?
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of self-represented litigants who have successfully navigated
            the legal system with CaseOS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors duration-200 text-lg"
            >
              Start Your Free Trial
            </a>
            <a
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold rounded-xl hover:bg-[var(--color-surface-elevated)] transition-colors duration-200 text-lg"
            >
              Sign In
            </a>
          </div>
          <p className="mt-6 text-[var(--color-text-tertiary)] text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}