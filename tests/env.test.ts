/*
 * ████████╗███████╗███████╗████████╗    ███████╗███╗   ██╗██╗   ██╗
 * ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝    ██╔════╝████╗  ██║██║   ██║
 *    ██║   █████╗  ███████╗   ██║       █████╗  ██╔██╗ ██║██║   ██║
 *    ██║   ██╔══╝  ╚════██║   ██║       ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝
 *    ██║   ███████╗███████║   ██║       ███████╗██║ ╚████║ ╚████╔╝
 *    ╚═╝   ╚══════╝╚══════╝   ╚═╝       ╚══════╝╚═╝  ╚═══╝  ╚═══╝
 * Environment Variable Tests - CaseOS Legal AI Platform
 *
 * Educational Note: These are tests to make sure our environment variables
 * are set up correctly. It's like having a checklist before going on a trip
 * to make sure you packed everything you need!
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

describe('Environment Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Create a clean environment for each test
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  describe('Required Environment Variables', () => {
    it('should have DATABASE_URL configured', () => {
      expect(process.env.DATABASE_URL).toBeDefined()
      expect(process.env.DATABASE_URL).toContain('postgres://')
    })

    it('should have NEXTAUTH_SECRET configured', () => {
      expect(process.env.NEXTAUTH_SECRET).toBeDefined()
      expect(process.env.NEXTAUTH_SECRET!.length).toBeGreaterThanOrEqual(32)
    })

    it('should have Google OAuth credentials', () => {
      expect(process.env.GOOGLE_CLIENT_ID).toBeDefined()
      expect(process.env.GOOGLE_CLIENT_SECRET).toBeDefined()
    })

    it('should have AI service API keys', () => {
      expect(process.env.ANTHROPIC_API_KEY).toBeDefined()
      expect(process.env.ANTHROPIC_API_KEY).toContain('sk-ant-')
    })

    it('should have Redis configuration', () => {
      expect(process.env.UPSTASH_REDIS_REST_URL).toBeDefined()
      expect(process.env.KV_REST_API_TOKEN).toBeDefined()
    })
  })

  describe('Environment Variable Validation', () => {
    it('should validate DATABASE_URL format', () => {
      const dbUrl = process.env.DATABASE_URL
      expect(dbUrl).toMatch(/^postgres:\/\//)
      // In test environment, we use a local test database
      if (process.env.NODE_ENV === 'test') {
        expect(dbUrl).toContain('localhost')
      } else {
        expect(dbUrl).toContain('neon.tech')
      }
    })

    it('should validate API key formats', () => {
      const anthropicKey = process.env.ANTHROPIC_API_KEY
      expect(anthropicKey).toMatch(/^sk-ant-/)

      const groqKey = process.env.GROQ_API_KEY
      expect(groqKey).toMatch(/^gsk_/)
    })

    it('should have valid app URL', () => {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      expect(appUrl).toMatch(/^https?:\/\//)
    })
  })

  describe('Feature Flags', () => {
    it('should have AI chat enabled by default', () => {
      const aiChatEnabled = process.env.NEXT_PUBLIC_ENABLE_AI_CHAT || 'true'
      expect(aiChatEnabled).toBe('true')
    })

    it('should have document upload enabled', () => {
      const docUploadEnabled = process.env.NEXT_PUBLIC_ENABLE_DOCUMENT_UPLOAD || 'true'
      expect(docUploadEnabled).toBe('true')
    })

    it('should allow test pages in development', () => {
      if (process.env.NODE_ENV === 'development') {
        expect(process.env.ALLOW_TEST_PAGES).toBe('true')
      }
    })
  })

  describe('Security Configuration', () => {
    it('should have secure NextAuth secret', () => {
      const secret = process.env.NEXTAUTH_SECRET
      expect(secret).toBeDefined()
      expect(secret!.length).toBeGreaterThanOrEqual(32)
      // Should not be a simple string
      expect(secret).not.toBe('secret')
      expect(secret).not.toBe('password')
    })

    it('should have webhook secrets for security', () => {
      expect(process.env.STRIPE_WEBHOOK_SECRET).toBeDefined()
      expect(process.env.STRIPE_WEBHOOK_SECRET).toContain('whsec_')
    })

    it('should have proper Stripe key formats', () => {
      expect(process.env.STRIPE_SECRET_KEY).toContain('sk_live_')
      expect(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).toContain('pk_live_')
    })
  })

  describe('Development vs Production Settings', () => {
    it('should disable telemetry in development', () => {
      expect(process.env.NEXT_TELEMETRY_DISABLED).toBe('1')
    })

    it('should use appropriate environment URLs', () => {
      const nodeEnv = process.env.NODE_ENV
      const appUrl = process.env.NEXT_PUBLIC_APP_URL

      if (nodeEnv === 'development') {
        expect(appUrl).toContain('localhost')
      } else if (nodeEnv === 'production') {
        expect(appUrl).not.toContain('localhost')
        expect(appUrl).toContain('https://')
      }
    })
  })
})

describe('Environment Loading', () => {
  it('should load environment variables correctly', () => {
    // Test that we can access basic Node.js environment
    expect(process.env.NODE_ENV).toBeDefined()
    expect(['development', 'test', 'production']).toContain(process.env.NODE_ENV)
  })

  it('should handle missing optional variables gracefully', () => {
    // These should not crash the app if missing
    const optionalVars = [
      'NEXT_PUBLIC_SENTRY_DSN',
      'OPENAI_ORGANIZATION_ID',
      'NEXT_PUBLIC_POSTHOG_KEY'
    ]

    optionalVars.forEach(varName => {
      // Should not throw an error even if undefined
      expect(() => process.env[varName]).not.toThrow()
    })
  })
})

/*
 * Educational Notes for Testing:
 *
 * 1. We use describe() to group related tests together
 * 2. Each it() is a single test case
 * 3. expect() checks if something is true or false
 * 4. beforeEach() runs before every test to set things up
 * 5. afterEach() runs after every test to clean up
 *
 * These tests help us catch problems early, like:
 * - Missing environment variables
 * - Wrong formats for API keys
 * - Security issues with weak secrets
 * - Configuration mismatches between environments
 */