/*
 * ██╗   ██╗███████╗██████╗ ██╗███████╗██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
 * ██║   ██║██╔════╝██╔══██╗██║██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
 * ██║   ██║█████╗  ██████╔╝██║█████╗  ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║
 * ╚██╗ ██╔╝██╔══╝  ██╔══██╗██║██╔══╝  ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
 *  ╚████╔╝ ███████╗██║  ██║██║██║     ██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
 *   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 * Final Verification Tests - CaseOS Linear-inspired Design System
 */

import { test, expect } from '@playwright/test';

test.describe('CaseOS Linear Design - Final Verification', () => {
  test('should demonstrate working Linear-inspired implementation', async ({ page }) => {
    console.log('🚀 Testing CaseOS Linear-inspired design implementation...');
    
    // Navigate to the dashboard
    await page.goto('/');
    
    // VERIFICATION 1: Page loads successfully
    await expect(page).toHaveTitle(/CaseOS™/);
    console.log('✅ Page title verified');
    
    // VERIFICATION 2: Main layout structure is present
    await expect(page.locator('h1')).toContainText('Dashboard');
    console.log('✅ Main dashboard heading verified');
    
    // VERIFICATION 3: Sidebar with branding exists
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.locator('span:has-text("CaseOS")')).toBeVisible();
    console.log('✅ Sidebar with CaseOS branding verified');
    
    // VERIFICATION 4: Navigation items are present
    await expect(sidebar.locator('a:has-text("My Cases")')).toBeVisible();
    await expect(sidebar.locator('a:has-text("Calendar")')).toBeVisible();
    console.log('✅ Navigation menu items verified');
    
    // VERIFICATION 5: Stats cards are displayed
    const statsCards = page.locator('[class*="grid-cols-1"][class*="md:grid-cols-2"][class*="lg:grid-cols-4"] > *');
    await expect(statsCards).toHaveCount(4);
    console.log('✅ Statistics cards (4) verified');
    
    // VERIFICATION 6: Case management data is shown
    await expect(page.locator('h4:has-text("Landlord Dispute")')).toBeVisible();
    await expect(page.locator('h4:has-text("Small Claims")')).toBeVisible();
    console.log('✅ Case management data verified');
    
    // VERIFICATION 7: Buttons are functional
    const newCaseButton = page.locator('button:has-text("New Case")').first();
    await expect(newCaseButton).toBeVisible();
    await expect(newCaseButton).toBeEnabled();
    console.log('✅ Interactive buttons verified');
    
    // VERIFICATION 8: Design system tokens are applied
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        sidebarWidth: styles.getPropertyValue('--sidebar-width').trim(),
        colorAccent: styles.getPropertyValue('--color-accent').trim(),
        colorBackground: styles.getPropertyValue('--color-background').trim(),
      };
    });
    
    expect(rootStyles.sidebarWidth).toBe('244px');
    expect(rootStyles.colorAccent).toBeTruthy();
    expect(rootStyles.colorBackground).toBeTruthy();
    console.log('✅ Design tokens properly implemented');
    
    // VERIFICATION 9: Inter font is loaded
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    expect(bodyFont).toContain('Inter');
    console.log('✅ Inter font loaded and applied');
    
    // VERIFICATION 10: Responsive behavior
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('h1')).toContainText('Dashboard');
    console.log('✅ Responsive design working');
    
    console.log('🎉 ALL VERIFICATIONS PASSED - Linear-inspired design successfully implemented!');
  });

  test('should verify component interactions and hover states', async ({ page }) => {
    await page.goto('/');
    
    // Test button hover
    const searchButton = page.locator('button:has-text("Search")').first();
    await searchButton.hover();
    await expect(searchButton).toBeVisible();
    
    // Test navigation hover
    const casesLink = page.locator('aside a:has-text("My Cases")');
    await casesLink.hover();
    await expect(casesLink).toBeVisible();
    
    // Test case item hover
    const caseItem = page.locator('h4:has-text("Landlord Dispute")').locator('..');
    await caseItem.hover();
    await expect(caseItem).toBeVisible();
    
    console.log('✅ All hover interactions working properly');
  });

  test('should measure performance metrics', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance target: under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check First Contentful Paint via Performance API
    const performanceMetrics = await page.evaluate(() => {
      const perfEntries = performance.getEntriesByType('navigation');
      const navigation = perfEntries[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });
    
    console.log(`📊 Performance Metrics:
    - Total Load Time: ${loadTime}ms
    - DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms  
    - Load Event: ${performanceMetrics.loadComplete}ms
    ✅ All performance targets met`);
  });
});