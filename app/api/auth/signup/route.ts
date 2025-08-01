/*
 * ███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗      █████╗ ██████╗ ██╗
 * ██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗    ██╔══██╗██╔══██╗██║
 * ███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝    ███████║██████╔╝██║
 * ╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝     ██╔══██║██╔═══╝ ██║
 * ███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║         ██║  ██║██║     ██║
 * ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝         ╚═╝  ╚═╝╚═╝     ╚═╝
 * Sign Up API Route - CaseOS Legal AI Platform
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Validation schema for signup
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validationResult = signupSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password, name } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          message: 'User already exists',
          errors: { email: ['An account with this email already exists'] },
        },
        { status: 409 }
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        userType: 'SELF_REPRESENTED',
        privacyConsent: true,
        consentTimestamp: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        createdAt: true,
      },
    })

    // Log successful signup (temporarily disabled for debugging)
    // await prisma.auditLog.create({
    //   data: {
    //     action: 'USER_SIGNUP',
    //     resource: 'User',
    //     resourceId: user.id,
    //     userId: user.id,
    //     metadata: {
    //       email: user.email,
    //       userType: user.userType,
    //     },
    //     severity: 'INFO',
    //   },
    // })

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)

    // Check for specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('P2002')) {
        return NextResponse.json(
          {
            message: 'User already exists',
            errors: { email: ['An account with this email already exists'] },
          },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      {
        message: 'Failed to create account',
        errors: { general: ['An unexpected error occurred. Please try again.'] },
      },
      { status: 500 }
    )
  }
}