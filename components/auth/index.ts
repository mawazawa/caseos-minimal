/**
 * Authentication Module
 *
 * Clean export interface for the auth system.
 * Provides a single entry point following barrel export pattern.
 */

// Main component
export { default as EnhancedAuthForm } from './EnhancedAuthForm';

// Sub-components for advanced usage
export { FormField } from './FormField';

// Hooks and utilities
export { useAuthForm } from './useAuthForm';

// Validation utilities
export {
  validateEmail,
  validatePassword,
  validateName,
  validateForm,
  hasFormErrors
} from './validation';

// Authentication handlers
export {
  handleCredentialAuth,
  handleGoogleAuth,
  parseAuthError
} from './auth-handlers';

// Types
export type {
  AuthFormProps,
  FormData,
  FormErrors,
  FormFieldProps,
  AuthState
} from './types';

// Animation variants
export {
  formVariants,
  fieldVariants,
  errorVariants,
  buttonVariants,
  googleButtonVariants,
  containerVariants
} from './animations';