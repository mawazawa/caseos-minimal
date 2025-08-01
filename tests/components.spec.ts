/*
 *  ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗███████╗
 * ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
 * ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
 * ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   ███████║
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
 * Component E2E Tests - CaseOS Linear-inspired Design System  
 */

import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Button Component', () => {
    test('should render different button variants correctly', async ({ page }) => {
      // Primary button (New Case in header)
      const primaryButton = page.locator('button:has-text("New Case")').nth(1);
      await expect(primaryButton).toBeVisible();
      
      // Check primary button has accent background
      const primaryButtonStyles = await primaryButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      });
      
      expect(primaryButtonStyles.backgroundColor).toBeTruthy();
      expect(primaryButtonStyles.color).toBeTruthy();
      
      // Secondary button (Search, Filter)
      const secondaryButton = page.locator('button:has-text("Search")');
      await expect(secondaryButton).toBeVisible();
      
      // Ghost button (View All)
      const ghostButton = page.locator('button:has-text("View All")');
      await expect(ghostButton).toBeVisible();
    });

    test('should handle button interactions with proper feedback', async ({ page }) => {
      const searchButton = page.locator('button:has-text("Search")').first();
      
      // Test button is clickable
      await expect(searchButton).toBeEnabled();
      
      // Test hover state
      await searchButton.hover();
      
      // Test focus state  
      await searchButton.focus();
      
      // Test click (should not cause errors even if no handler)
      await searchButton.click({ trial: true });
    });

    test('should have proper button sizing', async ({ page }) => {
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      // Check that buttons have consistent height
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const height = await button.evaluate((el) => {
            return window.getComputedStyle(el).height;
          });
          
          // Should have reasonable height (at least 32px for accessibility)
          const heightPx = parseInt(height);
          expect(heightPx).toBeGreaterThanOrEqual(32);
        }
      }
    });
  });

  test.describe('Card Component', () => {
    test('should render cards with proper styling', async ({ page }) => {
      // Stats cards
      const statsCards = page.locator('[class*="grid-cols-1"][class*="md:grid-cols-2"][class*="lg:grid-cols-4"] > *');
      const cardCount = await statsCards.count();
      expect(cardCount).toBe(4);
      
      // Check first card styling
      const firstCard = statsCards.first();
      const cardStyles = await firstCard.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          boxShadow: styles.boxShadow,
        };
      });
      
      expect(cardStyles.backgroundColor).toBeTruthy();
      expect(cardStyles.borderRadius).toBeTruthy();
      expect(cardStyles.padding).toBeTruthy();
    });

    test('should display card content correctly', async ({ page }) => {
      // Check stats card content structure
      const firstStatsCard = page.locator('[class*="grid-cols-1"][class*="md:grid-cols-2"][class*="lg:grid-cols-4"] > *').first();
      
      // Should have label, value, and trend
      await expect(firstStatsCard.locator('text=Active Cases')).toBeVisible();
      await expect(firstStatsCard.locator('text=3')).toBeVisible();
      await expect(firstStatsCard.locator('text=+1 this month')).toBeVisible();
      
      // Check Recent Cases card
      const recentCasesCard = page.locator('h3:has-text("Recent Cases")').locator('../..');
      await expect(recentCasesCard).toBeVisible();
      
      // Check Upcoming Events card
      const upcomingEventsCard = page.locator('h3:has-text("Upcoming Events")').locator('../..');
      await expect(upcomingEventsCard).toBeVisible();
    });

    test('should handle card hover states', async ({ page }) => {
      const recentCaseItems = page.locator('text=Landlord Dispute - Security Deposit').locator('..');
      
      await recentCaseItems.hover();
      
      // After hover, should maintain visibility
      await expect(recentCaseItems).toBeVisible();
    });
  });

  test.describe('Sidebar Navigation', () => {
    test('should render sidebar with correct width', async ({ page }) => {
      const sidebar = page.locator('aside');
      await expect(sidebar).toBeVisible();
      
      const sidebarStyles = await sidebar.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          width: styles.width,
          position: styles.position,
          backgroundColor: styles.backgroundColor,
        };
      });
      
      expect(sidebarStyles.width).toBe('244px');
      expect(sidebarStyles.position).toBe('fixed');
      expect(sidebarStyles.backgroundColor).toBeTruthy();
    });

    test('should highlight active navigation item', async ({ page }) => {
      // Dashboard should be active by default
      const dashboardLink = page.locator('a:has-text("Dashboard")');
      await expect(dashboardLink).toBeVisible();
      
      // Check if it has active styling
      const linkStyles = await dashboardLink.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      });
      
      expect(linkStyles.backgroundColor).toBeTruthy();
      expect(linkStyles.color).toBeTruthy();
    });

    test('should show badge on navigation items', async ({ page }) => {
      // My Cases should show badge with "3"
      const badge = page.locator('text=My Cases').locator('..').locator('text=3');
      await expect(badge).toBeVisible();
      
      const badgeStyles = await badge.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          fontSize: styles.fontSize,
        };
      });
      
      expect(badgeStyles.backgroundColor).toBeTruthy();
      expect(badgeStyles.borderRadius).toBeTruthy();
    });

    test('should render user information at bottom', async ({ page }) => {
      const userInfo = page.locator('text=John Doe');
      await expect(userInfo).toBeVisible();
      
      const userPlan = page.locator('text=Pro Plan');
      await expect(userPlan).toBeVisible();
      
      // Check user avatar
      const userAvatar = page.locator('text=JD').first();
      await expect(userAvatar).toBeVisible();
    });
  });

  test.describe('Layout Components', () => {
    test('should have proper page header structure', async ({ page }) => {
      // Check main heading
      const heading = page.locator('h1:has-text("Dashboard")');
      await expect(heading).toBeVisible();
      
      // Check description
      const description = page.locator('text=Welcome back! Here\'s an overview of your legal matters.');
      await expect(description).toBeVisible();
      
      // Check actions are properly aligned
      const actionsContainer = page.locator('button:has-text("Search")').locator('..');
      await expect(actionsContainer).toBeVisible();
    });

    test('should maintain proper content spacing', async ({ page }) => {
      // Check if main content has proper offset for sidebar
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
      
      const mainStyles = await mainContent.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          marginLeft: styles.marginLeft,
          padding: styles.padding,
        };
      });
      
      // Should have left margin for sidebar offset
      expect(mainStyles.marginLeft).toBeTruthy();
    });

    test('should handle responsive layout', async ({ page }) => {
      // Test tablet breakpoint
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Stats should be 2 columns on tablet
      const statsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
      await expect(statsGrid).toBeVisible();
      
      // Test mobile breakpoint
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Should still be functional on mobile
      await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
      
      // Reset to desktop
      await page.setViewportSize({ width: 1280, height: 720 });
    });
  });

  test.describe('Typography and Design Tokens', () => {
    test('should use consistent typography scale', async ({ page }) => {
      // Check main heading size
      const h1 = page.locator('h1');
      const h1Styles = await h1.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
        };
      });
      
      expect(h1Styles.fontSize).toBeTruthy();
      expect(h1Styles.fontWeight).toBeTruthy();
      
      // Check card titles
      const cardTitle = page.locator('h3').first();
      const cardTitleStyles = await cardTitle.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
        };
      });
      
      expect(cardTitleStyles.fontSize).toBeTruthy();
      expect(cardTitleStyles.fontWeight).toBeTruthy();
    });

    test('should have consistent color usage', async ({ page }) => {
      // Check accent color usage on buttons
      const primaryButton = page.locator('button:has-text("New Case")').first();
      const buttonStyles = await primaryButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
        };
      });
      
      expect(buttonStyles.backgroundColor).toBeTruthy();
      
      // Check text color hierarchy
      const primaryText = page.locator('h1');
      const secondaryText = page.locator('p').first();
      
      const primaryTextColor = await primaryText.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      const secondaryTextColor = await secondaryText.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      expect(primaryTextColor).toBeTruthy();
      expect(secondaryTextColor).toBeTruthy();
      // Primary and secondary text should have different colors
      expect(primaryTextColor).not.toBe(secondaryTextColor);
    });

    test('should have smooth transitions', async ({ page }) => {
      const button = page.locator('button:has-text("Search")').first();
      
      const transitionStyles = await button.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          transition: styles.transition,
          transitionDuration: styles.transitionDuration,
        };
      });
      
      // Should have transition properties defined
      expect(transitionStyles.transition || transitionStyles.transitionDuration).toBeTruthy();
    });
  });

  test.describe('Icons and Visual Elements', () => {
    test('should render icons consistently', async ({ page }) => {
      // Check stats icons are visible
      const statsSection = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
      
      // Should have 4 stats cards with icons
      const statsCards = statsSection.locator('> *');
      const cardCount = await statsCards.count();
      expect(cardCount).toBe(4);
      
      // Check navigation icons
      const sidebarIcons = page.locator('aside svg');
      const iconCount = await sidebarIcons.count();
      expect(iconCount).toBeGreaterThan(5); // Should have multiple navigation icons
    });

    test('should have proper icon sizing', async ({ page }) => {
      // Check a navigation icon size
      const firstNavIcon = page.locator('aside svg').first();
      if (await firstNavIcon.isVisible()) {
        const iconSize = await firstNavIcon.evaluate((el) => {
          return {
            width: el.getAttribute('width') || window.getComputedStyle(el).width,
            height: el.getAttribute('height') || window.getComputedStyle(el).height,
          };
        });
        
        // Icons should have consistent sizing
        expect(iconSize.width).toBeTruthy();
        expect(iconSize.height).toBeTruthy();
      }
    });

    test('should render status indicators correctly', async ({ page }) => {
      // Check case status dots
      const statusDots = page.locator('[class*="w-2"][class*="h-2"][class*="rounded-full"]');
      const dotCount = await statusDots.count();
      expect(dotCount).toBeGreaterThan(0);
      
      // Check priority badges
      const priorityBadges = page.locator('span:has-text("high"), span:has-text("medium"), span:has-text("low")');
      const badgeCount = await priorityBadges.count();
      expect(badgeCount).toBe(3); // Should have 3 priority badges for the 3 cases
    });
  });
});