/**
 * Pricing Section Module
 *
 * Clean export interface for the pricing system.
 * Barrel export pattern for focused, maintainable components.
 */

// Main component
export { PricingSection } from './PricingSection';

// Sub-components for advanced usage
export { PricingCard } from './PricingCard';
export { PricingBadge } from './PricingBadge';
export { FeatureList } from './FeatureList';
export { TestimonialQuote } from './TestimonialQuote';

// Types and configuration
export type { PricingTier, TestimonialData } from './types';
export { pricingTiers, testimonialData } from './types';

// Animation variants
export {
  containerVariants,
  cardVariants,
  badgeVariants,
  featureListVariants,
  featureItemVariants,
  priceVariants,
  ctaVariants,
  fadeInVariants
} from './animations';