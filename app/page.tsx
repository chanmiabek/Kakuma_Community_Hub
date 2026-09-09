import Link from 'next/link'
import { ArrowRight, Globe2, MapPin, Sparkles } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Features } from '@/components/Landing/features'
import { OpportunityPreview } from '@/components/Landing/opportunity-preview'
import { CTA } from '@/components/Landing/cta'

type HeroProps = {
  stats: {
    users: number
    opportunities: number
    applications: number
  }
}

function Hero({ stats }: HeroProps) {
  const highlights = [
    ['Community members', stats.users],
    ['Opportunities', stats.opportunities],
    ['Applications', stats.applications],
  ] as const

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary/[0.07] via-white to-amber-50/70">
      <div className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="container grid gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3.5 py-2 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Built for the Kakuma community</span>
          </div>
          <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            Opportunity starts with <span className="text-primary">connection.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Discover opportunities, connect with your community, and build a brighter future together.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/opportunities">
              <Button size="lg" className="h-12 w-full rounded-xl px-6 shadow-lg shadow-primary/20 sm:w-auto">
                Explore opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-12 w-full rounded-xl border-slate-300 bg-white/70 px-6 sm:w-auto">
                Join KakumaHub
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Connecting Kakuma and the world</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-7 shadow-2xl shadow-slate-900/20">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/30 blur-2xl" />
            <div className="relative">
              <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Globe2 className="h-5 w-5 text-emerald-300" />
                  KakumaHub
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Community first</span>
              </div>
              <p className="max-w-[15rem] text-2xl font-semibold leading-tight text-white">Find your next step.</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">Jobs, learning, volunteering, and people ready to help you grow.</p>
              <div className="mt-9 grid grid-cols-3 gap-2">
                {[
                  ['Jobs', '01'],
                  ['Learn', '02'],
                  ['Connect', '03'],
                ].map(([label, number]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs text-slate-500">{number}</div>
                    <div className="mt-5 text-sm font-medium text-white">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative -mb-8 grid grid-cols-1 gap-3 pb-8 sm:grid-cols-3">
        {highlights.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur">
            <div className="text-3xl font-bold tracking-tight text-slate-950">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function HomePage() {
  try {
    const [opportunities, users, opportunityCount, applications] = await Promise.all([
      prisma.opportunity.findMany({
        where: { status: 'ACTIVE' },
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
      prisma.opportunity.count(),
      prisma.application.count(),
    ])

    return (
      <>
        <Hero stats={{ users, opportunities: opportunityCount, applications }} />
        <Features />
        <OpportunityPreview opportunities={opportunities} />
        <CTA />
      </>
    )
  } catch (error) {
    console.error('Unable to load community data:', error)

    return (
      <>
        <Hero stats={{ users: 0, opportunities: 0, applications: 0 }} />
        <Features />
        <OpportunityPreview opportunities={[]} />
        <CTA />
      </>
    )
  }
}
