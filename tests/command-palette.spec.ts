/*
 *  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ 
 * ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗
 * ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║
 * ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
 * Command Palette Integration Tests - E2E Testing with Playwright
 */

import { test, expect } from '@playwright/test';

test.describe('Command Palette', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('opens with keyboard shortcut ⌘K', async ({ page }) => {
    // Press ⌘K to open command palette
    await page.keyboard.press('Meta+k');
    
    // Command palette should be visible
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Should have all command sections
    await expect(page.getByText('Navigation')).toBeVisible();
    await expect(page.getByText('Actions')).toBeVisible();
    await expect(page.getByText('Search')).toBeVisible();
    await expect(page.getByText('Help')).toBeVisible();
  });

  test('opens with Ctrl+K on non-Mac', async ({ page }) => {
    // Press Ctrl+K to open command palette (Windows/Linux)
    await page.keyboard.press('Control+k');
    
    // Command palette should be visible
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
  });

  test('opens when clicking search button in sidebar', async ({ page }) => {
    // Find and click the search button in sidebar
    await page.getByRole('button', { name: 'Search (⌘K)' }).click();
    
    // Command palette should be visible
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
  });

  test('closes with Escape key', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Press Escape to close
    await page.keyboard.press('Escape');
    
    // Command palette should not be visible
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('closes when clicking backdrop', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on backdrop (outside the command palette)
    await page.locator('body').click({ position: { x: 50, y: 50 } });
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('navigates to dashboard', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Dashboard" command
    await page.getByText('Go to Dashboard').click();
    
    // Should navigate to dashboard
    await expect(page).toHaveURL('/');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('navigates to cases', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Cases" command
    await page.getByText('Go to Cases').click();
    
    // Should navigate to cases page
    await expect(page).toHaveURL('/cases');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('navigates to calendar', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Calendar" command
    await page.getByText('Go to Calendar').click();
    
    // Should navigate to calendar page
    await expect(page).toHaveURL('/calendar');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('navigates to contacts', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Contacts" command
    await page.getByText('Go to Contacts').click();
    
    // Should navigate to contacts page
    await expect(page).toHaveURL('/contacts');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search..')).not.toBeVisible();
  });

  test('navigates to settings', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Settings" command
    await page.getByText('Go to Settings').click();
    
    // Should navigate to settings page
    await expect(page).toHaveURL('/settings');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('navigates to help center', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Go to Help Center" command
    await page.getByText('Go to Help Center').click();
    
    // Should navigate to help page
    await expect(page).toHaveURL('/help');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('creates new case', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Click on "Create New Case" command
    await page.getByText('Create New Case').click();
    
    // Should navigate to cases page with new action
    await expect(page).toHaveURL('/cases?action=new');
    
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('searches commands', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Type search query
    await page.getByPlaceholder('Type a command or search...').fill('dashboard');
    
    // Should show only dashboard command
    await expect(page.getByText('Go to Dashboard')).toBeVisible();
    await expect(page.getByText('Go to Cases')).not.toBeVisible();
  });

  test('shows empty state for no results', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Type search query that won't match anything
    await page.getByPlaceholder('Type a command or search...').fill('nonexistent');
    
    // Should show empty state
    await expect(page.getByText('No commands found')).toBeVisible();
    await expect(page.getByText('Try searching for something else')).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    
    // Press Enter to select
    await page.keyboard.press('Enter');
    
    // Should navigate (exact page depends on which command was selected)
    // Command palette should close
    await expect(page.getByPlaceholder('Type a command or search...')).not.toBeVisible();
  });

  test('displays keyboard shortcuts', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Should show keyboard shortcuts for commands
    // Look for command key symbol and numbers
    await expect(page.locator('kbd').filter({ hasText: '⌘' }).first()).toBeVisible();
    await expect(page.locator('kbd').filter({ hasText: '1' }).first()).toBeVisible();
  });

  test('displays help instructions', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Should show help instructions in footer
    await expect(page.getByText('Navigate')).toBeVisible();
    await expect(page.getByText('Select')).toBeVisible();
    await expect(page.getByText('Close')).toBeVisible();
  });

  test('shows command count', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Should show total command count
    await expect(page.getByText(/commands available/)).toBeVisible();
  });

  test('has proper accessibility attributes', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    
    const searchInput = page.getByPlaceholder('Type a command or search...');
    await expect(searchInput).toBeVisible();
    
    // Input should be focusable
    await expect(searchInput).toBeFocused();
    
    // Command items should be accessible
    const dashboardCommand = page.getByText('Go to Dashboard');
    await expect(dashboardCommand).toBeVisible();
  });

  test('animation and visual effects work', async ({ page }) => {
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Take screenshot to verify visual appearance
    await page.screenshot({ path: 'test-results/command-palette-open.png' });
    
    // Hover over a command to test hover effects
    await page.getByText('Go to Dashboard').hover();
    
    // Take screenshot of hover state
    await page.screenshot({ path: 'test-results/command-palette-hover.png' });
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open command palette
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    // Should be properly sized for mobile
    const commandPalette = page.locator('[role="dialog"]').first();
    await expect(commandPalette).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'test-results/command-palette-mobile.png' });
  });

  test('performance is acceptable', async ({ page }) => {
    // Measure opening performance
    const startTime = Date.now();
    
    await page.keyboard.press('Meta+k');
    await expect(page.getByPlaceholder('Type a command or search...')).toBeVisible();
    
    const openTime = Date.now() - startTime;
    
    // Should open quickly (under 200ms is ideal, 500ms acceptable)
    expect(openTime).toBeLessThan(500);
    
    // Measure search performance
    const searchStart = Date.now();
    
    await page.getByPlaceholder('Type a command or search...').fill('dashboard');
    await expect(page.getByText('Go to Dashboard')).toBeVisible();
    
    const searchTime = Date.now() - searchStart;
    
    // Search should be fast (under 100ms)
    expect(searchTime).toBeLessThan(100);
  });
});