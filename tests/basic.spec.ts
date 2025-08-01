/*
 * ██████╗  █████╗ ███████╗██╗ ██████╗
 * ██╔══██╗██╔══██╗██╔════╝██║██╔════╝
 * ██████╔╝███████║███████╗██║██║     
 * ██╔══██╗██╔══██║╚════██║██║██║     
 * ██████╔╝██║  ██║███████║██║╚██████╗
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝
 * Basic E2E Tests - CaseOS Linear-inspired Design System Verification
 */

import { test, expect } from '@playwright/test';

test.describe('CaseOS Linear Design Implementation', () => {
  test('should load and display the Linear-inspired dashboard correctly', async ({ page }) => {
    await page.goto('/');
    
    // Verify page loads without errors
    await expect(page).toHaveTitle(/CaseOS™/);
    
    // Verify main layout structure
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('text=Welcome back! Here\'s an overview of your legal matters.')).toBeVisible();
    
    // Verify sidebar is present with correct branding
    await expect(page.locator('span:has-text("CaseOS")')).toBeVisible();
    
    // Verify key navigation elements in sidebar
    await expect(page.locator('aside').locator('text=My Cases')).toBeVisible();
    await expect(page.locator('aside').locator('text=Calendar')).toBeVisible();
    await expect(page.locator('aside').locator('text=Dashboard')).toBeVisible();
    
    // Verify main content sections
    await expect(page.locator('text=Active Cases')).toBeVisible();
    await expect(page.locator('text=Recent Cases')).toBeVisible();
    await expect(page.locator('text=Upcoming Events')).toBeVisible();
    
    // Verify buttons are present and functional
    await expect(page.locator('button:has-text("New Case")')).toBeVisible();
    await expect(page.locator('button:has-text("Search")')).toBeVisible();
    
    console.log('✅ Dashboard loaded successfully with all Linear-inspired components');
  });

  test('should have proper design system implementation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check if Inter font is loaded
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    expect(bodyFont).toContain('Inter');
    
    // Check if design tokens are applied
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        sidebarWidth: styles.getPropertyValue('--sidebar-width').trim(),
        colorAccent: styles.getPropertyValue('--color-accent').trim(),
      };
    });
    
    expect(rootStyles.sidebarWidth).toBe('244px');
    expect(rootStyles.colorAccent).toBeTruthy();
    
    console.log('✅ Design system tokens properly implemented');
  });

  test('should display case management data correctly', async ({ page }) => {
    await page.goto('/');
    
    // Verify case data is displayed
    await expect(page.locator('text=Landlord Dispute - Security Deposit')).toBeVisible();
    await expect(page.locator('text=Small Claims - Invoice Payment')).toBeVisible();
    await expect(page.locator('text=Employment Issue - Wage Dispute')).toBeVisible();
    
    // Verify priority badges
    await expect(page.locator('span:has-text("high")')).toBeVisible();
    await expect(page.locator('span:has-text("medium")')).toBeVisible();
    await expect(page.locator('span:has-text("low")')).toBeVisible();
    
    // Verify upcoming events
    await expect(page.locator('text=Court Hearing - Case #2024-001')).toBeVisible();
    await expect(page.locator('text=Document Deadline - Discovery')).toBeVisible();
    
    console.log('✅ Case management data properly displayed');
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    
    console.log('✅ Responsive design working across breakpoints');
  });

  test('should load performance within acceptable limits', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds for development
    expect(loadTime).toBeLessThan(5000);
    
    // Main content should be visible quickly
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 3000 });
    
    console.log(`✅ Page loaded in ${loadTime}ms - within performance targets`);
  });
});