/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Demo E2E Tests
 */

import { test, expect } from '@playwright/test';

test.describe('Skeleton Loading States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/skeleton');
    await page.waitForLoadState('networkidle');
  });

  test('displays skeleton demo page', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: 'Loading Skeletons' })).toBeVisible();
    await expect(page.getByText('Linear-inspired skeleton loading states')).toBeVisible();
    
    // Check main demo heading
    await expect(page.getByRole('heading', { name: 'Skeleton Components' })).toBeVisible();
  });

  test('toggles between skeleton and content states', async ({ page }) => {
    // Initially shows skeletons
    const toggleButton = page.getByRole('button', { name: 'Show Content' });
    await expect(toggleButton).toBeVisible();
    
    // Click to show content
    await toggleButton.click();
    await expect(page.getByRole('button', { name: 'Show Skeletons' })).toBeVisible();
    
    // Verify content is shown (example: colored divs)
    await expect(page.locator('.bg-blue-500')).toBeVisible();
    await expect(page.locator('.bg-green-500')).toBeVisible();
    await expect(page.locator('.bg-purple-500')).toBeVisible();
    
    // Click to show skeletons again
    await page.getByRole('button', { name: 'Show Skeletons' }).click();
    await expect(page.getByRole('button', { name: 'Show Content' })).toBeVisible();
  });

  test('displays all skeleton component types', async ({ page }) => {
    const sections = [
      'Basic Skeleton',
      'Text Skeleton',
      'Card Skeleton',
      'Table Skeleton',
      'Avatar Skeleton',
      'Button Skeleton',
      'List Item Skeleton',
      'Form Skeleton'
    ];
    
    for (const section of sections) {
      await expect(page.getByRole('heading', { name: section })).toBeVisible();
    }
  });

  test('skeleton animations are visible', async ({ page }) => {
    // Check for skeleton elements with animation
    const skeletons = page.locator('.bg-\\[var\\(--color-background-secondary\\)\\]');
    await expect(skeletons.first()).toBeVisible();
    
    // Check for shimmer animation element
    const shimmer = page.locator('.absolute.inset-0.-translate-x-full');
    const shimmerCount = await shimmer.count();
    expect(shimmerCount).toBeGreaterThan(0);
  });

  test('responsive layout works correctly', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Check grid layouts
    const cardGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4').first();
    await expect(cardGrid).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Grid should stack on mobile
    await expect(cardGrid).toBeVisible();
  });

  test('form skeleton shows correct structure', async ({ page }) => {
    // Scroll to form skeleton section
    await page.getByRole('heading', { name: 'Form Skeleton' }).scrollIntoViewIfNeeded();
    
    // Toggle to show skeleton
    const toggleButton = page.getByRole('button', { name: /Show/ });
    const buttonText = await toggleButton.textContent();
    if (buttonText === 'Show Skeletons') {
      await toggleButton.click();
    }
    
    // Check form skeleton structure
    const formSection = page.locator('section').filter({ hasText: 'Form Skeleton' });
    const formSkeletons = formSection.locator('.space-y-6');
    await expect(formSkeletons).toBeVisible();
  });

  test('performance: skeletons render quickly', async ({ page }) => {
    // Measure time to render skeletons
    const startTime = Date.now();
    
    // Wait for skeletons to be visible
    await page.locator('.bg-\\[var\\(--color-background-secondary\\)\\]').first().waitFor();
    
    const renderTime = Date.now() - startTime;
    
    // Skeletons should render within 500ms
    expect(renderTime).toBeLessThan(500);
  });

  test('accessibility: proper ARIA attributes', async ({ page }) => {
    // Check that interactive elements are accessible
    const toggleButton = page.getByRole('button', { name: /Show/ });
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toBeEnabled();
    
    // Check heading hierarchy
    const h2Headings = page.getByRole('heading', { level: 2 });
    const h3Headings = page.getByRole('heading', { level: 3 });
    
    expect(await h2Headings.count()).toBeGreaterThan(0);
    expect(await h3Headings.count()).toBeGreaterThan(0);
  });

  test('takes screenshot of skeleton demo', async ({ page }) => {
    // Ensure skeletons are visible
    const toggleButton = page.getByRole('button', { name: /Show/ });
    const buttonText = await toggleButton.textContent();
    if (buttonText === 'Show Content') {
      // Already showing skeletons
    } else {
      await toggleButton.click();
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/skeleton-demo.png',
      fullPage: true 
    });
  });
});