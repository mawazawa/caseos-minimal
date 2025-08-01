/*
 * Authentication Flow Testing - CaseOS Legal AI Platform
 */

import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user signup and signin journey', async ({ page }) => {
    // Test signup flow with valid credentials
    await page.goto('/auth/signup')
    
    // Fill signup form
    await page.locator('input[name="name"]').fill('Test User CaseOS')
    await page.locator('input[name="email"]').fill('testuser@caseos.ai')
    await page.locator('input[name="password"]').fill('SecurePassword123!')
    
    // Submit form and check for loading state
    await page.getByRole('button', { name: /create account/i }).click()
    
    // Check loading indicator appears
    await expect(page.getByText('Creating account...')).toBeVisible()
    
    // Wait for form processing
    await page.waitForTimeout(3000)
    
    // Take screenshot of result
    await page.screenshot({ path: 'test-results/signup-attempt-result.png', fullPage: true })
    
    // Test signin flow  
    await page.goto('/auth/signin')
    
    // Fill signin form with same credentials
    await page.locator('input[name="email"]').fill('testuser@caseos.ai')
    await page.locator('input[name="password"]').fill('SecurePassword123!')
    
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Check loading indicator appears
    await expect(page.getByText('Signing in...')).toBeVisible()
    
    // Wait for processing
    await page.waitForTimeout(3000)
    
    // Take screenshot of result
    await page.screenshot({ path: 'test-results/signin-attempt-result.png', fullPage: true })
    
    // Test error handling with invalid credentials
    await page.goto('/auth/signin')
    await page.locator('input[name="email"]').fill('nonexistent@example.com')
    await page.locator('input[name="password"]').fill('wrongpassword')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    await page.waitForTimeout(3000)
    
    // Should show error message
    const errorMessage = page.locator('.text-red-400')
    await expect(errorMessage.first()).toBeVisible()
    
    await page.screenshot({ path: 'test-results/signin-error-visible.png', fullPage: true })
  })
})