/*
 * ███████╗██╗ ██████╗ ███╗   ██╗    ██╗███╗   ██╗
 * ██╔════╝██║██╔════╝ ████╗  ██║    ██║████╗  ██║
 * ███████╗██║██║  ███╗██╔██╗ ██║    ██║██╔██╗ ██║
 * ╚════██║██║██║   ██║██║╚██╗██║    ██║██║╚██╗██║
 * ███████║██║╚██████╔╝██║ ╚████║    ██║██║ ╚████║
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝╚═╝  ╚═══╝
 * Sign In Page - Theme-Aware Professional Authentication
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import EnhancedAuthForm from '@/components/auth/enhanced-auth-form';
import { ThemeToggle } from '@/app/components/theme';

export const metadata: Metadata = {
  title: 'Sign In | CaseOS™',
  description: 'Sign in to your CaseOS™ account to access AI-powered legal assistance.',
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  // Check if user is already authenticated
  const session = await auth();

  if (session) {
    // Redirect to dashboard or callback URL if already signed in
    redirect(resolvedSearchParams.callbackUrl || '/');
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle size="md" variant="default" showLabel />
      </div>

      {/* Background Effects - Theme Aware */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent)]/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-3xl shadow-[var(--shadow-xl)] p-8 relative overflow-hidden backdrop-blur-sm">
          {/* Card Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/2 via-transparent to-[var(--color-accent)]/2 pointer-events-none" />

          {/* Logo and Title */}
          <div className="text-center mb-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--color-accent)]/25 transition-all duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-accent-text)]"
                >
                  <path d="M3 6l3 6 3-6" />
                  <path d="M21 6l-3 6-3-6" />
                  <path d="M12 3v18" />
                  <path d="M8 21h8" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">CaseOS™</span>
            </Link>

            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Welcome Back
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Sign in to access your legal dashboard
            </p>
          </div>

          {/* Error Display */}
          {resolvedSearchParams.error && (
            <div className="mb-6 p-4 bg-[var(--color-error-background)] border border-[var(--color-error)]/20 rounded-xl">
              <p className="text-[var(--font-size-sm)] text-[var(--color-error)]">
                {resolvedSearchParams.error === 'CredentialsSignin'
                  ? 'Invalid email or password. Please try again.'
                  : resolvedSearchParams.error === 'OAuthAccountNotLinked'
                  ? 'Email already exists with different sign-in method.'
                  : 'An error occurred during sign in. Please try again.'}
              </p>
            </div>
          )}

          {/* Enhanced Auth Form */}
          <EnhancedAuthForm mode="signin" />

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4 relative z-10">
            <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)]">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] text-[var(--font-size-sm)] transition-colors duration-200 block"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="mt-8 text-center text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] px-4">
          By signing in, you agree to our{' '}
          <Link
            href="/terms"
            className="underline hover:text-[var(--color-text-secondary)] transition-colors"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline hover:text-[var(--color-text-secondary)] transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Command Palette Hint */}
      <div className="fixed bottom-4 right-4 text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] flex items-center gap-2">
        <kbd className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-secondary)]">⌘K</kbd>
        <span>to search</span>
      </div>
    </div>
  );
}