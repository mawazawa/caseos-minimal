/*
 * ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
 * ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
 * ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
 * ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Button Component - Linear-inspired Design System with Motion
 * Enhanced with Framer Motion micro-interactions and haptic feedback
 */

'use client';

import { clsx } from 'clsx';
import { forwardRef, ButtonHTMLAttributes, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Enable enhanced motion interactions (default: true)
   */
  enableMotion?: boolean;
  /**
   * Enable ripple effect on click (default: true)
   */
  enableRipple?: boolean;
}

// Enhanced button animation variants for Linear-inspired feel
const buttonVariants: Variants = {
  idle: { 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: { 
    scale: 1.02,
    y: -1,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { 
    scale: 0.96,
    y: 0,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  },
  disabled: {
    scale: 1,
    y: 0,
    opacity: 0.6,
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

// Ripple effect variants
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    className, 
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    enableMotion = true,
    enableRipple = true,
    onClick,
    ...props 
  }, ref) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    // Check for reduced motion preference
    useEffect(() => {
      if (!enableMotion) return;
      
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, [enableMotion]);

    // Handle enhanced click with ripple effect
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;

      // Create ripple effect if enabled and motion is allowed
      if (enableRipple && enableMotion && !prefersReducedMotion) {
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
    const baseStyles = [
      // Base button styles
      'inline-flex items-center justify-center gap-2',
      'font-medium transition-all duration-200 ease-in-out',
      'border border-transparent',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'relative overflow-hidden',
      // Smooth transforms
      'transform-gpu will-change-transform',
      'active:scale-[0.98] active:transition-transform active:duration-100',
    ];

    const variants = {
      primary: [
        'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
        'hover:bg-[var(--color-accent-hover)]',
        'focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-[var(--color-background)]',
        'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        'hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
      ],
      secondary: [
        'bg-[var(--color-surface)] text-[var(--color-text-primary)]',
        'border-[var(--color-border)]',
        'hover:bg-[var(--color-background-secondary)]',
        'hover:border-[var(--color-text-tertiary)]',
        'focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-[var(--color-background)]',
        'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
      ],
      ghost: [
        'text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-background-secondary)]',
        'hover:text-[var(--color-text-primary)]',
        'focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-[var(--color-background)]',
      ],
      destructive: [
        'bg-[var(--color-error)] text-white',
        'hover:bg-[#dc2626]',
        'focus-visible:ring-[var(--color-error)] focus-visible:ring-offset-[var(--color-background)]',
        'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        'hover:shadow-[0_2px_4px_rgba(220,38,38,0.2)]',
      ],
    };

    const sizes = {
      sm: [
        'h-8 px-3 text-[var(--font-size-sm)]',
        'rounded-[var(--radius-md)]',
        'min-w-[64px]',
      ],
      md: [
        'h-9 px-4 text-[var(--font-size-base)]',
        'rounded-[var(--radius-md)]',
        'min-w-[80px]',
      ],
      lg: [
        'h-10 px-6 text-[var(--font-size-md)]',
        'rounded-[var(--radius-lg)]',
        'min-w-[96px]',
      ],
    };

    const classes = clsx([
      ...baseStyles,
      ...variants[variant],
      ...sizes[size],
      // Enhanced motion styles
      enableMotion && 'will-change-transform',
      enableRipple && 'overflow-hidden',
      className,
    ]);

    // Choose appropriate variants based on user preference and enableMotion
    const animationVariants = enableMotion 
      ? (prefersReducedMotion ? reducedMotionVariants : buttonVariants)
      : undefined;

    // Handle motion vs regular button
    if (enableMotion) {
      const MotionButton = motion.button;
      return (
        <MotionButton
          ref={ref}
          className={classes}
          disabled={disabled || isLoading}
          onClick={handleClick}
          style={{
            // GPU optimization for motion
            transform: 'translateZ(0)',
          }}
          variants={animationVariants}
          initial="idle"
          whileHover={disabled || isLoading ? "disabled" : "hover"}
          whileTap={disabled || isLoading ? "disabled" : "tap"}
          animate={disabled || isLoading ? "disabled" : "idle"}
          // Filter out motion-specific props from ...props
          {...Object.fromEntries(
            Object.entries(props).filter(([key]) => 
              !['whileHover', 'whileTap', 'animate', 'initial', 'variants', 'transition', 'onAnimationComplete'].includes(key)
            )
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          )}
          
          {/* Content */}
          <span className={clsx(
            'flex items-center gap-2 relative z-10', 
            isLoading && 'opacity-0'
          )}>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </span>

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
        </MotionButton>
      );
    }

    // Regular button without motion
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        
        {/* Content */}
        <span className={clsx(
          'flex items-center gap-2 relative z-10', 
          isLoading && 'opacity-0'
        )}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };