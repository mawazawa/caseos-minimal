/*
 * ███████╗██╗ ██████╗ ███╗   ██╗    ██╗   ██╗██████╗
 * ██╔════╝██║██╔════╝ ████╗  ██║    ██║   ██║██╔══██╗
 * ███████╗██║██║  ███╗██╔██╗ ██║    ██║   ██║██████╔╝
 * ╚════██║██║██║   ██║██║╚██╗██║    ██║   ██║██╔═══╝
 * ███████║██║╚██████╔╝██║ ╚████║    ╚██████╔╝██║
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═╝
 * Cosmic Sign Up - Begin Your Legal Journey Among the Stars
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { CosmicAuthForm } from '@/app/components/auth/cosmic-auth-form';
import { ThemeToggle } from '@/app/components/theme';
import { CheckCircle, Shield, Zap, Users, Scale, BookOpen, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join CaseOS™ | Begin Your Legal Journey',
  description: 'Join thousands of self-represented litigants navigating the legal cosmos with AI-powered assistance.',
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
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
        {/* Cosmic Overlay - Slightly warmer for signup */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-indigo-900/85 to-purple-900/90 dark:from-slate-950/98 dark:via-indigo-950/95 dark:to-purple-950/95" />

        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(120)].map((_, i) => (
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

        {/* Cosmic Energy Waves */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle size="lg" variant="cosmic" showLabel />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Carl Sagan Inspiration for Legal Journey */}
        <div className="text-center mb-8 px-6">
          <blockquote className="text-blue-100/90 text-lg font-light italic leading-relaxed mb-4">
            "Every saint and sinner in the history of our species lived there—on a mote of dust suspended in a sunbeam. We are all made of star-stuff."
          </blockquote>
          <cite className="text-blue-200/70 text-sm font-medium">
            — Carl Sagan, to every soul seeking justice and truth
          </cite>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-800/40 dark:bg-slate-900/60 backdrop-blur-xl border border-purple-400/20 rounded-3xl shadow-2xl shadow-purple-900/20 p-8 relative overflow-hidden">
          {/* Card Cosmic Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-blue-400/5 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />

          {/* Logo and Title */}
          <div className="text-center mb-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
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
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                CaseOS™
              </span>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-3">
              Begin Your Journey
            </h1>
            <p className="text-purple-200/80 text-lg">
              Join thousands navigating the legal cosmos
            </p>
          </div>

          {/* Legal Empowerment Benefits */}
          <div className="mb-8 p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-2xl backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <Scale size={20} className="text-purple-400" />
              Your Legal Rights Await
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-3 text-purple-200/90">
                <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                <span>AI-powered legal document generation</span>
              </div>
              <div className="flex items-center gap-3 text-purple-200/90">
                <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                <span>Case strategy and deadline management</span>
              </div>
              <div className="flex items-center gap-3 text-purple-200/90">
                <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                <span>Expert legal research assistance</span>
              </div>
              <div className="flex items-center gap-3 text-purple-200/90">
                <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                <span>24/7 support from legal professionals</span>
              </div>
              <div className="flex items-center gap-3 text-purple-200/90">
                <CheckCircle size={16} className="text-purple-400 flex-shrink-0" />
                <span>Community of fellow self-represented litigants</span>
              </div>
            </div>
          </div>

          {/* Cosmic Auth Form */}
          <CosmicAuthForm mode="signup" />

          {/* Already have account */}
          <div className="mt-8 text-center space-y-4 relative z-10">
            <p className="text-purple-200/70 text-sm">
              Already exploring the legal cosmos?{' '}
              <Link
                href="/auth/signin"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-200 underline underline-offset-2"
              >
                Continue your journey
              </Link>
            </p>
          </div>

          {/* Trust & Community Indicators */}
          <div className="mt-8 pt-6 border-t border-purple-400/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2 text-purple-200/70">
                <Shield size={20} className="text-purple-400" />
                <span className="text-xs font-medium">Secure & Private</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-purple-200/70">
                <BookOpen size={20} className="text-purple-400" />
                <span className="text-xs font-medium">Legal Expertise</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-purple-200/70">
                <Heart size={20} className="text-purple-400" />
                <span className="text-xs font-medium">10k+ Supported</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer with Cosmic Theme */}
        <p className="mt-8 text-center text-purple-200/50 text-xs px-4 leading-relaxed">
          By creating your account, you join our constellation and agree to our{' '}
          <Link
            href="/terms"
            className="underline hover:text-purple-200/70 transition-colors"
          >
            Galactic Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline hover:text-purple-200/70 transition-colors"
          >
            Privacy Protocols
          </Link>
        </p>

        {/* Inspiring Legal Quote */}
        <div className="mt-8 text-center">
          <p className="text-purple-200/60 text-sm italic">
            "Justice is truth in action. Your journey to justice begins with a single step into the cosmos of law."
          </p>
        </div>
      </div>

      {/* Command Palette Hint */}
      <div className="fixed bottom-6 right-6 text-purple-200/60 text-xs flex items-center gap-2">
        <kbd className="px-3 py-2 bg-slate-800/60 border border-purple-400/20 rounded-lg text-purple-200/80 font-mono backdrop-blur-sm">
          ⌘K
        </kbd>
        <span>to navigate the cosmos</span>
      </div>

      {/* CSS Animation for cosmic effects */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}