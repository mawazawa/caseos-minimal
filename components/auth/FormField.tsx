/**
 * Reusable Form Field Component
 *
 * Eliminates code duplication in auth forms following DRY principle.
 * Single, focused component for form input rendering.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import type { FormFieldProps } from './types';

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

/**
 * Reusable form field with consistent styling and behavior
 */
export function FormField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  error,
  required = false,
  onChange,
  icon,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword = false
}: FormFieldProps) {
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <motion.div
      variants={fieldVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <label
        htmlFor={id}
        className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2"
      >
        {label}
        {required && <span className="text-[var(--color-error)] ml-1">*</span>}
      </label>

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={id}
          name={name}
          type={inputType}
          required={required}
          value={value}
          onChange={onChange}
          className={`
            w-full ${icon ? 'pl-10' : 'pl-4'} ${showPasswordToggle ? 'pr-12' : 'pr-4'} py-3
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
            ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''}
          `}
          placeholder={placeholder}
          autoComplete={getAutoComplete(type, name)}
        />

        {/* Password Toggle */}
        {showPasswordToggle && onPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-[var(--font-size-xs)] text-[var(--color-error)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Get appropriate autocomplete attribute for input
 */
function getAutoComplete(type: string, name: string): string {
  if (type === 'email') return 'email';
  if (type === 'password') return name === 'password' ? 'current-password' : 'new-password';
  if (name === 'name') return 'name';
  return 'off';
}