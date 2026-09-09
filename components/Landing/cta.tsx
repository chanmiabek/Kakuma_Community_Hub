import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-12 lg:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-slate-950/10 blur-2xl" />
          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">Your next chapter starts here</p>
            <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Join hundreds of community members who are already using KakumaHub to find opportunities and build their future.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full rounded-xl px-6 sm:w-auto">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full rounded-xl border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
