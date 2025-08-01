/*
 * ██████╗  █████╗  ██████╗ ███████╗    ██╗    ██╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗
 * ██╔══██╗██╔══██╗██╔════╝ ██╔════╝    ██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
 * ██████╔╝███████║██║  ███╗█████╗      ██║ █╗ ██║██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
 * ██╔═══╝ ██╔══██║██║   ██║██╔══╝      ██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
 * ██║     ██║  ██║╚██████╔╝███████╗    ╚███╔███╔╝██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║
 * ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝     ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
 * Page Wrapper Component - Provides page transitions for all routes
 *
 * Wraps page content with smooth transitions based on route changes
 * Uses PageTransition component for Linear-inspired animations
 */

'use client';

import { usePathname } from 'next/navigation';
import { PageTransition } from '../motion';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageWrapper Component
 *
 * Wraps page content with smooth transitions when navigating between routes.
 * Automatically detects route changes and triggers appropriate animations.
 *
 * @example
 * ```tsx
 * <PageWrapper>
 *   <YourPageContent />
 * </PageWrapper>
 * ```
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  const pathname = usePathname();

  return (
    <PageTransition pageKey={pathname} className={className}>
      {children}
    </PageTransition>
  );
}