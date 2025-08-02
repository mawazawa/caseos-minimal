/**
 * Authentication Handlers
 *
 * Business logic for authentication operations.
 * Separates auth logic from UI components following SRP.
 */

import { signIn } from 'next-auth/react';
import type { FormData } from './types';

/**
 * Handle credential-based authentication
 */
export const handleCredentialAuth = async (
  formData: FormData,
  mode: 'signin' | 'signup',
  callbackUrl: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (mode === 'signup') {
      // Handle signup
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Something went wrong during signup',
        };
      }

      // After successful signup, sign in the user
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl,
        redirect: false,
      });

      if (signInResult?.error) {
        return {
          success: false,
          error: 'Account created successfully, but automatic sign-in failed. Please try signing in manually.',
        };
      }

      return { success: true };
    } else {
      // Handle signin
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        let errorMessage = 'Invalid email or password';

        // Map specific error codes to user-friendly messages
        switch (result.error) {
          case 'CredentialsSignin':
            errorMessage = 'Invalid email or password';
            break;
          case 'CallbackRouteError':
            errorMessage = 'Authentication failed. Please try again.';
            break;
          default:
            errorMessage = 'Something went wrong. Please try again.';
        }

        return {
          success: false,
          error: errorMessage,
        };
      }

      return { success: true };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
};

/**
 * Handle Google OAuth authentication
 */
export const handleGoogleAuth = async (
  callbackUrl: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await signIn('google', {
      callbackUrl,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: 'Google sign-in failed. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      error: 'Failed to connect with Google. Please try again.',
    };
  }
};

/**
 * Parse and handle authentication errors
 */
export const parseAuthError = (error: string | unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};