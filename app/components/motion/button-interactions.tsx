/*
 * ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗    ██╗███╗   ██╗████████╗███████╗██████╗  █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
 * ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║    ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 * ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║    ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
 * ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║    ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
 * ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║    ██║██║ ╚████║   ██║   ███████╗██║  ██║██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
 * ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝    ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 * Button Interactions - Linear-inspired haptic-like feedback and micro-animations
 * 
 * Premium button interactions that provide immediate visual feedback
 * Optimized for performance with GPU-accelerated transforms
 * Accessible with reduced motion support
 */

'use client';

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

// Haptic-like button feedback - inspired by Linear's immediate response
const buttonVariants: Variants = {
  idle: { 
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: { 
    scale: 1.02,
    y: -1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { 
    scale: 0.96,
    y: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  },
  disabled: {
    scale: 1,
    y: 0,
    opacity: 0.6,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2
    }
  }
};

// Reduced motion variants for accessibility
const reducedMotionVariants: Variants = {
  idle: { opacity: 1 },
  hover: { opacity: 0.9 },
  tap: { opacity: 0.8 },
  disabled: { opacity: 0.6 }
};

// Ripple effect for touch feedback
const rippleVariants: Variants = {
  initial: { 
    scale: 0, 
    opacity: 0.6 
  },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

interface InteractiveButtonProps extends Omit<HTMLMotionProps<'button'>, 'variants'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /**
   * Enable ripple effect on tap (default: true)
   */
  enableRipple?: boolean;
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * InteractiveButton Component
 * 
 * Provides Linear-inspired button interactions with:
 * - Haptic-like feedback on hover/tap
 * - Ripple effect for visual feedback
 * - Accessibility compliance (reduced motion)
 * - GPU-accelerated animations
 * 
 * @example
 * ```tsx
 * <InteractiveButton 
 *   variant="primary" 
 *   size="md"
 *   onClick={() => console.log('Clicked!')}
 * >
 *   Click Me
 * </InteractiveButton>
 * ```
 */
export function InteractiveButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  enableRipple = true,
  className = '',
  onClick,
  ...props 
}: InteractiveButtonProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle ripple effect
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple effect if enabled and motion is allowed
    if (enableRipple && !prefersReducedMotion) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple = {
        id: Date.now(),
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    // Call original onClick
    onClick?.(event);
  };

  // Choose appropriate variants based on user preference
  const variants = prefersReducedMotion ? reducedMotionVariants : buttonVariants;

  // Base button styles
  const baseStyles = `
    relative overflow-hidden cursor-pointer border-0 outline-none
    font-medium rounded-lg transition-colors focus-visible:ring-2 
    focus-visible:ring-offset-2 focus-visible:ring-blue-500
    ${disabled ? 'cursor-not-allowed' : ''}
    ${className}
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }[size];

  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  }[variant];

  return (
    <motion.button
      variants={variants}
      initial="idle"
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      animate={disabled ? "disabled" : "idle"}
      className={`${baseStyles} ${sizeStyles} ${variantStyles}`}
      onClick={handleClick}
      disabled={disabled}
      style={{
        // Optimize for GPU acceleration
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
      }}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effects */}
      {enableRipple && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
              variants={rippleVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}

// Export variants for external use
export { buttonVariants, reducedMotionVariants, rippleVariants };