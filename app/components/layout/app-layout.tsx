/*
 * ██╗      █████╗ ██╗   ██╗ ██████╗ ██╗   ██╗████████╗
 * ██║     ██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝
 * ██║     ███████║ ╚████╔╝ ██║   ██║██║   ██║   ██║
 * ██║     ██╔══██║  ╚██╔╝  ██║   ██║██║   ██║   ██║
 * ███████╗██║  ██║   ██║   ╚██████╔╝╚██████╔╝   ██║
 * ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝    ╚═╝
 * Application Layout - Linear-inspired Design System
 */

'use client';

import { clsx } from 'clsx';
import { Sidebar } from '../navigation/sidebar';
import { PageWrapper } from './page-wrapper';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={clsx(
          'flex-1 flex flex-col',
          'ml-[var(--sidebar-width)]', // Offset for fixed sidebar
          className
        )}
      >
        {/* Main Content Area with Page Transitions */}
        <main className="flex-1 overflow-auto">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className
}: PageHeaderProps) {
  return (
    <div
      className={clsx(
        'bg-[var(--color-background)] border-b border-[var(--color-border)]',
        'px-6 py-4',
        className
      )}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2">
          <ol className="flex items-center space-x-2 text-[var(--font-size-sm)]">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-[var(--color-text-tertiary)]">/</span>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-[var(--font-size-2xl)] font-semibold text-[var(--color-text-primary)] leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-[var(--font-size-base)] text-[var(--color-text-secondary)] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="ml-4 flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function PageContent({
  children,
  className,
  maxWidth = 'full',
  padding = 'md'
}: PageContentProps) {
  const maxWidths = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'w-full mx-auto',
        maxWidths[maxWidth],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}