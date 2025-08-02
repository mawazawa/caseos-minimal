/**
 * Pricing Section - Legacy Compatibility Layer
 *
 * Re-exports the new modular pricing section for backward compatibility.
 * The original 305-line monolith has been refactored into focused, maintainable modules.
 *
 * New architecture:
 * - types.ts: Interface definitions and pricing data (DRY principle)
 * - animations.ts: Framer Motion animation variants (SRP)
 * - PricingBadge.tsx: Reusable badge component (SRP)
 * - FeatureList.tsx: Reusable feature list component (DRY)
 * - TestimonialQuote.tsx: Social proof testimonial (SRP)
 * - PricingCard.tsx: Individual pricing card (DRY - major win)
 * - PricingSection.tsx: Main composition component (Composition)
 *
 * Benefits:
 * - 305 lines → 7 focused modules (~40-80 lines each)
 * - Eliminated massive code duplication in pricing cards
 * - Single responsibility components (SOLID)
 * - Reusable badge, feature list, and testimonial components
 * - Centralized pricing configuration (easy updates)
 * - Better maintainability and testing
 * - Consistent animations and styling
 */

// Export the new modular implementation
export { PricingSection } from './pricing/PricingSection';
export type { PricingTier, TestimonialData } from './pricing/types';