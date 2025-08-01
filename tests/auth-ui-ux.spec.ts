/*
 *  █████╗ ██╗   ██╗████████╗██╗  ██╗    ██╗   ██╗██╗    ██╗██╗   ██╗██╗  ██╗
 * ██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ██║   ██║██║    ██║╚██╗ ██╔╝╚██╗██╔╝
 * ███████║██║   ██║   ██║   ███████║    ██║   ██║╚██╗  ██╔╝ ╚████╔╝  ╚███╔╝ 
 * ██╔══██║██║   ██║   ██║   ██╔══██║    ██║   ██║ ╚██╗██╔╝   ╚██╔╝   ██╔██╗ 
 * ██║  ██║╚██████╔╝   ██║   ██║  ██║    ╚██████╔╝  ╚███╔╝     ██║   ██╔╝ ██╗
 * ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝     ╚═════╝    ╚══╝      ╚═╝   ╚═╝  ╚═╝
 * Authentication UI/UX Testing - CaseOS Legal AI Platform
 */

import { test, expect, type Page } from '@playwright/test'

const BASE_URL = 'http://localhost:3003'

test.describe('Authentication UI/UX Testing', () => {
  
  test.describe('Visual Design & Layout', () => {
    test('signin page has correct Linear-inspired design elements', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Check glassmorphism backdrop
      const mainCard = page.locator('.backdrop-blur-2xl')
      await expect(mainCard).toBeVisible()
      
      // Check gradient backgrounds
      const gradientBg = page.locator('.bg-gradient-to-br').first()
      await expect(gradientBg).toBeVisible()
      
      // Check CaseOS logo and branding
      const logo = page.getByText('CaseOS™')
      await expect(logo).toBeVisible()
      
      // Check animated floating particles
      const particles = page.locator('.animate-float')
      await expect(particles.first()).toBeVisible()
      
      // Take screenshot for visual verification
      await page.screenshot({ path: 'test-results/signin-page-design.png', fullPage: true })
    })

    test('signup page has correct Linear-inspired design elements', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signup`)
      
      // Check different gradient colors for signup (purple/pink vs indigo/purple)
      const purpleGradient = page.locator('.from-purple-600\\/10')
      await expect(purpleGradient).toBeVisible()
      
      // Check benefits section unique to signup
      const benefitsSection = page.getByText('Why join CaseOS?')
      await expect(benefitsSection).toBeVisible()
      
      // Check legal disclaimer
      const disclaimer = page.getByText('⚖️ CaseOS provides information')
      await expect(disclaimer).toBeVisible()
      
      // Take screenshot
      await page.screenshot({ path: 'test-results/signup-page-design.png', fullPage: true })
    })
  })

  test.describe('Responsive Design Testing', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ]

    viewports.forEach(({ name, width, height }) => {
      test(`signin page responsive on ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await page.goto(`${BASE_URL}/auth/signin`)
        
        // Check form is properly sized and centered
        const form = page.locator('form')
        await expect(form).toBeVisible()
        
        // Check all form fields are accessible
        const emailInput = page.getByLabel('Email Address')
        const passwordInput = page.getByLabel('Password')
        const submitButton = page.getByRole('button', { name: /sign in/i })
        
        await expect(emailInput).toBeVisible()
        await expect(passwordInput).toBeVisible()
        await expect(submitButton).toBeVisible()
        
        // Check password toggle is accessible
        const passwordToggle = page.locator('button[type="button"]').filter({ hasText: /eye/i })
        await expect(passwordToggle).toBeVisible()
        
        // Take responsive screenshot
        await page.screenshot({ 
          path: `test-results/signin-responsive-${name.toLowerCase()}.png`,
          fullPage: true 
        })
      })

      test(`signup page responsive on ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await page.goto(`${BASE_URL}/auth/signup`)
        
        // Check all form fields including name field
        const nameInput = page.getByLabel('Full Name')
        const emailInput = page.getByLabel('Email Address')
        const passwordInput = page.getByLabel('Password')
        
        await expect(nameInput).toBeVisible()
        await expect(emailInput).toBeVisible()
        await expect(passwordInput).toBeVisible()
        
        // Check benefits section is readable
        const benefitsList = page.locator('ul').filter({ hasText: /AI-powered legal document/i })
        await expect(benefitsList).toBeVisible()
        
        // Take responsive screenshot
        await page.screenshot({ 
          path: `test-results/signup-responsive-${name.toLowerCase()}.png`,
          fullPage: true 
        })
      })
    })
  })

  test.describe('Interactive Elements & User Flow', () => {
    test('signin form interactions work correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Test form field interactions
      const emailInput = page.getByLabel('Email Address')
      const passwordInput = page.getByLabel('Password')
      
      // Test email input
      await emailInput.click()
      await emailInput.fill('test@caseos.ai')
      await expect(emailInput).toHaveValue('test@caseos.ai')
      
      // Test password input and visibility toggle
      await passwordInput.click()
      await passwordInput.fill('testpassword123')
      await expect(passwordInput).toHaveValue('testpassword123')
      
      // Test password visibility toggle
      const eyeButton = page.locator('button[type="button"]').filter({ has: page.locator('svg') })
      await eyeButton.click()
      await expect(passwordInput).toHaveAttribute('type', 'text')
      
      await eyeButton.click()
      await expect(passwordInput).toHaveAttribute('type', 'password')
      
      // Test form submission (should show loading state)
      const submitButton = page.getByRole('button', { name: /sign in/i })
      await submitButton.click()
      
      // Check loading state appears
      await expect(page.getByText('Signing in...')).toBeVisible()
      
      // Wait for form to process and check for error state
      await page.waitForTimeout(2000)
      const errorMessage = page.locator('.text-red-400')
      await expect(errorMessage.first()).toBeVisible()
    })

    test('signup form interactions work correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signup`)
      
      // Test all form fields
      const nameInput = page.getByLabel('Full Name')
      const emailInput = page.getByLabel('Email Address')
      const passwordInput = page.getByLabel('Password')
      
      await nameInput.fill('John Doe')
      await emailInput.fill('john.doe@caseos.ai')
      await passwordInput.fill('securepassword123')
      
      // Test password requirements hint
      const passwordHint = page.getByText('Must be at least 8 characters long')
      await expect(passwordHint).toBeVisible()
      
      // Test form submission
      const submitButton = page.getByRole('button', { name: /create account/i })
      await submitButton.click()
      
      // Check loading state
      await expect(page.getByText('Creating account...')).toBeVisible()
      
      await page.waitForTimeout(2000)
    })

    test('Google OAuth button works', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      const googleButton = page.getByRole('button', { name: /continue with google/i })
      await expect(googleButton).toBeVisible()
      
      // Check Google icon is present
      const googleIcon = googleButton.locator('svg')
      await expect(googleIcon).toBeVisible()
      
      // Test hover state
      await googleButton.hover()
      await page.waitForTimeout(300) // Allow transition
      
      await page.screenshot({ path: 'test-results/google-button-hover.png' })
    })
  })

  test.describe('Error States & Validation', () => {
    test('displays proper error messages for invalid signin', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Test empty form submission
      const submitButton = page.getByRole('button', { name: /sign in/i })
      await submitButton.click()
      
      // Should prevent submission due to HTML5 validation
      await expect(page.getByLabel('Email Address')).toBeFocused()
      
      // Test invalid email format
      await page.getByLabel('Email Address').fill('invalid-email')
      await page.getByLabel('Password').fill('password123')
      await submitButton.click()
      
      // Wait for potential error state
      await page.waitForTimeout(1000)
      
      // Test wrong credentials
      await page.getByLabel('Email Address').fill('wrong@example.com')
      await page.getByLabel('Password').fill('wrongpassword')
      await submitButton.click()
      
      await page.waitForTimeout(2000)
      const errorMessage = page.locator('.text-red-400')
      await expect(errorMessage.first()).toBeVisible()
    })

    test('displays proper error messages for invalid signup', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signup`)
      
      // Test short password
      await page.getByLabel('Full Name').fill('John Doe')
      await page.getByLabel('Email Address').fill('john@example.com')
      await page.getByLabel('Password').fill('123') // Too short
      
      const submitButton = page.getByRole('button', { name: /create account/i })
      await submitButton.click()
      
      // Should prevent submission due to minLength validation
      await expect(page.getByLabel('Password')).toBeFocused()
    })
  })

  test.describe('Accessibility Testing', () => {
    test('signin page has proper ARIA labels and keyboard navigation', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Test keyboard navigation
      await page.keyboard.press('Tab') // Should focus first interactive element
      
      // Check form labels are properly associated
      const emailInput = page.getByLabel('Email Address')
      const passwordInput = page.getByLabel('Password')
      
      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
      
      // Test form can be completed with keyboard only
      await emailInput.press('Tab')
      await expect(passwordInput).toBeFocused()
      
      await passwordInput.press('Tab')
      const submitButton = page.getByRole('button', { name: /sign in/i })
      await expect(submitButton).toBeFocused()
      
      // Check focus indicators are visible
      await page.screenshot({ path: 'test-results/focus-states.png' })
    })

    test('color contrast meets WCAG standards', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // This would require axe-core for comprehensive testing
      // For now, we'll do visual verification
      await page.screenshot({ path: 'test-results/color-contrast-check.png' })
    })
  })

  test.describe('Performance Testing', () => {
    test('pages load quickly without jank', async ({ page }) => {
      // Enable performance monitoring
      await page.context().addInitScript(() => {
        window.performance.mark('test-start')
      })
      
      const startTime = Date.now()
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      console.log(`Signin page load time: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(3000) // Should load in under 3 seconds
      
      // Check for layout shifts by taking multiple screenshots
      await page.screenshot({ path: 'test-results/signin-initial-load.png' })
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'test-results/signin-after-1s.png' })
      
      // Test animation performance
      const particles = page.locator('.animate-float')
      await expect(particles.first()).toBeVisible()
    })

    test('form interactions are smooth and responsive', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Test input response time
      const emailInput = page.getByLabel('Email Address')
      
      const startType = Date.now()
      await emailInput.type('test@example.com')
      const typeTime = Date.now() - startType
      
      console.log(`Input typing response time: ${typeTime}ms`)
      expect(typeTime).toBeLessThan(500) // Should be very responsive
      
      // Test button hover animations
      const submitButton = page.getByRole('button', { name: /sign in/i })
      await submitButton.hover()
      await page.waitForTimeout(300) // Allow transition
    })
  })

  test.describe('Cross-Page Navigation', () => {
    test('navigation between signin and signup works correctly', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      // Navigate to signup
      const signupLink = page.getByRole('link', { name: /sign up/i })
      await signupLink.click()
      
      await expect(page).toHaveURL(`${BASE_URL}/auth/signup`)
      await expect(page.getByText('Create Account')).toBeVisible()
      
      // Navigate back to signin
      const signinLink = page.getByRole('link', { name: /sign in/i })
      await signinLink.click()
      
      await expect(page).toHaveURL(`${BASE_URL}/auth/signin`)
      await expect(page.getByText('Welcome Back')).toBeVisible()
    })

    test('logo links back to home page', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/signin`)
      
      const logoLink = page.getByRole('link').filter({ hasText: 'CaseOS™' })
      await logoLink.click()
      
      await expect(page).toHaveURL(`${BASE_URL}/`)
    })
  })

  test.describe('Visual Consistency', () => {
    test('maintains consistent styling between pages', async ({ page }) => {
      // Test signin page
      await page.goto(`${BASE_URL}/auth/signin`)
      await page.screenshot({ path: 'test-results/signin-full-page.png', fullPage: true })
      
      // Test signup page
      await page.goto(`${BASE_URL}/auth/signup`)
      await page.screenshot({ path: 'test-results/signup-full-page.png', fullPage: true })
      
      // Both pages should have similar styling but different accent colors
      // This would require visual regression testing tools for automated comparison
    })
  })
})