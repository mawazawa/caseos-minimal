/**
 * Enhanced Authentication Form - Main Component
 *
 * Composition component using focused modules following SOLID principles.
 * Refactored from 461-line monolith into clean, maintainable architecture.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

// Focused modules
import { useAuthForm } from './useAuthForm';
import { FormField } from './FormField';
import { formVariants, errorVariants } from './animations';
import type { AuthFormProps } from './types';

/**
 * Enhanced Authentication Form Component
 *
 * Features:
 * - Full theme integration with CSS custom properties
 * - Smooth animations and micro-interactions
 * - Comprehensive error handling with focused validation
 * - Loading states with visual feedback
 * - Accessibility compliance
 * - Professional button styling
 * - Modular, maintainable architecture
 */
export default function EnhancedAuthForm({ mode }: AuthFormProps) {
  const {
    authState,
    handleChange,
    handleSubmit,
    handleGoogleSignIn,
    togglePassword
  } = useAuthForm({ mode });

  const { isLoading, isGoogleLoading, showPassword, formData, errors } = authState;
  const isSignup = mode === 'signup';

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* General Error Message */}
      <AnimatePresence>
        {errors.general && (
          <motion.div
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-4 bg-[var(--color-error-background)] border border-[var(--color-error)]/20 rounded-xl flex items-center gap-3"
          >
            <AlertCircle size={20} className="text-[var(--color-error)] flex-shrink-0" />
            <p className="text-[var(--font-size-sm)] text-[var(--color-error)]">
              {errors.general}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Field (Signup Only) */}
      <AnimatePresence>
        {isSignup && (
          <FormField
            id="name"
            name="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            error={errors.name}
            required={isSignup}
            onChange={handleChange}
            icon={<User size={16} />}
          />
        )}
      </AnimatePresence>

      {/* Email Field */}
      <FormField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        value={formData.email}
        error={errors.email}
        required
        onChange={handleChange}
        icon={<Mail size={16} />}
      />

      {/* Password Field */}
      <FormField
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder={isSignup ? "Create a strong password" : "Enter your password"}
        value={formData.password}
        error={errors.password}
        required
        onChange={handleChange}
        icon={<Lock size={16} />}
        showPasswordToggle
        onPasswordToggle={togglePassword}
        showPassword={showPassword}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading || isGoogleLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            {isSignup ? 'Creating Account...' : 'Signing In...'}
          </>
        ) : (
          <>
            {isSignup ? 'Create Account' : 'Sign In'}
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center text-[var(--font-size-sm)]">
          <span className="px-4 bg-[var(--color-background)] text-[var(--color-text-tertiary)]">
            or
          </span>
        </div>
      </div>

      {/* Google Sign In Button */}
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Connecting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </Button>

      {/* Footer */}
      <div className="text-center text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <a
              href="/auth/signin"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              Sign in
            </a>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <a
              href="/auth/signup"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              Sign up
            </a>
          </>
        )}
      </div>
    </motion.form>
  );
}

// Re-export types for external use
export type { AuthFormProps } from './types';