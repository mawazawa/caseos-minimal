/*
 * ░░░░██╗███████╗███████╗████████╗     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
 * ░░░██╔╝██╔════╝██╔════╝╚══██╔══╝    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
 * ░░██╔╝ █████╗  ███████╗   ██║       ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
 * ░██╔╝  ██╔══╝  ╚════██║   ██║       ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
 * ██╔╝   ███████╗███████║   ██║       ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
 * ╚═╝    ╚══════╝╚══════╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝
 * Jest Testing Configuration - CaseOS Legal AI Platform
 *
 * Educational Note: This is our test configuration file. Jest is like having
 * a robot assistant that runs all our tests automatically to make sure
 * everything works correctly. It's like having a quality checker in a factory!
 */

const nextJest = require('next/jest')

// Create Jest configuration using Next.js
const createJestConfig = nextJest({
  // Path to your Next.js app
  dir: './',
})

// Custom Jest configuration
const customJestConfig = {
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test environment (jsdom for browser-like environment)
  testEnvironment: 'jsdom',

  // Module name mapping for absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },

  // Test match patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/app/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/lib/**/*.test.{js,jsx,ts,tsx}',
  ],

  // Files to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/playwright-report/',
    '<rootDir>/test-results/',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/globals.css',
    '!app/layout.tsx', // Exclude layout as it's mostly configuration
  ],

  // Coverage thresholds (aim high for quality!)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Transform configuration for different file types
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Environment variables for testing
  setupFiles: ['<rootDir>/tests/env.setup.js'],

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output for better debugging
  verbose: true,

  // Timeout for tests (10 seconds)
  testTimeout: 10000,
}

// Export Jest configuration
module.exports = createJestConfig(customJestConfig)