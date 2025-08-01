/*
 * ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗ 
 * ██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝ 
 * ██║  ██║█████╗  ██████╔╝██║   ██║██║  ███╗
 * ██║  ██║██╔══╝  ██╔══██╗██║   ██║██║   ██║
 * ██████╔╝███████╗██████╔╝╚██████╔╝╚██████╔╝
 * ╚═════╝ ╚══════╝╚═════╝  ╚═════╝  ╚═════╝ 
 * Debug User API - Check Session Data
 */

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        createdAt: true,
      }
    })
    
    return NextResponse.json({
      session: {
        user: session.user,
      },
      database: user,
    })
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}