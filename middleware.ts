/*
 * ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
 * ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
 * ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗  
 * ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝  
 * ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
 * ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
 * Authentication Middleware - CaseOS Legal AI Platform
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/terms',
  '/privacy',
  '/about',
  '/pricing',
  '/contact',
]

// Define API routes that don't require authentication
const publicApiRoutes = [
  '/api/auth',
  '/api/health',
]

// Define routes that require specific roles
const adminRoutes = [
  '/admin',
  '/api/admin',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip authentication for public routes
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
  const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route))
  
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect to sign in if no token
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check for admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  if (isAdminRoute) {
    // Check if user has admin role
    // For now, we'll check userType from the token
    // You might want to add a role field to your User model
    const userType = token.userType || 'SELF_REPRESENTED'
    
    if (userType !== 'ADMIN') {
      // Redirect to unauthorized page or home
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Add user info to request headers for use in server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', token.sub || '')
  requestHeaders.set('x-user-email', token.email || '')
  requestHeaders.set('x-user-name', token.name || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}