import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

type DashboardApplication = {
  id: string
  createdAt: Date
  opportunity: {
    title: string
    organization: string
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Fetch user's statistics
  const [applications, activeOpportunities, totalOpportunities, userPosts] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            organization: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.opportunity.count({
      where: { status: 'ACTIVE' },
    }),
    prisma.opportunity.count(),
    prisma.post.count({
      where: { authorId: session.user.id },
    }),
  ])

  const stats = [
    {
      title: 'Active Opportunities',
      value: activeOpportunities,
      icon: Briefcase,
      href: '/opportunities',
    },
    {
      title: 'My Applications',
      value: applications.length,
      icon: FileText,
      href: '/applications',
    },
    {
      title: 'Total Opportunities',
      value: totalOpportunities,
      icon: TrendingUp,
      href: '/opportunities',
    },
    {
      title: 'My Posts',
      value: userPosts,
      icon: Users,
      href: '/posts',
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name}!</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening in your community.
          </p>
        </div>
        <Link href="/opportunities/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post Opportunity
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest opportunity applications</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application: DashboardApplication) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{application.opportunity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.opportunity.organization}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(application.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You have not applied to any opportunities yet.
                </p>
                <Link href="/opportunities">
                  <Button variant="outline">
                    Browse Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/opportunities" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Opportunities
                </Button>
              </Link>
              <Link href="/profile" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
              <Link href="/posts/create" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}