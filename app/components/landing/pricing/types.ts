/**
 * Pricing Section Types & Configuration
 *
 * Centralized type definitions and pricing data following DRY principle.
 * Single source of truth for pricing configuration.
 */

export interface PricingTier {
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

export interface TestimonialData {
  quote: string;
  author: string;
  rating: number;
}

/**
 * Pricing tiers configuration based on mockup
 * Easy to update and maintain in one place
 */
export const pricingTiers: PricingTier[] = [
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

/**
 * Testimonial configuration
 */
export const testimonialData: TestimonialData = {
  quote: "CaseOS has transformed the way I approach my legal matters. The AI tools are intuitive and highly effective.",
  author: "Sarah Chen, Self-Represented Litigant",
  rating: 5
};