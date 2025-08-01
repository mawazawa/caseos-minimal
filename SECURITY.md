# Security Policy

## 🔒 CaseOS™ Security Standards

CaseOS™ handles sensitive legal information for self-represented litigants. We maintain enterprise-grade security standards to protect our users' data and maintain their trust.

## 🚨 Reporting Security Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

Please report security issues to: security@caseos.ai

### What to Include
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We commit to:
- Acknowledge receipt within 24 hours
- Provide updates within 72 hours
- Credit researchers (unless anonymity requested)

## 🛡️ Security Architecture

### Data Classification

| Classification | Description | Protection Level |
|---------------|-------------|------------------|
| **Critical** | SSN, financial records, medical info | AES-256 encryption at rest & transit |
| **Sensitive** | Case details, legal documents | Encrypted, access controlled |
| **Internal** | User preferences, settings | Standard database security |
| **Public** | Published case law, templates | No special protection required |

### Authentication & Authorization

#### Multi-Factor Authentication
- **Required for**: All user accounts
- **Methods**: TOTP, SMS (deprecated), WebAuthn
- **Implementation**: NextAuth.js v5 with secure session management

#### Role-Based Access Control (RBAC)
```typescript
enum UserRole {
  SELF_REPRESENTED,  // Default user type
  ATTORNEY,          // Verified legal professionals
  PARALEGAL,         // Support staff
  ADMIN,             // System administrators
}
```

#### Session Management
- Database sessions (not JWT) for revocation capability
- 30-day maximum session lifetime
- Automatic logout after 4 hours of inactivity
- Session invalidation on password change

### Data Protection

#### Encryption Standards
- **At Rest**: AES-256-GCM for all sensitive data
- **In Transit**: TLS 1.3 minimum, HSTS enabled
- **Key Management**: Separate keys per data classification
- **Key Rotation**: Automatic 90-day rotation

#### Database Security
```sql
-- Row Level Security (RLS) enabled on all tables
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own cases" ON legal_cases
  FOR SELECT USING (user_id = auth.uid());
```

#### File Storage Security
- Cloudflare R2 with server-side encryption
- Signed URLs with 1-hour expiration
- Virus scanning on upload
- File type validation and sanitization

### API Security

#### Rate Limiting
```typescript
// Per endpoint limits
const rateLimits = {
  auth: "5 requests per 15 minutes",
  api: "100 requests per minute",
  ai: "20 requests per hour",
  upload: "10 files per hour"
}
```

#### Input Validation
- Zod schemas for all API inputs
- SQL injection prevention via Prisma
- XSS protection headers
- CSRF tokens for state-changing operations

#### API Authentication
```typescript
// All API routes require authentication
export async function middleware(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
```

### Infrastructure Security

#### Deployment Security
- Vercel deployment with automatic HTTPS
- Environment variables encrypted at rest
- Separate environments (dev, staging, prod)
- Infrastructure as Code (IaC) for consistency

#### Monitoring & Logging
- Sentry for error tracking (PII scrubbed)
- Audit logs for all data access
- Security event monitoring
- Automated vulnerability scanning

### Compliance Standards

#### GDPR Compliance
- Right to erasure (soft deletes with purge)
- Data portability (export functionality)
- Privacy by design
- Consent management

#### CCPA Compliance
- Do Not Sell provisions
- Data disclosure requirements
- Deletion rights
- Opt-out mechanisms

#### Legal Industry Standards
- Attorney-client privilege protections
- Court filing integrity checks
- Chain of custody for evidence
- Litigation hold capabilities

## 🔐 Security Best Practices

### For Developers

1. **Never Commit Secrets**
   ```bash
   # Use git-secrets to prevent accidental commits
   brew install git-secrets
   git secrets --install
   git secrets --register-aws
   ```

2. **Dependency Security**
   ```bash
   # Regular security audits
   npm audit
   npm audit fix
   
   # Keep dependencies updated
   npx npm-check-updates -u
   ```

3. **Code Security**
   - Use parameterized queries (Prisma handles this)
   - Validate all inputs with Zod
   - Sanitize user-generated content
   - Use Content Security Policy headers

4. **Testing Security**
   ```typescript
   // Security-focused tests
   test("prevents SQL injection", async () => {
     const maliciousInput = "'; DROP TABLE users; --"
     const result = await searchCases(maliciousInput)
     expect(result).not.toContain("error")
   })
   ```

### Security Headers
```typescript
// next.config.ts security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]
```

## 🚀 Incident Response Plan

### Severity Levels

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| **P0** | Critical - Data breach | < 1 hour | User data exposed |
| **P1** | High - Service compromise | < 4 hours | Authentication bypass |
| **P2** | Medium - Limited impact | < 24 hours | XSS vulnerability |
| **P3** | Low - Minimal impact | < 72 hours | Information disclosure |

### Response Procedures

1. **Detection & Analysis**
   - Automated monitoring alerts
   - User reports to security@caseos.ai
   - Regular security audits

2. **Containment**
   - Isolate affected systems
   - Revoke compromised credentials
   - Enable emergency maintenance mode

3. **Eradication & Recovery**
   - Patch vulnerabilities
   - Restore from clean backups
   - Verify system integrity

4. **Post-Incident**
   - User notification (if required)
   - Regulatory reporting
   - Lessons learned documentation

## 📋 Security Checklist

### Pre-Deployment
- [ ] All dependencies updated and audited
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Database migrations reviewed
- [ ] API rate limiting enabled
- [ ] Input validation complete
- [ ] Authentication required on all routes
- [ ] Encryption keys rotated

### Post-Deployment
- [ ] SSL certificate valid
- [ ] Security monitoring active
- [ ] Backup systems verified
- [ ] Incident response team notified
- [ ] Penetration testing scheduled

## 🔍 Regular Security Activities

### Daily
- Monitor security alerts
- Review authentication logs
- Check for failed login attempts

### Weekly
- Dependency vulnerability scan
- Review access logs
- Update security patches

### Monthly
- Full security audit
- Penetration testing
- Security training update
- Key rotation verification

### Quarterly
- Third-party security assessment
- Compliance review
- Disaster recovery drill
- Security policy updates

## 📞 Security Contacts

- **Security Team**: security@caseos.ai
- **Emergency**: security-urgent@caseos.ai
- **Bug Bounty**: bounty@caseos.ai

## 🏆 Acknowledgments

We thank the security researchers who have helped improve CaseOS™:

- [Security Hall of Fame](https://caseos.ai/security/hall-of-fame)

---

**Remember**: Security is everyone's responsibility. When in doubt, ask the security team.