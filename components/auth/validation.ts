/**
 * Authentication Form Validation
 *
 * Centralized validation logic following Single Responsibility Principle.
 * Reusable validation functions for auth forms.
 */

import type { FormData, FormErrors } from './types';

/**
 * Validate email format
 */
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  // Optional: Add more complex password requirements
  // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
  //   return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  // }

  return null;
};

/**
 * Validate name field
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Full name is required';
  }

  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }

  return null;
};

/**
 * Validate entire form based on mode
 */
export const validateForm = (formData: FormData, mode: 'signin' | 'signup'): FormErrors => {
  const errors: FormErrors = {};

  // Email validation
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Password validation
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // Name validation for signup
  if (mode === 'signup') {
    const nameError = validateName(formData.name);
    if (nameError) {
      errors.name = nameError;
    }
  }

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};