/*
 * ███████╗██╗ ██████╗ ███╗   ██╗    ██╗███╗   ██╗
 * ██╔════╝██║██╔════╝ ████╗  ██║    ██║████╗  ██║
 * ███████╗██║██║  ███╗██╔██╗ ██║    ██║██╔██╗ ██║
 * ╚════██║██║██║   ██║██║╚██╗██║    ██║██║╚██╗██║
 * ███████║██║╚██████╔╝██║ ╚████║    ██║██║ ╚████║
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝╚═╝  ╚═══╝
 * Sign In Page - CaseOS Legal AI Platform
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import AuthForm from '@/components/auth/auth-form'

export const metadata: Metadata = {
  title: 'Sign In | CaseOS™',
  description: 'Sign in to your CaseOS™ account to access AI-powered legal assistance.',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  // Check if user is already authenticated
  const session = await auth()
  
  if (session) {
    // Redirect to dashboard or callback URL if already signed in
    redirect(resolvedSearchParams.callbackUrl || '/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-slate-600/10 animate-gradient" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/20 rounded-full animate-float"
            style={{
              left: `${(i + 1) * 10}%`,
              animationDelay: `${i}s`,
              animationDuration: `${15 + i % 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl shadow-black/50 p-8 relative overflow-hidden">
          {/* Glass morphism gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-slate-600/5 pointer-events-none" />

          {/* Logo and title */}
          <div className="text-center mb-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">CaseOS™</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60">Sign in to access your legal dashboard</p>
          </div>

          {/* Error message */}
          {resolvedSearchParams.error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-400">
                {resolvedSearchParams.error === 'CredentialsSignin'
                  ? 'Invalid email or password. Please try again.'
                  : 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          {/* Auth form */}
          <AuthForm mode="signin" />

          {/* Footer links */}
          <div className="mt-6 text-center space-y-4 relative z-10">
            <p className="text-white/60 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="text-white/40 hover:text-white/60 text-sm transition-colors duration-200 block"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-8 text-center text-white/40 text-xs px-4">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-white/60 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-white/60 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}