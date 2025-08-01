/*
 *  ██████╗ █████╗ ██████╗ ██████╗ 
 * ██╔════╝██╔══██╗██╔══██╗██╔══██╗
 * ██║     ███████║██████╔╝██║  ██║
 * ██║     ██╔══██║██╔══██╗██║  ██║
 * ╚██████╗██║  ██║██║  ██║██████╔╝
 *  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
 * Card Component - Linear-inspired Design System
 */

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default', 
    padding = 'md', 
    children, 
    className, 
    hover = false,
    ...props 
  }, ref) => {
    const baseStyles = [
      'rounded-[var(--radius-lg)] transition-all duration-200 ease-in-out',
      'will-change-transform transform-gpu',
    ];

    const variants = {
      default: [
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
      ],
      elevated: [
        'bg-[var(--color-surface-elevated)] shadow-[var(--shadow-sm)]',
        'border border-[var(--color-border-subtle)]',
        hover && 'hover:shadow-[var(--shadow-md)]',
      ],
      outlined: [
        'bg-transparent border border-[var(--color-border)]',
        hover && 'hover:border-[var(--color-text-tertiary)]',
      ],
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const hoverStyles = hover ? [
      'cursor-pointer',
      'hover:scale-[1.01]',
      'active:scale-[0.99]',
      'active:transition-transform active:duration-100',
    ] : [];

    const classes = clsx([
      ...baseStyles,
      ...variants[variant],
      paddings[padding],
      ...hoverStyles,
      className,
    ]);

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents for better composition
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx(
        'text-[var(--font-size-lg)] font-semibold leading-none tracking-tight',
        'text-[var(--color-text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx(
        'text-[var(--font-size-sm)] text-[var(--color-text-secondary)]',
        'leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex-1', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
};