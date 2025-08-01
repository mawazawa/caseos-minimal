# 🧪 CASEOS™ COMPREHENSIVE TESTING GUIDE

> **MANDATORY**: Every feature must have tests. Every push must deploy successfully. No exceptions.

## 🐳 Docker-First Development

### Initial Setup
```bash
# Clone and setup
git clone <repo>
cd caseos-minimal

# Start everything with Docker
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f app
```

### Daily Development Workflow
```bash
# 1. Start your day
docker-compose up -d

# 2. Make changes in your editor

# 3. Test in container (hot reload works!)
# App runs at http://localhost:3000

# 4. Run tests before committing
docker-compose run --rm app npm test
docker-compose run --rm app npm run test:coverage

# 5. Commit and push
git add .
git commit -m "feat: add animation with 95% test coverage"
git push origin main

# 6. Verify Vercel deployment
# Check https://caseos-minimal.vercel.app
```

---

## 📋 Test Categories & Requirements

### 1. Unit Tests (Jest + React Testing Library)
**Required for EVERY component**

```typescript
// Example: Button Animation Test
// __tests__/components/ui/button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies hover animations', async () => {
    const { container } = render(<Button>Hover me</Button>)
    const button = container.firstChild
    
    fireEvent.mouseEnter(button)
    expect(button).toHaveClass('hover:scale-105')
  })
})
```

### 2. Integration Tests (Playwright)
**Required for user flows**

```typescript
// tests/auth-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can sign up, sign in, and sign out', async ({ page }) => {
    // Sign up
    await page.goto('/auth/signup')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'SecurePass123!')
    await page.click('button[type="submit"]')
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // Sign out
    await page.click('[data-testid="user-menu"]')
    await page.click('text=Sign out')
    
    // Verify redirect to home
    await expect(page).toHaveURL('/')
  })
})
```

### 3. Visual Regression Tests
**Required for UI changes**

```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('button states', async ({ page }) => {
    await page.goto('/storybook/button')
    
    // Default state
    await expect(page.locator('.button-default')).toHaveScreenshot('button-default.png')
    
    // Hover state
    await page.hover('.button-default')
    await expect(page.locator('.button-default')).toHaveScreenshot('button-hover.png')
    
    // Active state
    await page.locator('.button-default').click()
    await expect(page.locator('.button-default')).toHaveScreenshot('button-active.png')
  })
})
```

### 4. Performance Tests
**Required for animations**

```typescript
// tests/performance/animations.spec.ts
test('page transition maintains 60fps', async ({ page }) => {
  const metrics = await page.evaluate(async () => {
    // Measure FPS during animation
    const frames = []
    let lastTime = performance.now()
    
    return new Promise((resolve) => {
      function measureFrame() {
        const currentTime = performance.now()
        const fps = 1000 / (currentTime - lastTime)
        frames.push(fps)
        lastTime = currentTime
        
        if (frames.length < 60) {
          requestAnimationFrame(measureFrame)
        } else {
          resolve(frames)
        }
      }
      
      // Trigger animation
      document.querySelector('[data-testid="animate"]').click()
      requestAnimationFrame(measureFrame)
    })
  })
  
  const averageFPS = metrics.reduce((a, b) => a + b) / metrics.length
  expect(averageFPS).toBeGreaterThan(55) // Allow small margin
})
```

### 5. Accessibility Tests
**Required for all interactive elements**

```typescript
// __tests__/a11y/navigation.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('navigation is accessible', async () => {
  const { container } = render(<Navigation />)
  const results = await axe(container)
  
  expect(results).toHaveNoViolations()
})
```

---

## 🚀 Continuous Deployment Process

### Pre-Push Checklist
```bash
# Run in Docker container
docker-compose run --rm app bash -c "
  npm run lint &&
  npm run type-check &&
  npm run test &&
  npm run test:e2e &&
  npm run build
"
```

### Git Commit Standards
```bash
# Format: type(scope): message

feat(animation): add page transition with 95% coverage
fix(button): resolve hover state memory leak
test(auth): add e2e tests for signup flow
perf(animation): optimize fps to consistent 60
docs(testing): update testing guide with examples
```

### Vercel Deployment Verification
After EVERY push:
1. Check Vercel dashboard: https://vercel.com/dashboard
2. View deployment: https://caseos-minimal.vercel.app
3. Run smoke tests: `npm run test:smoke`
4. Check Lighthouse scores: `npm run lighthouse`

---

## 📊 Test Coverage Requirements

### Minimum Coverage Thresholds
```json
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
```

### Coverage Report
```bash
# Generate coverage report
docker-compose run --rm app npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

---

## 🔧 Debugging Tests

### Running Tests in Watch Mode
```bash
# Unit tests
docker-compose run --rm app npm run test:watch

# E2E tests with UI
docker-compose run --rm app npx playwright test --ui
```

### Debugging Specific Tests
```bash
# Run single test file
docker-compose run --rm app npm test button.test.tsx

# Run with debugging
docker-compose run --rm app npm test -- --detectOpenHandles
```

### Visual Debugging
```bash
# Open Playwright Inspector
docker-compose run --rm app npx playwright test --debug

# Update visual snapshots
docker-compose run --rm app npx playwright test --update-snapshots
```

---

## 🚨 Common Issues & Solutions

### Issue: Tests fail in Docker but pass locally
**Solution**: Always develop in Docker
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Issue: Flaky animation tests
**Solution**: Use proper wait strategies
```typescript
// Bad
await page.waitForTimeout(1000)

// Good
await page.waitForSelector('.animation-complete')
await expect(element).toHaveCSS('opacity', '1')
```

### Issue: Coverage drops below 90%
**Solution**: Write tests BEFORE implementation (TDD)
```bash
# Check what's not covered
docker-compose run --rm app npm run test:coverage
# Focus on uncovered lines shown in red
```

---

## 📚 Resources

### Testing Libraries Documentation
- [Jest](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [Jest-Axe](https://github.com/nickcolley/jest-axe)

### Our Testing Standards
- Every PR must have tests
- Every test must pass in Docker
- Every deployment must succeed
- Every animation must run at 60fps

---

**Remember**: Testing is not optional. It's how we ensure justice accessibility for 75 million self-represented litigants. Every bug we catch saves someone's case.