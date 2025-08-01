/*
 * ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║
 * ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║
 * ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║
 * ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Button Component - Linear-inspired Design System
 */

import { clsx } from 'clsx';
import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

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
    ...props 
  }, ref) => {
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
      className,
    ]);

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        <span className={clsx('flex items-center gap-2', isLoading && 'opacity-0')}>
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