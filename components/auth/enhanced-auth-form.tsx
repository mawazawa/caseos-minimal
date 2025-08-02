/**
 * Enhanced Authentication Form - Legacy Compatibility Layer
 *
 * Re-exports the new modular authentication form for backward compatibility.
 * The original 461-line monolith has been refactored into focused, maintainable modules.
 *
 * New architecture:
 * - types.ts: Interface definitions and type safety
 * - validation.ts: Form validation logic (DRY principle)
 * - auth-handlers.ts: Authentication business logic (SRP)
 * - FormField.tsx: Reusable form field component (DRY)
 * - animations.ts: Framer Motion animation variants (SRP)
 * - useAuthForm.ts: State management hook (Custom Hook pattern)
 * - EnhancedAuthForm.tsx: Main composition component (Composition)
 *
 * Benefits:
 * - 461 lines → 7 focused modules (~60-120 lines each)
 * - Eliminated code duplication (DRY)
 * - Single responsibility components (SOLID)
 * - Reusable validation and form fields
 * - Easier testing and maintenance
 * - Better type safety and error handling
 */

// Export the new modular implementation
export { default } from './EnhancedAuthForm';
export type { AuthFormProps } from './types';