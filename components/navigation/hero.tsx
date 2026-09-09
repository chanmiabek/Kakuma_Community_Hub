import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Briefcase, FileText } from 'lucide-react'

interface HeroProps {
  stats: {
    users: number
    opportunities: number
    applications: number
  }
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background">
      <div className="container py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Building a{' '}
            <span className="text-primary">Stronger Community</span>{' '}
            Through Opportunities
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Discover jobs, education, and volunteer opportunities in the Kakuma
            refugee camp. Connect with community members and build your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Join Community
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.users}</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.opportunities}</div>
                <div className="text-sm text-muted-foreground">Opportunities</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.applications}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}