/*
 * ███████╗███╗   ██╗██╗   ██╗    ███████╗███████╗████████╗██╗   ██╗██████╗
 * ██╔════╝████╗  ██║██║   ██║    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
 * █████╗  ██╔██╗ ██║██║   ██║    ███████╗█████╗     ██║   ██║   ██║██████╔╝
 * ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝    ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝
 * ███████╗██║ ╚████║ ╚████╔╝     ███████║███████╗   ██║   ╚██████╔╝██║
 * ╚══════╝╚═╝  ╚═══╝  ╚═══╝      ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝
 * Environment Setup for Testing - CaseOS Legal AI Platform
 *
 * Educational Note: This file sets up environment variables specifically for
 * our tests. It's like putting on a special uniform before playing a sport -
 * we need the right setup for the right activity!
 */

// Load environment variables using @next/env
const { loadEnvConfig } = require('@next/env')

// Load environment variables from .env files
const projectDir = process.cwd()
loadEnvConfig(projectDir)

// Set test-specific environment variables
process.env.NODE_ENV = 'test'
process.env.SKIP_ENV_VALIDATION = 'true'

// Test database (use a different database for testing)
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://test:test@localhost:5432/test_db'

// Test authentication settings
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'test-secret-for-jwt-signing-must-be-32-chars-minimum'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Mock API keys for testing (these won't make real API calls)
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'test-google-client-id'
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'test-google-client-secret'
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'sk-ant-test-key-for-testing-only'
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_test-key-for-testing-only'

// Test Redis/Cache settings
process.env.UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || 'redis://localhost:6379'
process.env.UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || 'test-redis-token'

// Test email settings
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || 'test-resend-api-key'

// Test file storage
process.env.BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'test-blob-token'

// Test Stripe settings (use test keys)
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_test-stripe-secret-key'
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_test-stripe-publishable-key'
process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test-webhook-secret'

// Public environment variables
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_ENABLE_AI_CHAT = 'true'
process.env.NEXT_PUBLIC_ENABLE_DOCUMENT_UPLOAD = 'true'
process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false'

// Development flags
process.env.ALLOW_TEST_PAGES = 'true'
process.env.NEXT_TELEMETRY_DISABLED = '1'

console.log('🧪 Test environment variables loaded')
console.log('📍 NODE_ENV:', process.env.NODE_ENV)
console.log('🔗 App URL:', process.env.NEXT_PUBLIC_APP_URL)

/*
 * Educational Notes:
 *
 * 1. We use different values for testing to avoid affecting real data
 * 2. Test API keys are fake - they won't make real API calls
 * 3. We use a separate test database to keep test data isolated
 * 4. SKIP_ENV_VALIDATION helps tests run without all production secrets
 * 5. This ensures our tests are predictable and don't depend on external services
 */