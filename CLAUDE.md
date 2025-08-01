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

# Type checking
npm run type-check

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Docker Development (MANDATORY)
All development MUST use Docker to avoid dependency issues:
```bash
# Start all services (app, PostgreSQL, Redis)
docker-compose up -d

# Run tests in Docker
docker-compose run --rm app npm test

# Check coverage in Docker (must be >90%)
docker-compose run --rm app npm run test:coverage

# Run with test profile
docker-compose --profile test up

# Run visual regression tests
docker-compose --profile visual-test up
```

### Playwright E2E Testing
```bash
# Run all E2E tests
npx playwright test

# Run tests with UI
npx playwright test --ui

# Run specific test file
npx playwright test tests/dashboard.spec.ts

# Update visual snapshots
npx playwright test --update-snapshots

# Debug tests
npx playwright test --debug
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
- **Styling**: Tailwind CSS v4 with custom Linear-inspired design tokens
- **Database**: PostgreSQL with Prisma ORM (comprehensive legal-grade schema ready)
- **Authentication**: NextAuth.js v5 with credentials + OAuth providers
- **Testing**: Jest + React Testing Library + Playwright for E2E
- **Animation**: Framer Motion for premium interactions
- **AI Integration**: OpenAI GPT-4 + Anthropic Claude
- **File Storage**: Cloudflare R2
- **Caching**: Upstash Redis
- **Real-time**: Socket.io for live updates

### Key Design Principles
1. **User-Centric**: Every keystroke counted, every click deliberate
2. **Performance**: Sub-50ms latency targets, lazy loading for all components
3. **Visual Excellence**: Linear/Fey-level design quality is the minimum standard
4. **Accessibility**: WCAG 2.1 AA compliance (targeting AAA)
5. **Legal-First**: Every feature considers legal compliance and data sensitivity

### Component Architecture
```
app/
├── components/
│   ├── layout/      # App layout wrapper
│   ├── navigation/  # Sidebar navigation (244px fixed width)
│   ├── ui/          # Reusable UI components (Button, Card, etc.)
│   └── animations/  # Framer Motion animation components
├── api/             # Next.js API routes
│   ├── auth/        # Authentication endpoints
│   ├── legal/       # Case management APIs
│   ├── ai/          # AI chat and analysis
│   └── webhooks/    # External service integrations
├── styles/
│   └── linear-tokens.css  # Design system tokens
```

### Critical Files
- `schema.prisma`: Comprehensive legal-grade database schema with auth, legal, AI, and audit schemas
- `API_ARCHITECTURE.md`: Complete API design specification with tRPC hybrid approach
- `IMPLEMENTATION_GUIDE.md`: Backend implementation roadmap
- `PLAN.md`: Design excellence roadmap with current scores and targets
- `DESIGN_EXCELLENCE.md`: Comprehensive design patterns and implementation guide
- `TESTING_GUIDE.md`: Mandatory testing requirements and examples
- `app/styles/linear-tokens.css`: Design system tokens for consistency

### Testing Strategy
- **Unit Tests**: >90% coverage required for all components
- **Integration Tests**: Playwright covering all user journeys
- **Visual Regression**: Screenshot comparisons for UI consistency
- **Performance Tests**: 60fps animations, sub-50ms interactions
- **Accessibility Tests**: jest-axe for WCAG compliance

### Git Workflow (MANDATORY)
```bash
# For EVERY feature/change:
npm test                    # Run all tests
npm run test:coverage       # Verify >90% coverage
git add .
git commit -m "feat: [component] - add [feature] with tests"
git push origin main

# Then verify deployment at:
# https://caseos-minimal.vercel.app
```

## Code Quality Standards

### Performance Requirements
- Components < 500 lines (split larger files)
- Lazy loading for all non-critical components
- API responses < 50ms
- Client-side rendering optimizations
- 60fps animations using GPU acceleration

### Code Style
- Descriptive variable names
- No unnecessary comments unless specifically requested
- Follow YAGNI, SOLID, KISS, DRY principles
- TypeScript strict mode enabled
- Use existing patterns from neighboring files

### Security Standards
- Never expose secrets or keys
- All user inputs validated with Zod
- Database queries use Prisma (no raw SQL)
- Authentication via NextAuth.js v5
- Encryption for sensitive legal data

## AI Integration Notes
When implementing AI features:
- Use streaming responses for chat interfaces
- Implement rate limiting (20 requests/hour)
- Cache similar queries in Redis
- Store conversation context in database
- Lower temperature (0.1) for legal accuracy

## Legal Domain Specifics
- Case management follows US court system structure
- Document types align with legal filing categories
- Deadlines system accounts for court business days
- Audit logging for all legal data changes
- Retention policies for legal documents

## Development Workflow
1. Start Docker environment: `docker-compose up -d`
2. Check `CLAUDE_COMM_LOG.md` for team coordination
3. Run typecheck before major changes
4. Write tests FIRST (TDD approach)
5. Test with Playwright after implementation
6. Verify >90% coverage before committing
7. Update documentation if adding new patterns

## Common Tasks

### Adding a New Page
1. Create route in `app/[route]/page.tsx`
2. Use `app-layout.tsx` wrapper for consistent layout
3. Follow Linear design tokens from `linear-tokens.css`
4. Add Framer Motion page transitions
5. Write unit tests (>90% coverage)
6. Add Playwright E2E tests
7. Commit and verify deployment

### Creating UI Components
1. Check existing components in `app/components/ui/` for patterns
2. Use Tailwind classes with design tokens
3. Add Framer Motion micro-interactions
4. Ensure dark mode support
5. Add hover/focus states for accessibility
6. Write comprehensive tests
7. Document in Storybook (when added)

### API Development
1. Create route handlers in `app/api/`
2. Use Zod schemas for validation
3. Implement proper error handling
4. Add rate limiting for sensitive endpoints
5. Include audit logging
6. Write integration tests

### Animation Implementation
1. Use Framer Motion for all animations
2. Maintain 60fps performance
3. Use GPU-accelerated properties only (transform, opacity)
4. Respect prefers-reduced-motion
5. Test animation performance
6. Add visual regression tests

## Performance Optimization
- Use Next.js Image component for all images
- Implement virtual scrolling for long lists
- Use React.memo for expensive components
- Enable Turbopack in development (`--turbopack`)
- Monitor bundle size with every change
- Lazy load all non-critical components

## Testing Requirements
Every feature MUST include:
- Unit tests with >90% coverage
- Integration tests for user flows
- Visual regression tests for UI changes
- Performance tests for animations
- Accessibility tests (WCAG compliance)
- Cross-browser testing (Chrome, Firefox, Safari)

Remember: This is a platform for justice accessibility. Every design decision should consider the stressed, overwhelmed self-represented litigant trying to navigate an archaic system. Excellence in execution is not optional - it's a moral imperative.