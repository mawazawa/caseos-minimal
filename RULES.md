# CaseOS™ Repository Organization Rules
## Vibe Coding & AI-First Development (July 2025)

> "Fix inputs, not outputs. Build a factory of agents that can produce code, verify it, and improve themselves over time." - [john-rush.com AI Factory](https://www.john-rush.com/posts/ai-20250701.html)

---

## 🎯 Core Philosophy

We adopt **vibe coding** principles that blend creativity with technical excellence, emphasizing monorepo culture for team unity and lazy architectures for minimalist efficiency. Every decision prioritizes human wellbeing through beautiful, accessible software that democratizes justice.

### Guiding Principles
1. **AI-First Development**: Embrace spec-driven development with plan-execute workflows
2. **Monorepo Culture**: Standardized tools, single release cycle, collective responsibility ([resync-games.com](https://resync-games.com/blog/engineering/monorepo-culture))
3. **Lazy File Architecture**: Minimalist structure enabling hot-swappable components ([dev.to AGI patterns](https://dev.to/owly/the-structure-supreme-lazy-file-architecture-for-the-agi-software-design-pattern-432c))
4. **YAGNI + SOLID + KISS + DRY**: Cut unnecessary code while maintaining/expanding functionality
5. **User-Centric Minimalism**: Every interaction optimized for stressed litigants

---

## 🏗️ Repository Structure (Lazy Architecture)

### Core Structure
```
caseos-minimal/
├── app/                     # Next.js 15 app directory
│   ├── api/                # API routes (empty → implement first)
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components (Button, Card)
│   │   └── layout/        # Layout components (AppLayout, Sidebar)
│   ├── lib/               # Utilities and shared logic
│   └── styles/            # Design tokens and CSS
├── docs/                   # Project documentation
├── tests/                  # E2E and unit tests
├── .rules/                 # AI agent rules and templates
└── schema.prisma          # Database schema (single source of truth)
```

### DLC-Style Feature Loading
Inspired by [AGI software patterns](https://dev.to/owly/the-structure-supreme-lazy-file-architecture-for-the-agi-software-design-pattern-432c), implement hot-swappable features:

```typescript
// Dynamic feature loading pattern
const loadFeatureSkills = (featureName: string) => {
  const skillFiles = fs.readdirSync('./features')
    .filter(file => file.includes(featureName) && file.endsWith('.ts'));
  
  return skillFiles.map(file => require(`./features/${file}`));
};
```

---

## 🤖 AI-First Development Patterns

### The 4-Document Framework ([blog.daviddodda.com](https://blog.daviddodda.com/most-ai-code-is-garbage-heres-how-mine-isnt))

Every AI interaction must reference these four documents:

1. **📋 Coding Guidelines** (`docs/CODING_GUIDELINES.md`)
   - Technology stack standards
   - ESLint/Prettier configuration
   - Naming conventions
   - Testing patterns

2. **🗄️ Database Structure** (`schema.prisma`)
   - Single source of truth for data models
   - Complete schema with relationships
   - Legal compliance fields

3. **✅ Master Todo List** (`PLAN.md`)
   - End-to-end feature breakdown
   - API endpoint specifications
   - Implementation priorities

4. **📖 Development Progress Log** (`CHANGELOG.md`)
   - Setup steps and decisions
   - Implementation learnings
   - Architecture evolution

### Plan-Execute Workflow

**Never code directly.** Always use two-stage prompting:

1. **Planning Stage**: "Create a detailed plan for implementing [feature], including files to create/modify, database changes, and API endpoints."
2. **Review**: Human reviews and approves plan
3. **Execution Stage**: "Execute the plan exactly as outlined."

```markdown
# Template for AI interactions
## Context
- [Reference 4-document framework]
- [Current task from todo list]

## Plan Request
[Specific feature/task description]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]
- [Performance/security requirements]
```

---

## 🎨 Design System Rules

### Linear-Inspired Aesthetics
Follow Linear's design principles for clean, professional interfaces:

- **Typography**: Inter font with consistent scale
- **Colors**: Purposeful, minimal palette with CSS custom properties
- **Spacing**: 4px base unit with logical scale
- **Components**: Composition over configuration

### CSS Architecture
```css
/* Design tokens in linear-tokens.css */
:root {
  --color-primary: #5E6AD2;
  --color-accent: #7C3AED;
  --font-size-base: 14px;
  --radius-md: 6px;
}

/* Components use tokens consistently */
.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}
```

### Component Guidelines
- **Composition over Props**: Favor children and composition patterns
- **Variants via CSS**: Use CSS classes, not complex prop combinations
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support

---

## 📊 Database & API Design

### Schema-Driven Development
The `schema.prisma` file is the single source of truth. All features must:
- Reference existing models or propose schema changes
- Follow legal compliance patterns (audit trails, soft deletes)
- Use proper relationships and constraints

### API Design Principles
- **RESTful + tRPC Hybrid**: REST for standard operations, tRPC for type-safe internals
- **Legal-First**: Every endpoint considers compliance and data sensitivity
- **Sub-50ms Response Times**: Performance as a core requirement

```typescript
// API route structure
app/api/
├── auth/[...nextauth]/     # Authentication
├── legal/cases/            # Case management
├── legal/documents/        # Document operations
├── ai/chat/               # AI integration
└── admin/                 # Administrative functions
```

---

## 🔐 Security & Compliance Rules

### Legal-Grade Requirements
- **Audit Everything**: Every action logged with IP, timestamp, user context
- **Encrypt Sensitive Data**: AES-256-GCM for documents, bcrypt for passwords
- **Role-Based Access**: Granular permissions following principle of least privilege
- **Data Retention**: Soft deletes with retention policies

### Implementation Checklist
- [ ] Rate limiting on all endpoints (`@upstash/ratelimit`)
- [ ] Input validation with Zod schemas
- [ ] HTTPS only, secure headers
- [ ] Environment secrets via secure providers

---

## 🧪 Testing & Quality Assurance

### Testing Strategy
- **E2E First**: Playwright tests for user workflows
- **Unit Tests**: Jest for business logic and utilities
- **Integration Tests**: API endpoint testing with real database

### Code Quality Gates
- **ESLint**: Airbnb TypeScript standards, no lint ignore flags
- **Prettier**: Consistent formatting, no exceptions
- **TypeScript Strict**: Full type safety, no `any` types
- **Performance**: Lighthouse scores 90+ across all metrics

---

## 🚀 Development Workflow

### Monorepo Culture Practices ([resync-games.com](https://resync-games.com/blog/engineering/monorepo-culture))

1. **Standardized Tools**: Same dev environment for everyone
2. **Single Release Cycle**: All components versioned together
3. **Collective Responsibility**: Everyone maintains code quality

### Git Workflow
```bash
# Feature development
git checkout -b feature/case-management
# Work with AI using plan-execute pattern
# Commit frequently with descriptive messages
git commit -m "feat(cases): implement case creation with validation"

# Before merging
npm run lint
npm run test
npm run build
```

### AI Factory Patterns
- **Background Agents**: Use MCP for automated code review
- **Repository Reflection**: Implement continuous improvement loops
- **Context Engineering**: Maintain document framework for consistency

---

## 📈 Performance & Optimization

### Caching Strategy
```typescript
// Redis caching with appropriate TTLs
const cacheConfig = {
  sessions: { ttl: 3600 },      // 1 hour
  legalCases: { ttl: 300 },     // 5 minutes
  aiResponses: { ttl: 1800 },   // 30 minutes
  templates: { ttl: 86400 }     // 24 hours
};
```

### Optimization Targets
- **API Response**: < 50ms for core operations
- **Page Load**: < 1s time to interactive
- **Bundle Size**: Minimal through code splitting
- **Database**: Proper indexing and connection pooling

---

## 🎯 User Experience Standards

### Accessibility Requirements
- **WCAG 2.1 AA Compliance**: Minimum standard
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Proper semantic markup
- **Color Contrast**: 4.5:1 minimum ratio

### Interaction Design
- **Loading States**: Suspense boundaries for async operations
- **Error Handling**: User-friendly error messages
- **Feedback**: Toast notifications for user actions
- **Progressive Enhancement**: Core features work without JavaScript

---

## 🔄 Continuous Improvement

### Documentation Sync
Every week, run documentation sync process:
1. **Git Diff Analysis**: Identify changes since last update
2. **Gap Analysis**: Find documentation that needs updating
3. **Critical Updates**: Fix broken setup instructions
4. **Validation**: Test all documented commands work

### AI Factory Evolution
- **Model Upgrades**: Stay current with latest AI capabilities
- **Pattern Refinement**: Continuously improve prompt templates
- **Tool Integration**: Add new MCP tools as they become available
- **Performance Monitoring**: Track AI credit usage and optimization

---

## 📝 Commit Message Convention

```
feat(scope): description
fix(scope): description
docs(scope): description
style(scope): description
refactor(scope): description
test(scope): description
chore(scope): description

# Examples
feat(auth): implement NextAuth.js with Google provider
fix(dashboard): resolve case status display bug
docs(api): update endpoint documentation for v2
```

---

## 🎉 Success Metrics

### Code Quality
- **TypeScript Coverage**: 100%
- **Test Coverage**: >80% for business logic
- **Lint Errors**: 0 on main branch
- **Performance**: Lighthouse 90+ all categories

### User Experience
- **Page Load**: <1s on 3G connection
- **Accessibility**: WCAG AA compliance
- **Error Rate**: <1% of user interactions
- **User Satisfaction**: Focus on stressed litigants' needs

### Development Velocity
- **AI Credit Efficiency**: Measure cost per feature
- **Documentation Drift**: <48 hours between code and docs
- **CI/CD**: <5 minute build times
- **Feature Delivery**: Plan-execute cycle optimization

---

## 🌟 Final Notes

> "Aesthetic design isn't just about looking good—it's the foundation of tools that uplift humanity, turning complex legal battles into manageable journeys that enhance wellbeing for millions."

This repository embodies the belief that visual aesthetic design and minimalism are cornerstones of society. Every component, every interaction, every line of code should contribute to products that positively influence human behavior and wellbeing.

**Remember**: We're not just building software. We're building tools that democratize justice and empower the 75 million self-represented litigants navigating the legal system alone.

---

*Rules Version: 1.0*  
*Last Updated: August 1, 2025*  
*Next Review: August 15, 2025*