# CaseOS™ API Architecture Specification

## Table of Contents
1. [API Design Philosophy](#api-design-philosophy)
2. [Next.js App Router API Structure](#nextjs-app-router-api-structure)  
3. [Authentication & Authorization](#authentication--authorization)
4. [Core API Endpoints](#core-api-endpoints)
5. [Real-time Features](#real-time-features)
6. [File Upload & Management](#file-upload--management)
7. [AI Integration](#ai-integration)
8. [Security & Compliance](#security--compliance)
9. [Performance & Caching](#performance--caching)
10. [Error Handling](#error-handling)

## API Design Philosophy

### RESTful + tRPC Hybrid Approach
- **REST** for standard CRUD operations and public endpoints
- **tRPC** for type-safe internal API calls and real-time features
- **GraphQL** consideration for complex legal data relationships (future)

### Design Principles
1. **Legal-First**: Every endpoint considers legal compliance and data sensitivity
2. **Type Safety**: End-to-end TypeScript with runtime validation
3. **Performance**: Sub-50ms response times for core operations
4. **Security**: Zero-trust architecture with comprehensive audit logging
5. **User-Centric**: Self-represented litigant experience prioritized

## Next.js App Router API Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts          # NextAuth.js handlers
│   │   ├── register/route.ts               # User registration
│   │   ├── verify-email/route.ts           # Email verification
│   │   └── two-factor/route.ts             # 2FA endpoints
│   ├── legal/
│   │   ├── cases/
│   │   │   ├── route.ts                    # GET /api/legal/cases
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts                # GET/PUT/DELETE /api/legal/cases/[id]
│   │   │   │   ├── documents/route.ts      # Case documents
│   │   │   │   ├── deadlines/route.ts      # Case deadlines
│   │   │   │   ├── events/route.ts         # Case events
│   │   │   │   └── ai-summary/route.ts     # AI case analysis
│   │   │   └── templates/route.ts          # Case templates
│   │   ├── documents/
│   │   │   ├── route.ts                    # Document CRUD
│   │   │   ├── [id]/route.ts               # Document details
│   │   │   ├── upload/route.ts             # File upload
│   │   │   ├── preview/route.ts            # Document preview
│   │   │   └── ocr/route.ts                # OCR processing
│   │   └── jurisdictions/
│   │       ├── route.ts                    # Available jurisdictions
│   │       └── [state]/courts/route.ts     # Courts by state
│   ├── ai/
│   │   ├── chat/
│   │   │   ├── route.ts                    # Chat management
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts                # Chat details
│   │   │   │   ├── messages/route.ts       # Chat messages
│   │   │   │   └── stream/route.ts         # Streaming responses
│   │   │   └── suggest/route.ts            # AI suggestions
│   │   ├── analyze/
│   │   │   ├── document/route.ts           # Document analysis
│   │   │   ├── case/route.ts               # Case analysis
│   │   │   └── legal-research/route.ts     # Legal research
│   │   └── generate/
│   │       ├── summary/route.ts            # Generate summaries
│   │       ├── forms/route.ts              # Generate legal forms
│   │       └── correspondence/route.ts     # Generate letters
│   ├── admin/
│   │   ├── users/route.ts                  # User management
│   │   ├── organizations/route.ts          # Organization management
│   │   ├── audit/route.ts                  # Audit logs
│   │   └── system/route.ts                 # System health
│   ├── webhooks/
│   │   ├── stripe/route.ts                 # Payment webhooks
│   │   ├── storage/route.ts                # Storage webhooks
│   │   └── ai-processing/route.ts          # AI processing webhooks
│   └── health/route.ts                     # Health check
├── trpc/
│   ├── client.ts                          # tRPC client setup
│   ├── server.ts                          # tRPC server setup
│   └── routers/
│       ├── auth.ts                        # Auth procedures
│       ├── legal.ts                       # Legal procedures
│       ├── ai.ts                          # AI procedures
│       └── admin.ts                       # Admin procedures
└── globals.css
```

## Authentication & Authorization

### NextAuth.js Configuration

```typescript
// app/lib/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  providers: [
    // Email/Password with enhanced security
    Credentials({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implementation with password hashing, rate limiting, etc.
      }
    }),
    // OAuth providers for ease of use
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Professional verification
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Enhanced session with legal permissions
      if (session.user) {
        session.user.id = user.id
        session.user.userType = user.userType
        session.user.organizationId = user.organizationId
        session.user.permissions = await getUserPermissions(user.id)
      }
      return session
    },
    async jwt({ token, user, account }) {
      // JWT enhancements for legal compliance
      if (user) {
        token.userType = user.userType
        token.lastLogin = new Date()
      }
      return token
    }
  },
  events: {
    async signIn({ user, account, profile }) {
      // Audit logging for legal compliance
      await auditLog({
        action: 'USER_SIGNIN',
        userId: user.id,
        metadata: { account: account?.provider }
      })
    }
  }
})
```

### Role-Based Access Control (RBAC)

```typescript
// app/lib/permissions.ts
export enum Permission {
  // Case permissions
  CASE_CREATE = 'case:create',
  CASE_READ = 'case:read',
  CASE_UPDATE = 'case:update',
  CASE_DELETE = 'case:delete',
  
  // Document permissions
  DOCUMENT_UPLOAD = 'document:upload',
  DOCUMENT_READ = 'document:read',
  DOCUMENT_SHARE = 'document:share',
  
  // AI permissions
  AI_CHAT = 'ai:chat',
  AI_ANALYZE = 'ai:analyze',
  AI_GENERATE = 'ai:generate',
  
  // Admin permissions
  ADMIN_USERS = 'admin:users',
  ADMIN_AUDIT = 'admin:audit',
  ADMIN_SYSTEM = 'admin:system'
}

export const rolePermissions = {
  SELF_REPRESENTED: [
    Permission.CASE_CREATE,
    Permission.CASE_READ,
    Permission.CASE_UPDATE,
    Permission.DOCUMENT_UPLOAD,
    Permission.DOCUMENT_READ,
    Permission.AI_CHAT,
    Permission.AI_ANALYZE
  ],
  ATTORNEY: [
    ...rolePermissions.SELF_REPRESENTED,
    Permission.CASE_DELETE,
    Permission.DOCUMENT_SHARE,
    Permission.AI_GENERATE
  ],
  ADMIN: [
    ...Object.values(Permission)
  ]
}
```

## Core API Endpoints

### Legal Cases API

```typescript
// app/api/legal/cases/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateCaseSchema, UpdateCaseSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const status = searchParams.get('status')
  const caseType = searchParams.get('caseType')

  try {
    const cases = await prisma.legalCase.findMany({
      where: {
        userId: session.user.id,
        ...(status && { status: status as CaseStatus }),
        ...(caseType && { caseType: caseType as CaseType }),
        deletedAt: null
      },
      include: {
        documents: {
          select: { id: true, title: true, documentType: true, createdAt: true }
        },
        deadlines: {
          where: { status: 'PENDING' },
          orderBy: { dueDate: 'asc' },
          take: 3
        },
        _count: {
          select: { documents: true, deadlines: true, events: true }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.legalCase.count({
      where: {
        userId: session.user.id,
        ...(status && { status: status as CaseStatus }),
        ...(caseType && { caseType: caseType as CaseType }),
        deletedAt: null
      }
    })

    return NextResponse.json({
      cases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = CreateCaseSchema.parse(body)

    const caseNumber = await generateInternalCaseNumber()
    
    const legalCase = await prisma.legalCase.create({
      data: {
        ...validatedData,
        internalNumber: caseNumber,
        userId: session.user.id,
        status: 'DRAFT'
      },
      include: {
        documents: true,
        deadlines: true
      }
    })

    // Audit log
    await auditLog({
      action: 'CASE_CREATED',
      resourceId: legalCase.id,
      userId: session.user.id,
      metadata: { caseType: legalCase.caseType }
    })

    return NextResponse.json(legalCase, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors }, 
        { status: 400 }
      )
    }
    
    console.error('Error creating case:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
```

### Document Management API

```typescript
// app/api/legal/documents/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadToStorage } from '@/lib/storage'
import { processDocument } from '@/lib/document-processor'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const legalCaseId = formData.get('legalCaseId') as string
    const documentType = formData.get('documentType') as string
    const isConfidential = formData.get('isConfidential') === 'true'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Generate file hash for integrity
    const buffer = await file.arrayBuffer()
    const fileHash = await generateFileHash(buffer)

    // Upload to secure storage
    const { url, path } = await uploadToStorage(file, {
      folder: `legal-documents/${session.user.id}`,
      encryption: isConfidential
    })

    // Create database record
    const document = await prisma.document.create({
      data: {
        title: file.name,
        filename: `${fileHash}-${file.name}`,
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileHash,
        storageProvider: 'CLOUDFLARE_R2',
        storagePath: path,
        storageUrl: url,
        documentType: documentType as DocumentType,
        isConfidential,
        userId: session.user.id,
        legalCaseId: legalCaseId || null,
        processingStatus: 'PENDING'
      }
    })

    // Queue for background processing (OCR, AI analysis)
    await queueDocumentProcessing(document.id)

    return NextResponse.json({
      id: document.id,
      title: document.title,
      documentType: document.documentType,
      processingStatus: document.processingStatus,
      createdAt: document.createdAt
    }, { status: 201 })

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' }, 
      { status: 500 }
    )
  }
}
```

### AI Integration API

```typescript
// app/api/ai/chat/[id]/stream/route.ts
import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { message, context } = await request.json()

  try {
    const chat = await prisma.aiChat.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 50 // Last 50 messages for context
        },
        legalCase: {
          include: {
            documents: {
              where: { processingStatus: 'COMPLETED' },
              select: { id: true, title: true, aiSummary: true }
            }
          }
        }
      }
    })

    if (!chat) {
      return new Response('Chat not found', { status: 404 })
    }

    // Build context for AI
    const systemPrompt = buildLegalSystemPrompt(chat.legalCase, context)
    const conversationHistory = chat.messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }))

    // Stream AI response
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: message }
      ],
      stream: true,
      temperature: 0.1, // Lower temperature for legal accuracy
      max_tokens: 2000
    })

    // Save user message
    await prisma.aiMessage.create({
      data: {
        content: message,
        role: 'USER',
        chatId: chat.id
      }
    })

    let assistantMessage = ''
    
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            assistantMessage += content
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              content,
              type: 'chunk'
            })}\n\n`))
          }

          // Save complete assistant message
          await prisma.aiMessage.create({
            data: {
              content: assistantMessage,
              role: 'ASSISTANT',
              chatId: chat.id,
              tokenCount: estimateTokenCount(assistantMessage)
            }
          })

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'complete',
            messageId: 'saved'
          })}\n\n`))

          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      }
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error) {
    console.error('AI chat error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
```

## Real-time Features

### WebSocket Implementation

```typescript
// app/lib/websocket.ts
import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { auth } from '@/lib/auth'

export class WebSocketManager {
  private io: SocketIOServer

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL,
        credentials: true
      }
    })

    this.setupAuthentication()
    this.setupHandlers()
  }

  private async setupAuthentication() {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token
        const session = await validateSession(token)
        
        if (session?.user) {
          socket.userId = session.user.id
          next()
        } else {
          next(new Error('Authentication error'))
        }
      } catch (error) {
        next(new Error('Authentication error'))
      }
    })
  }

  private setupHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User ${socket.userId} connected`)

      // Join user-specific room
      socket.join(`user:${socket.userId}`)

      // Case-specific subscriptions
      socket.on('subscribe:case', (caseId) => {
        socket.join(`case:${caseId}`)
      })

      socket.on('unsubscribe:case', (caseId) => {
        socket.leave(`case:${caseId}`)
      })

      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`)
      })
    })
  }

  // Send real-time updates
  public notifyDeadlineReminder(userId: string, deadline: any) {
    this.io.to(`user:${userId}`).emit('deadline:reminder', deadline)
  }

  public notifyDocumentProcessed(userId: string, document: any) {
    this.io.to(`user:${userId}`).emit('document:processed', document)
  }

  public notifyCaseUpdate(caseId: string, update: any) {
    this.io.to(`case:${caseId}`).emit('case:updated', update)
  }
}
```

## Security & Compliance

### Data Encryption

```typescript
// app/lib/encryption.ts
import crypto from 'crypto'

export class EncryptionService {
  private algorithm = 'aes-256-gcm'
  private keyLength = 32
  private ivLength = 16
  private tagLength = 16

  private getKey(): Buffer {
    return crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', this.keyLength)
  }

  public encrypt(text: string): string {
    const iv = crypto.randomBytes(this.ivLength)
    const cipher = crypto.createCipher(this.algorithm, this.getKey())
    cipher.setAAD(Buffer.from('CaseOS-Legal-Data'))

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`
  }

  public decrypt(encryptedData: string): string {
    const [ivHex, tagHex, encrypted] = encryptedData.split(':')
    
    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')
    
    const decipher = crypto.createDecipher(this.algorithm, this.getKey())
    decipher.setAAD(Buffer.from('CaseOS-Legal-Data'))
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }
}
```

### Rate Limiting

```typescript
// app/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Different limits for different operations
export const rateLimits = {
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 attempts per 15 minutes
    analytics: true,
  }),
  
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
    analytics: true,
  }),
  
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 h"), // 20 AI requests per hour
    analytics: true,
  }),
  
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 uploads per hour
    analytics: true,
  })
}

export async function checkRateLimit(
  type: keyof typeof rateLimits,
  identifier: string
) {
  const { success, limit, reset, remaining } = await rateLimits[type].limit(identifier)
  
  return {
    success,
    limit,
    reset,
    remaining,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString(),
    }
  }
}
```

## Performance & Caching

### Redis Caching Strategy

```typescript
// app/lib/cache.ts
import { Redis } from 'ioredis'

export class CacheService {
  private redis: Redis

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL!)
  }

  // Cache user sessions and permissions
  async cacheUserSession(userId: string, session: any, ttl = 3600) {
    await this.redis.setex(`session:${userId}`, ttl, JSON.stringify(session))
  }

  async getUserSession(userId: string) {
    const cached = await this.redis.get(`session:${userId}`)
    return cached ? JSON.parse(cached) : null
  }

  // Cache legal case data
  async cacheLegalCase(caseId: string, caseData: any, ttl = 300) {
    await this.redis.setex(`case:${caseId}`, ttl, JSON.stringify(caseData))
  }

  async getLegalCase(caseId: string) {
    const cached = await this.redis.get(`case:${caseId}`)
    return cached ? JSON.parse(cached) : null
  }

  // Cache AI responses for similar queries
  async cacheAIResponse(queryHash: string, response: any, ttl = 1800) {
    await this.redis.setex(`ai:${queryHash}`, ttl, JSON.stringify(response))
  }

  async getAIResponse(queryHash: string) {
    const cached = await this.redis.get(`ai:${queryHash}`)
    return cached ? JSON.parse(cached) : null
  }

  // Invalidate cache patterns
  async invalidatePattern(pattern: string) {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }

  // Cache legal templates and forms
  async cacheLegalTemplate(templateId: string, template: any, ttl = 86400) {
    await this.redis.setex(`template:${templateId}`, ttl, JSON.stringify(template))
  }
}
```

## Error Handling & Monitoring

### Comprehensive Error Handler

```typescript
// app/lib/error-handler.ts
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error)

  // Validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      },
      { status: 400 }
    )
  }

  // Database errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          {
            error: 'Unique constraint violation',
            field: error.meta?.target,
            code: 'DUPLICATE_ENTRY'
          },
          { status: 409 }
        )
      case 'P2025':
        return NextResponse.json(
          {
            error: 'Record not found',
            code: 'NOT_FOUND'
          },
          { status: 404 }
        )
      default:
        return NextResponse.json(
          {
            error: 'Database error',
            code: 'DATABASE_ERROR'
          },
          { status: 500 }
        )
    }
  }

  // Custom API errors
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code || 'API_ERROR'
      },
      { status: error.statusCode }
    )
  }

  // Generic server errors
  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    },
    { status: 500 }
  )
}

// Error monitoring integration
export async function logError(error: Error, context: any) {
  // Send to monitoring service (Sentry, LogRocket, etc.)
  console.error('Error logged:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  })
}
```

This comprehensive API architecture provides:
- Type-safe, scalable endpoints
- Legal-industry security standards
- Real-time features for case updates
- Comprehensive error handling
- Performance optimization through caching
- Audit logging for compliance
- AI integration for legal assistance

The architecture supports incremental development, allowing the UI and backend to be built in parallel while maintaining data consistency and security standards required for legal applications.