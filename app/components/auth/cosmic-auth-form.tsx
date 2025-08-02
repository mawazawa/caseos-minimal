/**
 * Cosmic Auth Form Component
 *
 * Moon-themed authentication with magic link, accessibility, and Carl Sagan inspiration.
 * Fat finger friendly design for all users, inspired by the vastness of space.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Check
} from 'lucide-react';

interface CosmicAuthFormProps {
  mode: 'signin' | 'signup';
}

interface FormData {
  email: string;
  password: string;
  name: string;
}

/**
 * Cosmic Auth Form - Accessible, inspiring, and beautifully designed
 */
export function CosmicAuthForm({ mode }: CosmicAuthFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const isSignup = mode === 'signup';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Navigation failed. Please check your coordinates.' });
      }
    } catch (error) {
      setErrors({ general: 'Cosmic interference detected. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      setErrors({ general: 'Google constellation unavailable. Please try again.' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your cosmic coordinates (email)' });
      return;
    }

    setIsMagicLinkLoading(true);
    try {
      // Simulate magic link sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMagicLinkSent(true);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Magic link transmission failed. Please try again.' });
    } finally {
      setIsMagicLinkLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (magicLinkSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Magic Link Sent!</h3>
        <p className="text-blue-200/80 mb-6">
          Check your email for a cosmic portal link that will transport you directly to your dashboard.
        </p>
        <button
          onClick={() => setMagicLinkSent(false)}
          className="text-blue-300 hover:text-blue-200 transition-colors"
        >
          ← Back to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* General Error */}
      <AnimatePresence>
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-center"
          >
            <p className="text-red-300 text-sm">{errors.general}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Field (Signup Only) */}
      {isSignup && (
        <motion.div variants={fieldVariants} className="space-y-2">
          <label htmlFor="name" className="block text-blue-200 text-sm font-medium">
            Your Cosmic Identity
          </label>
          <div className="relative">
            <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/60" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-4 bg-slate-700/50 border border-blue-400/20 rounded-xl text-white placeholder-blue-300/40 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-lg"
              placeholder="Neil Armstrong"
              required={isSignup}
            />
          </div>
          {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
        </motion.div>
      )}

      {/* Email Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label htmlFor="email" className="block text-blue-200 text-sm font-medium">
          Cosmic Coordinates (Email)
        </label>
        <div className="relative">
          <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/60" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-14 pl-12 pr-4 bg-slate-700/50 border border-blue-400/20 rounded-xl text-white placeholder-blue-300/40 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-lg"
            placeholder="explorer@cosmos.universe"
            required
          />
        </div>
        {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
      </motion.div>

      {/* Password Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label htmlFor="password" className="block text-blue-200 text-sm font-medium">
          Security Sequence
        </label>
        <div className="relative">
          <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/60" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-14 pl-12 pr-12 bg-slate-700/50 border border-blue-400/20 rounded-xl text-white placeholder-blue-300/40 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-lg"
            placeholder="••••••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300/60 hover:text-blue-300 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
      </motion.div>

      {/* Fat Finger Friendly Buttons */}
      <div className="space-y-4 pt-4">
        {/* Primary Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          variants={fieldVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span>Navigating the cosmos...</span>
            </>
          ) : (
            <>
              <span>{isSignup ? 'Begin Your Journey' : 'Enter the Cosmos'}</span>
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>

        {/* Magic Link Button */}
        <motion.button
          type="button"
          onClick={handleMagicLink}
          disabled={isMagicLinkLoading}
          variants={fieldVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMagicLinkLoading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span>Casting cosmic spell...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Send Magic Portal Link</span>
            </>
          )}
        </motion.button>

        {/* Google Sign In Button */}
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          variants={fieldVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-slate-700/60 hover:bg-slate-600/60 border border-blue-400/20 hover:border-blue-400/40 text-white font-semibold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span>Connecting to Google constellation...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <span>Continue with Google Universe</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Cosmic Trust Indicators */}
      {isSignup && (
        <motion.div variants={fieldVariants} className="mt-8 p-4 bg-slate-700/30 rounded-xl border border-blue-400/10">
          <div className="flex items-center justify-center gap-6 text-blue-200/60 text-sm">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-400" />
              <span>Cosmic Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-blue-400" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-blue-400" />
              <span>10k+ Explorers</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
}