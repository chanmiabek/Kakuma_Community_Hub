'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Search, MapPin, Briefcase, Loader2 } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  description: string
  type: string
  location: string | null
  organization: string | null
  tags: string[]
  deadline: string | null
  createdAt: string
  _count: {
    applications: number
  }
}

function OpportunitiesContent() {
  const searchParams = useSearchParams()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [type, setType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (type) params.append('type', type)

        const response = await fetch(`/api/opportunities?${params}`)
        const data = await response.json()
        setOpportunities(data.data || [])
      } catch (error) {
        console.error('Error fetching opportunities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [search, type])

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
        <p className="text-muted-foreground">
          Discover jobs, education, and volunteer opportunities in your community.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="JOB">Jobs</option>
          <option value="EDUCATION">Education</option>
          <option value="VOLUNTEER">Volunteer</option>
          <option value="TRAINING">Training</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="SCHOLARSHIP">Scholarship</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : opportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{opportunity.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(opportunity.createdAt)}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{opportunity.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {opportunity.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {opportunity.organization && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.organization}</span>
                    </div>
                  )}
                  {opportunity.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{opportunity.location}</span>
                    </div>
                  )}
                  {opportunity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {opportunity.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {opportunity._count.applications} applications
                </span>
                <Link href={`/opportunities/${opportunity.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-muted-foreground mb-4">
            No opportunities found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch('')
              setType('')
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="container py-24 text-center">Loading opportunities...</div>}>
      <OpportunitiesContent />
    </Suspense>
  )
}
