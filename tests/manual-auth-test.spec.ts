/*
 * Manual Authentication UI/UX Testing - CaseOS Legal AI Platform
 */

import { test, expect } from '@playwright/test'

test.describe('Manual Authentication Testing', () => {
  test('comprehensive UI testing with screenshots', async ({ page }) => {
    // Test signin page design
    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'test-results/signin-full-design.png', fullPage: true })
    
    // Test responsive on different viewports
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile
    await page.screenshot({ path: 'test-results/signin-mobile.png', fullPage: true })
    
    await page.setViewportSize({ width: 768, height: 1024 }) // Tablet  
    await page.screenshot({ path: 'test-results/signin-tablet.png', fullPage: true })
    
    await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop
    await page.screenshot({ path: 'test-results/signin-desktop.png', fullPage: true })
    
    // Test form interactions
    await page.locator('input[name="email"]').fill('test@caseos.ai')
    await page.locator('input[name="password"]').fill('testpassword123')
    
    // Test password visibility toggle
    await page.locator('button[type="button"]').first().click()
    await page.screenshot({ path: 'test-results/signin-password-visible.png' })
    
    await page.locator('button[type="button"]').first().click()
    await page.screenshot({ path: 'test-results/signin-password-hidden.png' })
    
    // Test hover states
    await page.locator('button[type="submit"]').hover()
    await page.screenshot({ path: 'test-results/signin-submit-hover.png' })
    
    // Test Google button hover
    await page.getByRole('button').filter({ hasText: /google/i }).hover()
    await page.screenshot({ path: 'test-results/signin-google-hover.png' })
    
    // Navigate to signup
    await page.getByRole('link', { name: /sign up/i }).click()
    await page.waitForLoadState('networkidle')
    
    // Test signup page design
    await page.screenshot({ path: 'test-results/signup-full-design.png', fullPage: true })
    
    // Test signup responsive
    await page.setViewportSize({ width: 375, height: 667 })
    await page.screenshot({ path: 'test-results/signup-mobile.png', fullPage: true })
    
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // Fill signup form
    await page.locator('input[name="name"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('john.doe@caseos.ai')  
    await page.locator('input[name="password"]').fill('securepassword123')
    
    await page.screenshot({ path: 'test-results/signup-form-filled.png', fullPage: true })
    
    // Test form validation by trying to submit
    await page.getByRole('button', { name: /create account/i }).click()
    await page.waitForTimeout(2000) // Wait for potential loading/error states
    await page.screenshot({ path: 'test-results/signup-after-submit.png', fullPage: true })
  })
  
  test('error states testing', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Test invalid credentials submission
    await page.locator('input[name="email"]').fill('invalid@example.com')
    await page.locator('input[name="password"]').fill('wrongpassword')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    await page.waitForTimeout(3000) // Wait for error
    await page.screenshot({ path: 'test-results/signin-error-state.png', fullPage: true })
  })
  
  test('accessibility and keyboard navigation', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await page.screenshot({ path: 'test-results/signin-tab-1.png' })
    
    await page.keyboard.press('Tab') 
    await page.screenshot({ path: 'test-results/signin-tab-2.png' })
    
    await page.keyboard.press('Tab')
    await page.screenshot({ path: 'test-results/signin-tab-3.png' })
  })
})