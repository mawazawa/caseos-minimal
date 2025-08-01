/*
 * ███╗   ██╗███████╗██╗  ██╗████████╗ █████╗ ██╗   ██╗████████╗██╗  ██╗
 * ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║
 * ██╔██╗ ██║█████╗   ╚███╔╝    ██║   ███████║██║   ██║   ██║   ███████║
 * ██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██╔══██║██║   ██║   ██║   ██╔══██║
 * ██║ ╚████║███████╗██╔╝ ██╗   ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║
 * ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
 * NextAuth.js v5 Configuration - CaseOS Legal AI Platform
 * 
 * Educational Note: This is where we handle user authentication for our legal platform.
 * Think of it like a super-secure bouncer at a fancy club - it checks who you are
 * and decides if you can come in. We support multiple ways to sign in:
 * - Google (like using your school Google account)
 * - Email/Password (classic username and password)
 * - LinkedIn (for professional legal networking)
 */

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextRequest } from "next/server"

console.log("🔐 NextAuth Configuration Loading...")
console.log("📧 Google OAuth enabled:", !!process.env.GOOGLE_CLIENT_ID)
console.log("🔒 Database adapter configured:", !!prisma)

// This is our authentication configuration - like the rules for our security system
const authConfig = {
  // Database adapter - connects auth to our Prisma database
  adapter: PrismaAdapter(prisma),
  
  // Session strategy - we use database sessions for better security and audit trails
  session: {
    strategy: "database" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days (for user convenience in legal work)
    updateAge: 24 * 60 * 60, // 24 hours (refresh session daily)
  },
  
  // Authentication providers - different ways users can sign in
  providers: [
    // Google OAuth - most users prefer this for convenience
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // Email/Password credentials - for users who prefer traditional login
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password")
          return null
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          })

          if (!user || !user.password) {
            console.log("❌ User not found or no password set")
            return null
          }

          // Verify password using bcrypt (secure password checking)
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.log("❌ Invalid password")
            return null
          }

          console.log("✅ User authenticated successfully:", user.email)
          
          // Return user object (without password for security)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("🚨 Authentication error:", error)
          return null
        }
      }
    })
  ],

  // Callback functions - custom logic for different auth events
  callbacks: {
    async session({ session, user }) {
      // Add user ID to session for easy access in components
      if (session.user) {
        session.user.id = user.id
      }
      console.log("🎪 Session created for:", session.user?.email)
      return session
    },
    
    async signIn({ user, account, profile }) {
      console.log("🚪 Sign in attempt:", { 
        email: user.email, 
        provider: account?.provider 
      })
      
      // Allow all sign-ins (you could add restrictions here if needed)
      return true
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    }
  },

  // Custom pages - we can create custom login/signup pages later
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (to be created)
    // signUp: "/auth/signup", // Custom sign-up page (to be created)
    error: "/auth/error", // Custom error page (to be created)
  },

  // Events - for logging and analytics
  events: {
    async signIn(message) {
      console.log("📊 User signed in:", message.user.email)
      // TODO: Add analytics tracking here
    },
    async signOut(message) {
      console.log("📊 User signed out:", message.token?.email || message.session?.user?.email)
      // TODO: Add analytics tracking here
    }
  },

  // Debug mode for development (automatically disabled in production)
  debug: process.env.NODE_ENV === "development",
}

console.log("✅ NextAuth Configuration Complete")

// Export the NextAuth handler for both GET and POST requests
const handler = NextAuth(authConfig)

// Export for Next.js API routes
export { handler as GET, handler as POST }

// Export auth config for use in other parts of the app
export const { auth, signIn, signOut } = NextAuth(authConfig)