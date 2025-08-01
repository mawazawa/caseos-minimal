/*
 * Basic Auth Test - CaseOS Legal AI Platform
 */

import { test, expect } from '@playwright/test'

test.describe('Basic Authentication Tests', () => {
  test('can navigate to signin page', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Check page title
    await expect(page).toHaveTitle(/Sign In.*CaseOS/)
    
    // Check main heading
    await expect(page.getByText('Welcome Back')).toBeVisible()
    
    // Check form exists
    await expect(page.locator('form')).toBeVisible()
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/signin-basic.png', fullPage: true })
  })

  test('can navigate to signup page', async ({ page }) => {
    await page.goto('/auth/signup')
    
    // Check page title
    await expect(page).toHaveTitle(/Sign Up.*CaseOS/)
    
    // Check main heading
    await expect(page.getByText('Create Account')).toBeVisible()
    
    // Check form exists
    await expect(page.locator('form')).toBeVisible()
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/signup-basic.png', fullPage: true })
  })

  test('form fields are present and functional', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Check email field
    const emailField = page.getByLabel('Email Address')
    await expect(emailField).toBeVisible()
    await emailField.fill('test@example.com')
    await expect(emailField).toHaveValue('test@example.com')
    
    // Check password field
    const passwordField = page.getByLabel('Password')
    await expect(passwordField).toBeVisible()
    await passwordField.fill('password123')
    await expect(passwordField).toHaveValue('password123')
    
    // Check submit button
    const submitButton = page.getByRole('button', { name: /sign in/i })
    await expect(submitButton).toBeVisible()
    await expect(submitButton).toBeEnabled()
  })
})