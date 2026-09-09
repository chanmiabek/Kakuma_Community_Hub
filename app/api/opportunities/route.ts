import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

type OpportunityType = string

function hasPermission(role: unknown, permission: string): boolean {
  if (permission !== 'create:opportunities' || typeof role !== 'string') {
    return false
  }

  return ['admin', 'organizer', 'staff'].includes(role.toLowerCase())
}

const opportunitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Type is required'),
  location: z.string().optional(),
  organization: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  deadline: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  salary: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  website: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') as OpportunityType | null
    const status = searchParams.get('status')
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const organization = searchParams.get('organization') || ''

    const where = {
      ...(type && { type }),
      ...(status && { status }),
      ...(location && { location: { contains: location, mode: 'insensitive' as const } }),
      ...(organization && { organization: { contains: organization, mode: 'insensitive' as const } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { tags: { has: search } },
        ],
      }),
    }

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.opportunity.count({ where }),
    ])

    return NextResponse.json({
      data: opportunities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching opportunities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!hasPermission(session.user.role, 'create:opportunities')) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = opportunitySchema.parse(body)

    const opportunity = await prisma.opportunity.create({
      data: {
        ...validatedData,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        createdBy: session.user.id,
      },
    })

    return NextResponse.json(
      { data: opportunity, message: 'Opportunity created successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating opportunity:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}