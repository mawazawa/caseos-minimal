# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CaseOS™ is a revolutionary legal technology platform designed for self-represented litigants. This is NOT a tool for lawyers or legal practices - it's a justice accessibility revolution for the 75% of litigants who navigate the legal system alone. The platform prioritizes world-class UI/UX design excellence with Linear-inspired aesthetics and sub-50ms performance targets.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run Playwright tests
npx playwright test

# Run tests with UI
npx playwright test --ui

# Watch specific test file
npx playwright test tests/dashboard.spec.ts --watch
```

### Database Commands (when Prisma is set up)
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Architecture & Structure

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS v4 with Linear-inspired design tokens
- **Database**: PostgreSQL with Prisma ORM (schema.prisma ready)
- **Testing**: Playwright for E2E tests
- **Design System**: Custom Linear-inspired components in `app/components/`

### Key Design Principles
1. **User-Centric**: Every keystroke counted, every click deliberate
2. **Performance**: Sub-50ms latency targets, lazy loading for all components
3. **Visual Excellence**: Linear/Fey-level design quality is the minimum standard
4. **Accessibility**: WCAG 2.1 AA compliance for justice accessibility

### Component Architecture
```
app/
├── components/
│   ├── layout/      # App layout wrapper
│   ├── navigation/  # Sidebar navigation (244px fixed width)
│   └── ui/          # Reusable UI components (Button, Card)
├── styles/
│   └── linear-tokens.css  # Design tokens for consistency
```

### Critical Files
- `schema.prisma`: Comprehensive legal-grade database schema with auth, legal, AI, and audit schemas
- `API_ARCHITECTURE.md`: Complete API design specification
- `IMPLEMENTATION_GUIDE.md`: Backend implementation roadmap
- `app/styles/linear-tokens.css`: Design system tokens

### Testing Strategy
- E2E tests with Playwright covering all user journeys
- Component tests verify Linear-inspired design implementation
- Tests run on multiple browsers and devices
- Visual regression testing for design consistency

## Code Quality Standards

### Performance Requirements
- Components < 500 lines (split larger files)
- Lazy loading for all non-critical components
- API responses < 50ms
- Client-side rendering optimizations

### Code Style
- Descriptive variable names
- No unnecessary comments
- Follow YAGNI, SOLID, KISS, DRY principles
- TypeScript strict mode enabled

### Security Standards
- Never expose secrets or keys
- All user inputs validated with Zod
- Database queries use Prisma (no raw SQL)
- Authentication via NextAuth.js v5

## AI Integration Notes
When implementing AI features:
- Use streaming responses for chat
- Cache AI responses for similar queries
- Implement rate limiting (20 requests/hour)
- Store conversation context in database

## Legal Domain Specifics
- Case management follows US court system structure
- Document types align with legal filing categories
- Deadlines system accounts for court business days
- Audit logging for all legal data changes

## Development Workflow
1. Check `CLAUDE_COMM_LOG.md` for team coordination
2. Run typecheck before major changes
3. Test with Playwright after implementation
4. Update documentation if adding new patterns

## Common Tasks

### Adding a New Page
1. Create route in `app/[route]/page.tsx`
2. Use `app-layout.tsx` wrapper for consistent layout
3. Follow Linear design tokens from `linear-tokens.css`
4. Add Playwright tests in `tests/`

### Creating UI Components
1. Check existing components for patterns
2. Use Tailwind classes with design tokens
3. Ensure dark mode support
4. Add hover/focus states for accessibility

### API Development
1. Create route handlers in `app/api/`
2. Use Zod for validation
3. Implement proper error handling
4. Add rate limiting for sensitive endpoints

## Performance Optimization
- Use Next.js Image component for images
- Implement virtual scrolling for long lists
- Use React.memo for expensive components
- Enable Turbopack in development

Remember: This is a platform for justice accessibility. Every design decision should consider the stressed, overwhelmed self-represented litigant trying to navigate an archaic system. Excellence in execution is not optional.