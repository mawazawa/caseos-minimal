/*
 *  █████╗ ██╗   ██╗████████╗██╗  ██╗    ███████╗ ██████╗ ██████╗ ███╗   ███╗
 * ██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ██╔════╝██╔═══██╗██╔══██╗████╗ ████║
 * ███████║██║   ██║   ██║   ███████║    █████╗  ██║   ██║██████╔╝██╔████╔██║
 * ██╔══██║██║   ██║   ██║   ██╔══██║    ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║
 * ██║  ██║╚██████╔╝   ██║   ██║  ██║    ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║
 * ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
 * Enhanced Authentication Form - Theme-Aware Design System
 */

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

interface FormData {
  email: string;
  password: string;
  name: string;
}

interface FormErrors {
  [key: string]: string;
}

/**
 * Enhanced Authentication Form Component
 *
 * Features:
 * - Full theme integration with CSS custom properties
 * - Smooth animations and micro-interactions
 * - Comprehensive error handling
 * - Loading states with visual feedback
 * - Accessibility compliance
 * - Professional button styling
 */
export default function EnhancedAuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Name validation for signup
    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (mode === 'signin') {
        console.log('🔐 Attempting sign in...', { email: formData.email });

        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          console.error('❌ Sign in error:', result.error);
          setErrors({ general: 'Invalid email or password. Please try again.' });
        } else if (result?.ok) {
          console.log('✅ Sign in successful, redirecting...');
          router.push(callbackUrl);
          router.refresh();
        }
      } else {
        console.log('📝 Creating new account...', { email: formData.email, name: formData.name });

        // Create user account
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('❌ Signup error:', data);
          setErrors(data.errors || { general: data.message || 'Failed to create account' });
        } else {
          console.log('✅ Account created, signing in...');

          // Auto sign in after successful signup
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
            callbackUrl,
          });

          if (result?.ok) {
            console.log('✅ Auto sign in successful, redirecting...');
            router.push(callbackUrl);
            router.refresh();
          }
        }
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('🔍 Attempting Google sign in...');
    setIsGoogleLoading(true);

    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('❌ Google sign in error:', error);
      setErrors({ general: 'Failed to sign in with Google. Please try again.' });
      setIsGoogleLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

    const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
        {mode === 'signup' && (
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <label
              htmlFor="name"
              className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]"
              />
              <input
                id="name"
                name="name"
                type="text"
                required={mode === 'signup'}
                value={formData.name}
                onChange={handleChange}
                className={`
                  w-full pl-10 pr-4 py-3
                  bg-[var(--color-surface)]
                  border border-[var(--color-border)]
                  rounded-xl
                  text-[var(--color-text-primary)]
                  placeholder:text-[var(--color-text-tertiary)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--color-accent)]
                  focus:border-[var(--color-accent)]
                  transition-all duration-200
                  ${errors.name ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
                `}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-[var(--font-size-xs)] text-[var(--color-error)]"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Field */}
      <motion.div variants={fieldVariants}>
        <label
          htmlFor="email"
          className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]"
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`
              w-full pl-10 pr-4 py-3
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-xl
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--color-accent)]
              focus:border-[var(--color-accent)]
              transition-all duration-200
              ${errors.email ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
            `}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 text-[var(--font-size-xs)] text-[var(--color-error)]"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div variants={fieldVariants}>
        <label
          htmlFor="password"
          className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className={`
              w-full pl-10 pr-12 py-3
              bg-[var(--color-surface)]
              border border-[var(--color-border)]
              rounded-xl
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--color-accent)]
              focus:border-[var(--color-accent)]
              transition-all duration-200
              ${errors.password ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
            `}
            placeholder="••••••••"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 text-[var(--font-size-xs)] text-[var(--color-error)]"
          >
            {errors.password}
          </motion.p>
        )}
        {mode === 'signup' && (
          <p className="mt-2 text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
            Must be at least 8 characters long
          </p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fieldVariants}>
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          variant="primary"
          size="lg"
          className="w-full"
          leftIcon={isLoading ? <Loader2 className="animate-spin" size={18} /> : undefined}
        >
          {isLoading
            ? (mode === 'signin' ? 'Signing in...' : 'Creating account...')
            : (mode === 'signin' ? 'Sign In' : 'Create Account')
          }
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={fieldVariants} className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex justify-center text-[var(--font-size-sm)]">
          <span className="px-4 bg-[var(--color-background)] text-[var(--color-text-tertiary)]">
            Or continue with
          </span>
        </div>
      </motion.div>

      {/* Google Sign In Button */}
      <motion.div variants={fieldVariants}>
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          isLoading={isGoogleLoading}
          variant="secondary"
          size="lg"
          className="w-full"
          leftIcon={
            isGoogleLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )
          }
        >
          Continue with Google
        </Button>
      </motion.div>
    </motion.form>
  );
}