/**
 * Authentication Form Hook
 *
 * Custom hook for auth form state management and business logic.
 * Follows Single Responsibility Principle and custom hooks pattern.
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FormData, FormErrors, AuthState } from './types';
import { validateForm, hasFormErrors } from './validation';
import { handleCredentialAuth, handleGoogleAuth, parseAuthError } from './auth-handlers';

interface UseAuthFormProps {
  mode: 'signin' | 'signup';
}

export function useAuthForm({ mode }: UseAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Handle form field changes
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Toggle password visibility
   */
  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Set a specific error
   */
  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    const validationErrors = validateForm(formData, mode);

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await handleCredentialAuth(formData, mode, callbackUrl);

      if (result.success) {
        // Redirect on success
        router.push(callbackUrl);
      } else {
        setError('general', result.error || 'Authentication failed');
      }
    } catch (error) {
      setError('general', parseAuthError(error));
    } finally {
      setIsLoading(false);
    }
  }, [formData, mode, callbackUrl, router, clearErrors, setError]);

  /**
   * Handle Google authentication
   */
  const handleGoogleSignIn = useCallback(async () => {
    setIsGoogleLoading(true);
    clearErrors();

    try {
      const result = await handleGoogleAuth(callbackUrl);

      if (result.success) {
        router.push(callbackUrl);
      } else {
        setError('general', result.error || 'Google sign-in failed');
      }
    } catch (error) {
      setError('general', parseAuthError(error));
    } finally {
      setIsGoogleLoading(false);
    }
  }, [callbackUrl, router, clearErrors, setError]);

  /**
   * Get auth state
   */
  const authState: AuthState = {
    isLoading,
    isGoogleLoading,
    showPassword,
    formData,
    errors
  };

  return {
    // State
    authState,

    // Computed
    hasErrors: hasFormErrors(errors),

    // Handlers
    handleChange,
    handleSubmit,
    handleGoogleSignIn,
    togglePassword,
    clearErrors,
    setError
  };
}