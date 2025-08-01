# Contributing to CaseOS™

Thank you for your interest in contributing to CaseOS™! Together, we're revolutionizing access to justice for self-represented litigants.

## 🌟 Our Mission

Every contribution should align with our core mission: empowering the 75% of litigants who navigate the legal system alone. We prioritize clarity, empathy, and accessibility in everything we build.

## 🤝 Code of Conduct

### Our Values
- **Empathy First**: Remember our users are often stressed and overwhelmed
- **Clarity Over Cleverness**: Simple, understandable code beats complex solutions
- **Accessibility Always**: Every feature must be usable by everyone
- **Privacy by Design**: Protect user data as if it were your own

### Expected Behavior
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Document your code thoughtfully

## 🚀 Getting Started

### Prerequisites
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/caseos-minimal.git
   cd caseos-minimal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```
5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

### Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test thoroughly**:
   ```bash
   npm run lint
   npm test
   npx playwright test
   ```

4. **Commit with meaningful messages**:
   ```bash
   git commit -m "feat: add deadline reminder notifications"
   ```

5. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### TypeScript Guidelines
```typescript
// ✅ GOOD: Descriptive names, proper types
interface LegalCase {
  id: string;
  title: string;
  filingDeadline: Date | null;
  status: CaseStatus;
}

// ❌ BAD: Vague names, any types
interface Data {
  id: any;
  t: string;
  dl: any;
  s: string;
}
```

### Component Standards
```tsx
// ✅ GOOD: Clear props, accessible markup
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      aria-disabled={props.disabled}
      {...props}
    />
  );
}

// ❌ BAD: No types, poor accessibility
export function Button(props) {
  return <button className="btn" {...props} />;
}
```

### File Organization
```
✅ GOOD:
app/
├── components/
│   ├── cases/
│   │   ├── case-list.tsx
│   │   ├── case-card.tsx
│   │   └── case-form.tsx
│   └── ui/
│       ├── button.tsx
│       └── card.tsx

❌ BAD:
components/
├── CaseStuff.tsx
├── btn.tsx
├── misc.tsx
└── utils.tsx
```

### Performance Requirements
- Components must render in < 50ms
- API responses must complete in < 100ms
- Bundle size additions must be justified
- Lazy load non-critical components

### Accessibility Requirements
- All interactive elements must be keyboard navigable
- Proper ARIA labels for screen readers
- Color contrast must meet WCAG 2.1 AA standards
- Form validation must be announced to screen readers

## 🧪 Testing Requirements

### Unit Tests
```typescript
// Every utility function needs tests
describe('formatCaseNumber', () => {
  it('formats federal case numbers correctly', () => {
    expect(formatCaseNumber('2023', 'CV', '12345', 'SDNY')).toBe('2023-CV-12345 (S.D.N.Y.)');
  });
  
  it('handles missing values gracefully', () => {
    expect(formatCaseNumber('', '', '', '')).toBe('Unassigned');
  });
});
```

### E2E Tests
```typescript
// Critical user journeys must have E2E tests
test('user can create a new case', async ({ page }) => {
  await page.goto('/cases/new');
  await page.fill('[name="title"]', 'Landlord Dispute');
  await page.selectOption('[name="caseType"]', 'CIVIL_LITIGATION');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/cases/');
  await expect(page.locator('text=Landlord Dispute')).toBeVisible();
});
```

## 🎨 Design System Guidelines

### Using Design Tokens
```css
/* ✅ GOOD: Use design tokens */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
}

/* ❌ BAD: Hardcoded values */
.card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
}
```

### Component Patterns
Follow Linear-inspired patterns:
- Subtle shadows and borders
- Smooth transitions (200ms)
- Consistent spacing scale
- Muted color palette with purposeful accents

## 📋 Pull Request Process

### PR Title Format
Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Added E2E tests
- [ ] Tested on mobile

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Added comments for complex logic
- [ ] Updated documentation
- [ ] No console.logs left
- [ ] Accessible to screen readers
```

### Review Process
1. Automated checks must pass
2. At least one maintainer review required
3. All feedback addressed or discussed
4. Final approval from code owner

## 🐛 Reporting Issues

### Bug Reports
Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/OS information

### Feature Requests
Include:
- Problem statement
- Proposed solution
- Alternative solutions considered
- User impact assessment

## 🏆 Recognition

Contributors are recognized in:
- [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Release notes
- Annual contributor report

## 📚 Resources

### Documentation
- [API Architecture](API_ARCHITECTURE.md)
- [Development Plan](PLAN.md)
- [Security Guidelines](SECURITY.md)

### Learning Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Legal Tech Best Practices](https://www.legaltechdesign.com)

### Communication Channels
- GitHub Issues: Bug reports and features
- Discussions: General questions
- Discord: Real-time chat (coming soon)

## 🙏 Thank You!

Every contribution, no matter how small, helps us move closer to our goal of democratizing access to justice. Thank you for being part of this mission!

---

*Remember: We're not just writing code; we're changing lives by making justice accessible to everyone.*