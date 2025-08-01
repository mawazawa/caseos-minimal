/*
 * ███████╗██╗ ██████╗ ███╗   ██╗    ██╗   ██╗██████╗ 
 * ██╔════╝██║██╔════╝ ████╗  ██║    ██║   ██║██╔══██╗
 * ███████╗██║██║  ███╗██╔██╗ ██║    ██║   ██║██████╔╝
 * ╚════██║██║██║   ██║██║╚██╗██║    ██║   ██║██╔═══╝ 
 * ███████║██║╚██████╔╝██║ ╚████║    ╚██████╔╝██║     
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═╝     
 * Sign Up Page - CaseOS Legal AI Platform
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import AuthForm from '@/components/auth/auth-form'

export const metadata: Metadata = {
  title: 'Sign Up | CaseOS™',
  description: 'Create your CaseOS™ account to access AI-powered legal assistance.',
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 animate-gradient" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-float"
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 pointer-events-none" />

          {/* Logo and title */}
          <div className="text-center mb-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/60">Join thousands of self-represented litigants</p>
          </div>

          {/* Benefits */}
          <div className="mb-6 p-4 bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">Why join CaseOS?</h3>
            <ul className="space-y-1 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AI-powered legal document analysis
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Smart deadline tracking & reminders
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Legal form generation & guidance
              </li>
            </ul>
          </div>

          {/* Auth form */}
          <AuthForm mode="signup" />

          {/* Footer links */}
          <div className="mt-6 text-center space-y-4 relative z-10">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 space-y-4">
          <p className="text-center text-white/40 text-xs px-4">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-white/60 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mx-4">
            <p className="text-xs text-amber-400/80 text-center">
              ⚖️ CaseOS provides information and software. We are not a law firm and do not provide legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}