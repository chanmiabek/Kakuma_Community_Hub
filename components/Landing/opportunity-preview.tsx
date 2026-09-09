import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface Opportunity {
  id: string
  type: string
  createdAt: Date
  title: string
  description: string
  organization: string | null
  location: string | null
}

interface OpportunityPreviewProps {
  opportunities: Opportunity[]
}

export function OpportunityPreview({ opportunities }: OpportunityPreviewProps) {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Make your move</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Featured Opportunities</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600 sm:text-right">
            Explore the latest opportunities available in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge className="border-0 bg-primary/10 text-primary hover:bg-primary/10">{opportunity.type}</Badge>
                  <span className="text-xs text-slate-500">{formatDate(opportunity.createdAt)}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl tracking-tight text-slate-950">{opportunity.title}</CardTitle>
                <CardDescription className="line-clamp-3 leading-6 text-slate-600">{opportunity.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-700">{opportunity.organization || 'Community partner'}</div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{opportunity.location || 'Kakuma & online'}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/opportunities/${opportunity.id}`} className="w-full">
                  <Button variant="outline" className="w-full rounded-lg border-slate-200">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {opportunities.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 py-14 text-center">
            <p className="text-slate-500">No opportunities available at the moment.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/opportunities">
            <Button size="lg" className="rounded-xl px-6 shadow-sm">
              View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
