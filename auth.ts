/*
 * ███╗   ██╗███████╗██╗  ██╗████████╗ █████╗ ██╗   ██╗████████╗██╗  ██╗
 * ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║
 * ██╔██╗ ██║█████╗   ╚███╔╝    ██║   ███████║██║   ██║   ██║   ███████║
 * ██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██╔══██║██║   ██║   ██║   ██╔══██║
 * ██║ ╚████║███████╗██╔╝ ██╗   ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║
 * ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
 * NextAuth.js v5 Main Configuration - CaseOS Legal AI Platform
 *
 * This is the main authentication configuration file for NextAuth.js v5.
 * It exports all the necessary functions and handlers for authentication.
 */

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"

console.log("🔐 NextAuth v5 Configuration Loading...")
console.log("📧 Google OAuth enabled:", !!process.env.GOOGLE_CLIENT_ID)
console.log("🔒 Database adapter configured:", !!prisma)

const config = {
  // Database adapter - connects auth to our Prisma database
  adapter: PrismaAdapter(prisma),

  // Session strategy - using database sessions for legal audit requirements
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // Authentication providers
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
          // Find user in database with password field
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
              password: true,
              userType: true,
              emailVerified: true,
            }
          })

          if (!user || !user.password) {
            console.log("❌ User not found or no password set")
            return null
          }

          // Verify password using bcrypt
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
            userType: user.userType,
            emailVerified: user.emailVerified,
          }
        } catch (error) {
          console.error("🚨 Authentication error:", error)
          return null
        }
      }
    })
  ],

  // Callback functions for customizing auth behavior
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to JWT token
      if (user) {
        token.id = user.id
        token.userType = (user as any).userType
      }
      return token
    },

    async session({ session, user }) {
      // Add user ID and type to session (database strategy uses user, not token)
      if (session.user && user) {
        session.user.id = user.id
        ;(session.user as any).userType = (user as any).userType
      }
      console.log("🎪 Session created for:", session.user?.email)
      return session
    },

    async signIn({ user, account }) {
      console.log("🚪 Sign in attempt:", {
        email: user.email,
        provider: account?.provider
      })

      // For Google OAuth, automatically create user if they don't exist
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for Google OAuth
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                image: user.image,
                emailVerified: new Date(),
                userType: 'SELF_REPRESENTED',
                privacyConsent: true,
                consentTimestamp: new Date(),
              }
            })
            console.log("✅ New Google user created:", user.email)
          }
        } catch (error) {
          console.error("❌ Error creating Google user:", error)
          return false
        }
      }

      return true
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return `${baseUrl}/dashboard`
    }
  },

  // Custom pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  // Events for logging and analytics
  events: {
    async signIn(message) {
      console.log("📊 User signed in:", message.user.email)
      
      // Create audit log entry
      try {
        await prisma.auditLog.create({
          data: {
            action: 'USER_SIGNIN',
            resource: 'User',
            resourceId: message.user.id!,
            userId: message.user.id!,
            metadata: {
              email: message.user.email,
              provider: message.account?.provider || 'credentials',
            },
            severity: 'INFO',
          },
        })
      } catch (error) {
        console.error("❌ Error creating signin audit log:", error)
      }
    },
    
    async signOut(message) {
      // Handle different message types for signOut event
      let email: string | undefined
      let userId: string | undefined
      
      if ('token' in message && message.token) {
        email = message.token.email as string | undefined
        userId = message.token.sub
      } else if ('session' in message && message.session) {
        // For database sessions, we need to get user info differently
        email = undefined // We'll handle this in the audit log creation
        userId = message.session.userId
      }
      
      console.log("📊 User signed out:", email)
      
      // Create audit log entry for signout
      if (userId) {
        try {
          await prisma.auditLog.create({
            data: {
              action: 'USER_SIGNOUT',
              resource: 'User',
              resourceId: userId,
              userId: userId,
              metadata: {
                email: email,
              },
              severity: 'INFO',
            },
          })
        } catch (error) {
          console.error("❌ Error creating signout audit log:", error)
        }
      }
    }
  },

  // Debug mode for development
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig

console.log("✅ NextAuth v5 Configuration Complete")

// Export the NextAuth instance with all necessary functions
export const { handlers, signIn, signOut, auth } = NextAuth(config)