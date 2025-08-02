/*
 * ███████╗██╗ ██████╗ ███╗   ██╗    ██╗███╗   ██╗
 * ██╔════╝██║██╔════╝ ████╗  ██║    ██║████╗  ██║
 * ███████╗██║██║  ███╗██╔██╗ ██║    ██║██╔██╗ ██║
 * ╚════██║██║██║   ██║██║╚██╗██║    ██║██║╚██╗██║
 * ███████║██║╚██████╔╝██║ ╚████║    ██║██║ ╚████║
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝╚═╝  ╚═══╝
 * Cosmic Sign In - Moon-themed Authentication with Carl Sagan's Wisdom
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CosmicAuthForm } from '@/app/components/auth/cosmic-auth-form';
import { ThemeToggle } from '@/app/components/theme';

export const metadata: Metadata = {
  title: 'Sign In | CaseOS™ - Your Legal Journey Awaits',
  description: 'Sign in to CaseOS™ and embark on your journey through the legal cosmos with AI-powered assistance.',
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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Cosmic Background - Moon/Earthrise */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/moon-earthrise.jpg')`,
          }}
        />
        {/* Cosmic Overlay - Moon-themed colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95 dark:from-slate-950/98 dark:via-blue-950/95 dark:to-indigo-950/98" />

        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Moon Dust Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle size="lg" variant="cosmic" showLabel />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Carl Sagan Inspiration Quote */}
        <div className="text-center mb-8 px-6">
          <blockquote className="text-blue-100/90 text-lg font-light italic leading-relaxed mb-4">
            "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
          </blockquote>
          <cite className="text-blue-200/70 text-sm font-medium">
            — Carl Sagan, inspiring every soul who dares to chart their own course
          </cite>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-800/40 dark:bg-slate-900/60 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl shadow-blue-900/20 p-8 relative overflow-hidden">
          {/* Card Cosmic Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-400/5 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl" />

          {/* Logo and Title */}
          <div className="text-center mb-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6" />
                  <path d="m4.2 4.2 4.2 4.2m5.6 0 4.2-4.2m-4.2 13.6 4.2 4.2M4.2 19.8l4.2-4.2" />
                </svg>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                CaseOS™
              </span>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-3">
              Welcome Back, Explorer
            </h1>
            <p className="text-blue-200/80 text-lg">
              Continue your journey through the legal cosmos
            </p>
          </div>

          {/* Error Display */}
          {resolvedSearchParams.error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-xl backdrop-blur-sm">
              <p className="text-red-300 text-sm text-center">
                {resolvedSearchParams.error === 'CredentialsSignin'
                  ? 'Navigation error: Invalid coordinates. Please recalibrate.'
                  : resolvedSearchParams.error === 'OAuthAccountNotLinked'
                  ? 'Signal conflict: This channel is already tuned to a different frequency.'
                  : 'Cosmic interference detected. Please try again.'}
              </p>
            </div>
          )}

          {/* Cosmic Auth Form */}
          <CosmicAuthForm mode="signin" />

          {/* Legal Journey Encouragement */}
          <div className="mt-8 text-center space-y-4 relative z-10">
            <p className="text-blue-200/70 text-sm">
              New to the legal universe?{' '}
              <Link
                href="/auth/signup"
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 underline underline-offset-2"
              >
                Begin your journey
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="text-blue-300/60 hover:text-blue-200/80 text-sm transition-colors duration-200 block"
            >
              Lost your navigation keys?
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer with Cosmic Theme */}
        <p className="mt-8 text-center text-blue-200/50 text-xs px-4 leading-relaxed">
          By signing in, you join our constellation and agree to our{' '}
          <Link
            href="/terms"
            className="underline hover:text-blue-200/70 transition-colors"
          >
            Galactic Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline hover:text-blue-200/70 transition-colors"
          >
            Privacy Protocols
          </Link>
        </p>
      </div>

      {/* Command Palette Hint - Cosmic Style */}
      <div className="fixed bottom-6 right-6 text-blue-200/60 text-xs flex items-center gap-2">
        <kbd className="px-3 py-2 bg-slate-800/60 border border-blue-400/20 rounded-lg text-blue-200/80 font-mono backdrop-blur-sm">
          ⌘K
        </kbd>
        <span>to navigate the cosmos</span>
      </div>

      {/* CSS Animation for floating particles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}