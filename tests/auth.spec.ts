/*
 *  █████╗ ██╗   ██╗████████╗██╗  ██╗    ████████╗███████╗███████╗████████╗
 * ██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
 * ███████║██║   ██║   ██║   ███████║       ██║   █████╗  ███████╗   ██║   
 * ██╔══██║██║   ██║   ██║   ██╔══██║       ██║   ██╔══╝  ╚════██║   ██║   
 * ██║  ██║╚██████╔╝   ██║   ██║  ██║       ██║   ███████╗███████║   ██║   
 * ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝       ╚═╝   ╚══════╝╚══════╝   ╚═╝   
 * Authentication E2E Tests - CaseOS Legal AI Platform
 */

import { test, expect } from '@playwright/test'

// Generate unique test email
const generateTestEmail = () => `test-${Date.now()}@caseos.ai`

test.describe('Authentication Flow', () => {
  test.describe('Sign In Page', () => {
    test('should load sign in page with correct elements', async ({ page }) => {
      await page.goto('/auth/signin')

      // Check page title
      await expect(page).toHaveTitle(/Sign In | CaseOS/)

      // Check main heading
      await expect(page.locator('h1')).toContainText('Welcome Back')

      // Check form elements
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toContainText('Sign In')

      // Check OAuth button
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible()

      // Check links
      await expect(page.locator('a[href="/auth/signup"]')).toContainText('Sign up')
      await expect(page.locator('a[href="/auth/forgot-password"]')).toContainText('Forgot your password?')
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/auth/signin')

      // Fill in invalid credentials
      await page.fill('input[type="email"]', 'invalid@caseos.ai')
      await page.fill('input[type="password"]', 'wrongpassword')

      // Submit form
      await page.click('button[type="submit"]')

      // Check for error message
      await expect(page.locator('text=Invalid email or password')).toBeVisible()
    })

    test('should toggle password visibility', async ({ page }) => {
      await page.goto('/auth/signin')

      const passwordInput = page.locator('input[id="password"]')
      const toggleButton = page.locator('button[aria-label="Show password"]')

      // Initially password should be hidden
      await expect(passwordInput).toHaveAttribute('type', 'password')

      // Click toggle button
      await toggleButton.click()

      // Password should now be visible
      await expect(passwordInput).toHaveAttribute('type', 'text')

      // Click again to hide
      await toggleButton.click()
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  test.describe('Sign Up Page', () => {
    test('should load sign up page with correct elements', async ({ page }) => {
      await page.goto('/auth/signup')

      // Check page title
      await expect(page).toHaveTitle(/Sign Up | CaseOS/)

      // Check main heading
      await expect(page.locator('h1')).toContainText('Create Account')

      // Check form elements
      await expect(page.locator('input[name="name"]')).toBeVisible()
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toContainText('Create Account')

      // Check benefits section
      await expect(page.locator('text=Why join CaseOS?')).toBeVisible()

      // Check legal disclaimer
      await expect(page.locator('text=CaseOS provides information and software')).toBeVisible()
    })

    test('should create new account successfully', async ({ page }) => {
      await page.goto('/auth/signup')

      const testEmail = generateTestEmail()
      const testPassword = 'TestPassword123!'
      const testName = 'Test User'

      // Fill in sign up form
      await page.fill('input[name="name"]', testName)
      await page.fill('input[type="email"]', testEmail)
      await page.fill('input[type="password"]', testPassword)

      // Submit form
      await page.click('button[type="submit"]')

      // Should redirect to dashboard after successful signup
      await expect(page).toHaveURL('/', { timeout: 10000 })
    })

    test('should show error for existing email', async ({ page }) => {
      await page.goto('/auth/signup')

      // Use an email that might already exist
      await page.fill('input[name="name"]', 'Test User')
      await page.fill('input[type="email"]', 'test@caseos.ai')
      await page.fill('input[type="password"]', 'TestPassword123!')

      // Submit form
      await page.click('button[type="submit"]')

      // Check for error message
      await expect(page.locator('text=already exists')).toBeVisible({ timeout: 10000 })
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect to sign in when accessing protected route', async ({ page }) => {
      // Try to access a protected route
      await page.goto('/dashboard')

      // Should redirect to sign in with callback URL
      await expect(page).toHaveURL(/\/auth\/signin\?callbackUrl=/)
    })
  })

  test.describe('Navigation Between Auth Pages', () => {
    test('should navigate from sign in to sign up', async ({ page }) => {
      await page.goto('/auth/signin')

      // Click sign up link
      await page.click('a[href="/auth/signup"]')

      // Should be on sign up page
      await expect(page).toHaveURL('/auth/signup')
      await expect(page.locator('h1')).toContainText('Create Account')
    })

    test('should navigate from sign up to sign in', async ({ page }) => {
      await page.goto('/auth/signup')

      // Click sign in link
      await page.click('a[href="/auth/signin"]')

      // Should be on sign in page
      await expect(page).toHaveURL('/auth/signin')
      await expect(page.locator('h1')).toContainText('Welcome Back')
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/auth/signin')

      // All elements should still be visible
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()
    })
  })
})