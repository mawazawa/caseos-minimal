/*
 * Performance Testing - CaseOS Legal AI Platform
 */

import { test, expect } from '@playwright/test'

test.describe('Performance Testing', () => {
  test('measure page load times and user interactions', async ({ page }) => {
    // Test signin page load time
    const signinStart = Date.now()
    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    const signinLoadTime = Date.now() - signinStart
    
    console.log(`Signin page load time: ${signinLoadTime}ms`)
    expect(signinLoadTime).toBeLessThan(3000) // Should load in under 3 seconds
    
    // Test signup page load time
    const signupStart = Date.now()
    await page.goto('/auth/signup')
    await page.waitForLoadState('networkidle')
    const signupLoadTime = Date.now() - signupStart
    
    console.log(`Signup page load time: ${signupLoadTime}ms`)
    expect(signupLoadTime).toBeLessThan(3000)
    
    // Test form input responsiveness
    const inputStart = Date.now()
    await page.locator('input[name="email"]').type('test@example.com')
    const inputTime = Date.now() - inputStart
    
    console.log(`Form input response time: ${inputTime}ms`)
    expect(inputTime).toBeLessThan(1000) // Should be very responsive
    
    // Test navigation speed
    const navStart = Date.now()
    await page.getByRole('link', { name: /sign in/i }).click()
    await page.waitForLoadState('networkidle')
    const navTime = Date.now() - navStart
    
    console.log(`Navigation time: ${navTime}ms`)
    expect(navTime).toBeLessThan(2000)
  })
})