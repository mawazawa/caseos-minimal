/*
 * ░░░░██╗███████╗███████╗████████╗    ███████╗███████╗████████╗██╗   ██╗██████╗
 * ░░░██╔╝██╔════╝██╔════╝╚══██╔══╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
 * ░░██╔╝ █████╗  ███████╗   ██║       ███████╗█████╗     ██║   ██║   ██║██████╔╝
 * ░██╔╝  ██╔══╝  ╚════██║   ██║       ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝
 * ██╔╝   ███████╗███████║   ██║       ███████║███████╗   ██║   ╚██████╔╝██║
 * ╚═╝    ╚══════╝╚══════╝   ╚═╝       ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝
 * Jest Setup Configuration - CaseOS Legal AI Platform
 *
 * Educational Note: This file runs before all our tests to set up the testing
 * environment. It's like preparing a clean workspace before you start building
 * with Lego blocks - everything needs to be organized and ready!
 */

// Import Jest DOM matchers for better testing
import '@testing-library/jest-dom'

// Mock Next.js router for testing
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Next.js navigation for App Router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock NextAuth.js for testing
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }) => children,
}))

// Mock Prisma client for testing
jest.mock('./lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    case: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    document: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}))

// Global test utilities
global.console = {
  ...console,
  // Suppress console.log in tests unless needed
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: console.warn, // Keep warnings
  error: console.error, // Keep errors
}

// Mock environment variables for testing
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/test'
process.env.NEXTAUTH_SECRET = 'test-secret-that-is-at-least-32-characters-long'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

// Setup test timeout
jest.setTimeout(10000)

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})

console.log('🧪 Jest setup complete - Ready for testing!')

/*
 * Educational Notes:
 *
 * 1. @testing-library/jest-dom adds helpful matchers like toBeInTheDocument()
 * 2. We mock Next.js features because they don't exist in the test environment
 * 3. Mocking means creating fake versions that behave predictably
 * 4. We suppress most console.log messages to keep tests clean
 * 5. Each test gets a fresh start with cleared mocks
 */