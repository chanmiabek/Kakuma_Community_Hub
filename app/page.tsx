import Link from "next/link";
import {
  ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, GraduationCap,
  HeartHandshake, MapPin, Search, Sparkles, Store, Users, Building2
} from "lucide-react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeDataSections } from "@/components/home/data-sections";

const destinations = [
  { href: "/opportunities", icon: BriefcaseBusiness, title: "Jobs & opportunities", text: "Find work, internships and ways to grow.", tone: "green" },
  { href: "/opportunities?type=TRAINING", icon: GraduationCap, title: "Learning & training", text: "Build practical skills for your next step.", tone: "gold" },
  { href: "/opportunities?type=SCHOLARSHIP", icon: GraduationCap, title: "Scholarships", text: "Discover support for your education.", tone: "blue" },
  { href: "/services", icon: HeartHandshake, title: "Community services", text: "Find useful local and support services.", tone: "rose" },
  { href: "/businesses", icon: Store, title: "Local businesses", text: "Explore products and services nearby.", tone: "purple" },
  { href: "/events", icon: CalendarDays, title: "Events & activities", text: "Connect with people and community events.", tone: "teal" },
];

const steps = [
  { number: "01", title: "Create your profile", text: "Share your interests, skills and goals." },
  { number: "02", title: "Explore what fits", text: "Search opportunities, services and local resources." },
  { number: "03", title: "Connect and grow", text: "Save useful listings and take your next step." },
];

export default function HomePage() {
  const dataSections = (
    <Suspense fallback={<div className="container space-y-5 py-12" aria-label="Loading community listings"><div className="h-28 animate-pulse rounded-2xl bg-muted" /><div className="h-56 animate-pulse rounded-2xl bg-muted" /></div>}>
      <HomeDataSections />
    </Suspense>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-20 bg-[#f0f6ef]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,rgba(242,190,88,.22),transparent_38%),radial-gradient(ellipse_at_90%_30%,rgba(33,123,96,.16),transparent_36%)]" />
          <div className="container grid min-h-[570px] items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-2xl">
              <span className="eyebrow"><Sparkles className="h-4 w-4" /> Built for community. Designed for opportunity.</span>
              <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight text-[#103f34] sm:text-6xl lg:text-7xl">
                Your next opportunity <span className="text-[#19765b]">starts here.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                One trusted place to discover jobs, learning, scholarships, local businesses and community services in Kakuma and beyond.
              </p>
              <form action="/opportunities" role="search" className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white bg-white p-2 shadow-[0_18px_55px_-28px_rgba(16,63,52,.45)] focus-within:ring-2 focus-within:ring-[#19765b]">
                <Search aria-hidden="true" className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
                <label className="sr-only" htmlFor="community-search">Search opportunities</label>
                <input id="community-search" name="q" placeholder="Search jobs, training, services..." className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                <button className="rounded-xl bg-[#145c47] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d4938] focus-visible:outline-offset-4">Search</button>
              </form>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#19765b]" /> Community-focused</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#19765b]" /> Kakuma and beyond</span>
                <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[#19765b]" /> Made to connect people</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#f3c86b]/60 blur-2xl" />
              <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-[#5da98a]/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-2xl">
                <img src="/images/1000262382.jpg" alt="Community members building skills and learning together" className="h-[330px] w-full object-cover sm:h-[430px]" fetchPriority="high" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e3f2e9] text-[#145c47]"><HeartHandshake className="h-5 w-5" /></span>
                    <div className="min-w-0"><p className="font-bold text-slate-900">A stronger community starts with connection</p><p className="mt-1 text-sm text-slate-600">Discover resources. Meet opportunities. Move forward.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container relative z-10 -mt-2 pb-10 pt-8 sm:pt-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Explore the hub</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">What are you looking for?</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Start with a category and find the information or support that helps you take the next step.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map(({ href, icon: Icon, title, text, tone }) => (
              <Link key={title} href={href} className="group surface soft-shadow flex min-h-40 items-start gap-4 p-5 transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone === "green" ? "bg-emerald-100 text-emerald-800" : tone === "gold" ? "bg-amber-100 text-amber-800" : tone === "blue" ? "bg-sky-100 text-sky-800" : tone === "rose" ? "bg-rose-100 text-rose-800" : tone === "purple" ? "bg-violet-100 text-violet-800" : "bg-teal-100 text-teal-800"}`}><Icon className="h-6 w-6" /></span>
                <span className="min-w-0 flex-1"><span className="block text-lg font-bold">{title}</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span><span className="mt-3 inline-flex items-center text-sm font-bold text-primary">Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></span></span>
              </Link>
            ))}
          </div>
        </section>

        {dataSections}

        <section className="container py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#103f34] px-6 py-9 text-white sm:px-10 sm:py-12">
            <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-100"><Sparkles className="h-4 w-4" /> Personalised discovery</span><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Find opportunities that fit your goals.</h2><p className="mt-3 max-w-xl leading-7 text-emerald-50/80">Explore AI-assisted recommendations to help you discover relevant opportunities, services and resources. Always review listing details before applying.</p></div>
              <Link href="/ai" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#f4c766] px-5 py-3.5 font-bold text-[#193c31] transition hover:bg-[#ffda85]">Explore recommendations <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="rounded-[2rem] border bg-card px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Getting started</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">A few steps can open new doors.</h2><p className="mt-3 leading-7 text-muted-foreground">A simple path from finding information to taking action.</p></div>
            <div className="mt-9 grid gap-8 md:grid-cols-3">
              {steps.map((step) => <div key={step.number} className="relative text-center md:px-5"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-lg font-black text-primary">{step.number}</span><h3 className="mt-4 text-lg font-bold">{step.title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.text}</p></div>)}
            </div>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 border-t pt-7 sm:flex-row"><Link href="/(auth)/register" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:opacity-90">Join the community <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/about" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-bold transition hover:bg-secondary">Learn about the hub</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
