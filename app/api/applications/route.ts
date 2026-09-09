import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const applicationSchema = z.object({
  opportunityId: z.string(),
  coverLetter: z.string().optional(),
  resume: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            organization: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ data: applications })
  } catch (error) {
    console.error('Error fetching applications:', error)
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

    const body = await req.json()
    const validatedData = applicationSchema.parse(body)

    // Check if opportunity exists and is active
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: validatedData.opportunityId },
    })

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      )
    }

    if (opportunity.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Opportunity is not active' },
        { status: 400 }
      )
    }

    // Check if user already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        opportunityId_userId: {
          opportunityId: validatedData.opportunityId,
          userId: session.user.id,
        },
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied to this opportunity' },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        opportunityId: validatedData.opportunityId,
        userId: session.user.id,
        coverLetter: validatedData.coverLetter,
        resume: validatedData.resume,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { data: application, message: 'Application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}