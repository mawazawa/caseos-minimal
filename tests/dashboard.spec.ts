/*
 * ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
 * ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
 * Dashboard E2E Tests - CaseOS Linear-inspired Design System
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the dashboard with correct title and meta', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/CaseOS™/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Check description
    await expect(page.locator('text=Welcome back! Here\'s an overview of your legal matters.')).toBeVisible();
  });

  test('should display sidebar with correct branding and navigation', async ({ page }) => {
    // Check CaseOS branding
    await expect(page.locator('text=CaseOS')).toBeVisible();
    
    // Check sidebar navigation items
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=My Cases')).toBeVisible();
    await expect(page.locator('text=Calendar')).toBeVisible();
    await expect(page.locator('text=Contacts')).toBeVisible();
    await expect(page.locator('text=Help Center')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
    
    // Check badge on My Cases
    await expect(page.locator('text=3').first()).toBeVisible();
    
    // Check New Case button
    await expect(page.locator('button:has-text("New Case")')).toBeVisible();
    
    // Check user info
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=Pro Plan')).toBeVisible();
  });

  test('should display header actions correctly', async ({ page }) => {
    // Check header action buttons
    await expect(page.locator('button:has-text("Search")')).toBeVisible();
    await expect(page.locator('button:has-text("Filter")')).toBeVisible();
    await expect(page.locator('button:has-text("New Case")').nth(1)).toBeVisible(); // Second "New Case" button in header
  });

  test('should display stats cards with correct data', async ({ page }) => {
    const statsCards = [
      { label: 'Active Cases', value: '3', trend: '+1 this month' },
      { label: 'Upcoming Events', value: '2', trend: 'Next: Jan 12' },
      { label: 'Response Time', value: '2.3 days', trend: '15% faster' },
      { label: 'Success Rate', value: '89%', trend: '+5% this year' },
    ];

    for (const stat of statsCards) {
      await expect(page.locator(`text=${stat.label}`)).toBeVisible();
      await expect(page.locator(`text=${stat.value}`).first()).toBeVisible();
      await expect(page.locator(`text=${stat.trend}`)).toBeVisible();
    }
  });

  test('should display recent cases with correct information', async ({ page }) => {
    // Check Recent Cases section title
    await expect(page.locator('h3:has-text("Recent Cases")')).toBeVisible();
    
    // Check View All button
    await expect(page.locator('button:has-text("View All")')).toBeVisible();
    
    // Check case entries
    const cases = [
      'Landlord Dispute - Security Deposit',
      'Small Claims - Invoice Payment',
      'Employment Issue - Wage Dispute',
    ];

    for (const caseTitle of cases) {
      await expect(page.locator(`text=${caseTitle}`)).toBeVisible();
    }

    // Check priority badges
    await expect(page.locator('text=high')).toBeVisible();
    await expect(page.locator('text=medium')).toBeVisible();
    await expect(page.locator('text=low')).toBeVisible();
  });

  test('should display upcoming events correctly', async ({ page }) => {
    // Check Upcoming Events section title
    await expect(page.locator('h3:has-text("Upcoming Events")')).toBeVisible();
    
    // Check event entries
    await expect(page.locator('text=Court Hearing - Case #2024-001')).toBeVisible();
    await expect(page.locator('text=Document Deadline - Discovery')).toBeVisible();
    
    // Check dates and times
    await expect(page.locator('text=Jan 15, 2025 at 9:00 AM')).toBeVisible();
    await expect(page.locator('text=Jan 12, 2025 at 5:00 PM')).toBeVisible();
    
    // Check locations
    await expect(page.locator('text=Superior Court Room 4A')).toBeVisible();
    await expect(page.locator('text=File electronically')).toBeVisible();
    
    // Check Add Event button
    await expect(page.locator('button:has-text("Add Event")')).toBeVisible();
  });

  test('should display quick actions correctly', async ({ page }) => {
    // Check Quick Actions section title
    await expect(page.locator('h3:has-text("Quick Actions")')).toBeVisible();
    
    // Check quick action buttons
    const quickActions = ['New Case', 'Schedule', 'Contacts', 'Research'];
    for (const action of quickActions) {
      await expect(page.locator(`button span:has-text("${action}")`)).toBeVisible();
    }
  });

  test('should have proper Inter font loaded', async ({ page }) => {
    // Check if Inter font is applied to body
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    
    expect(bodyFont).toContain('Inter');
  });

  test('should have proper CSS custom properties set', async ({ page }) => {
    // Check if design tokens are properly loaded
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        colorBackground: styles.getPropertyValue('--color-background').trim(),
        colorAccent: styles.getPropertyValue('--color-accent').trim(),
        sidebarWidth: styles.getPropertyValue('--sidebar-width').trim(),
        fontFamily: styles.getPropertyValue('--font-family-sans').trim(),
      };
    });

    expect(rootStyles.colorBackground).toBeTruthy();
    expect(rootStyles.colorAccent).toBeTruthy();  
    expect(rootStyles.sidebarWidth).toBe('244px');
    expect(rootStyles.fontFamily).toContain('Inter');
  });

  test('should have responsive design working', async ({ page }) => {
    // Test mobile breakpoint
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sidebar should still be visible but potentially adapted
    await expect(page.locator('text=CaseOS')).toBeVisible();
    
    // Stats should stack on mobile
    const statsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
    await expect(statsGrid).toBeVisible();
    
    // Reset to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should handle button interactions correctly', async ({ page }) => {
    // Test header Search button click
    const searchButton = page.locator('button:has-text("Search")').first();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toBeEnabled();
    
    // Test New Case button in sidebar
    const newCaseButton = page.locator('button:has-text("New Case")').first();
    await expect(newCaseButton).toBeVisible();
    await expect(newCaseButton).toBeEnabled();
    
    // Test View All button
    const viewAllButton = page.locator('button:has-text("View All")');
    await expect(viewAllButton).toBeVisible();
    await expect(viewAllButton).toBeEnabled();
  });

  test('should have proper hover states on interactive elements', async ({ page }) => {
    // Test case item hover
    const firstCase = page.locator('text=Landlord Dispute - Security Deposit').locator('..');
    await firstCase.hover();
    
    // Test button hover - check if button is hoverable
    const searchButton = page.locator('button:has-text("Search")').first();
    await searchButton.hover();
    
    // Test navigation item hover
    const caseNavItem = page.locator('text=My Cases').locator('..');
    await caseNavItem.hover();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check for proper ARIA labels on buttons
    const searchButton = page.locator('button[aria-label="Search"]');
    await expect(searchButton).toBeVisible();
    
    const notificationButton = page.locator('button[aria-label="Notifications"]');
    await expect(notificationButton).toBeVisible();
    
    // Check heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h3Elements = page.locator('h3');
    await expect(h3Elements.first()).toBeVisible();
  });

  test('should load performance metrics within acceptable limits', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds (3000ms) - reasonable for development
    expect(loadTime).toBeLessThan(3000);
    
    // Check if main content is visible quickly
    await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible({ timeout: 2000 });
  });
});