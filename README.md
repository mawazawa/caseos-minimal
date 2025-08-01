# CaseOS™ - Revolutionizing Access to Justice

<div align="center">
  <img src="public/caseos-logo.svg" alt="CaseOS Logo" width="200" />
  
  **Empowering 75 Million Self-Represented Litigants with AI-Powered Legal Technology**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
</div>

## 🎯 Mission

CaseOS™ is a revolutionary legal technology platform designed specifically for self-represented litigants - the 75% of people who navigate the legal system without an attorney. We're not building tools for lawyers; we're democratizing justice through world-class design and AI assistance.

## ✨ Key Features

- **🤖 AI Legal Assistant** - GPT-4 powered guidance through every step of your legal journey
- **📄 Smart Document Management** - OCR, analysis, and intelligent organization of legal documents
- **📅 Deadline Tracking** - Never miss a filing deadline with intelligent reminders
- **📝 Form Generation** - AI-assisted legal form completion with jurisdiction-specific templates
- **🔒 Bank-Grade Security** - Your sensitive legal data protected with enterprise encryption
- **🎨 Linear-Inspired Design** - Beautiful, intuitive interface that reduces stress, not adds to it

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (REQUIRED - no exceptions)
- Git
- 8GB RAM minimum

### ⚠️ MANDATORY: Docker-First Development

**ALL development MUST use Docker containers to avoid dependency issues.**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/caseos/caseos-minimal.git
cd caseos-minimal
```

2. Start the Docker development environment:
```bash
# This starts PostgreSQL, Redis, and the Next.js app
docker-compose up -d

# View logs
docker-compose logs -f app
```

3. The application will be available at:
- Application: [http://localhost:3000](http://localhost:3000)
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Running Tests (MANDATORY before every commit)
```bash
# Run all tests in Docker
docker-compose run --rm app npm test

# Check coverage (must be >90%)
docker-compose run --rm app npm run test:coverage

# Run E2E tests
docker-compose run --rm app npx playwright test
```

### Development Workflow
```bash
# Make changes, then test
docker-compose run --rm app npm test

# Commit with tests passing
git add .
git commit -m "feat: add feature with tests"
git push origin main

# Verify deployment at https://caseos-minimal.vercel.app
```

## 🏗️ Architecture

CaseOS™ is built with a modern, scalable architecture:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js 15    │────▶│   PostgreSQL    │────▶│  Cloudflare R2  │
│   App Router    │     │   with Prisma   │     │  File Storage   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         ▼                       ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Linear-Style   │     │   NextAuth.js   │     │   OpenAI API    │
│    UI/UX        │     │ Authentication  │     │  AI Assistant   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4
- **Backend**: Next.js API Routes, tRPC (planned)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **AI Integration**: OpenAI GPT-4, Anthropic Claude
- **File Storage**: Cloudflare R2
- **Testing**: Playwright for E2E tests

## 📁 Project Structure

```
caseos-minimal/
├── app/                    # Next.js 15 app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   │   ├── layout/       # Layout components
│   │   ├── navigation/   # Navigation components
│   │   └── ui/          # UI primitives
│   └── styles/           # Global styles and tokens
├── prisma/                # Database schema and migrations
├── tests/                 # Playwright E2E tests
├── public/               # Static assets
└── docs/                 # Additional documentation
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test file
npm run test tests/dashboard.spec.ts
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Performance Targets

- **Page Load**: < 1.5 seconds
- **API Response**: < 50ms
- **Lighthouse Score**: 95+ (all categories)
- **Accessibility**: WCAG 2.1 AA compliant

## 🔒 Security

CaseOS™ takes security seriously:

- End-to-end encryption for sensitive data
- Regular security audits
- GDPR/CCPA compliant
- SOC 2 Type II certification (in progress)

See [SECURITY.md](SECURITY.md) for more details.

## 📚 Documentation

### Core Documentation
- [Development Plan](PLAN.md) - **START HERE** - Design excellence roadmap
- [Design Excellence](DESIGN_EXCELLENCE.md) - Comprehensive design patterns & implementation
- [Testing Guide](TESTING_GUIDE.md) - **MANDATORY** testing requirements
- [API Architecture](API_ARCHITECTURE.md) - Detailed API specifications
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Backend setup guide
- [Claude Integration](CLAUDE.md) - AI assistant guidelines

### Development Requirements
- **Every feature needs tests** (>90% coverage)
- **Every commit needs Docker** (consistency)
- **Every push needs deployment verification** (Vercel)
- **Every animation needs 60fps** (performance)

## 🌟 Why CaseOS™?

Traditional legal services are:
- **Expensive**: Average attorney costs $200-500/hour
- **Inaccessible**: Many areas lack adequate legal representation
- **Intimidating**: Complex jargon and procedures

CaseOS™ changes this by:
- **Democratizing Access**: AI-powered assistance at a fraction of the cost
- **Simplifying Complexity**: Plain language explanations and guided workflows
- **Empowering Users**: Knowledge and tools to advocate for themselves

## 📈 Roadmap

See our [Development Plan](PLAN.md) for detailed milestones.

### Upcoming Features
- [ ] Mobile applications (iOS/Android)
- [ ] Multi-language support
- [ ] Video consultations with attorneys
- [ ] Blockchain evidence verification
- [ ] Community legal resource sharing

## 🙏 Acknowledgments

- Linear.app for design inspiration
- The open-source community
- Legal aid organizations providing feedback
- Self-represented litigants sharing their experiences

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- Documentation: [docs.caseos.ai](https://docs.caseos.ai)
- Community: [community.caseos.ai](https://community.caseos.ai)
- Email: support@caseos.ai

---

<div align="center">
  <strong>Built with ❤️ for those seeking justice</strong>
  <br>
  <sub>Remember: CaseOS™ provides legal information, not legal advice. Always consult with a qualified attorney for specific legal matters.</sub>
</div>
