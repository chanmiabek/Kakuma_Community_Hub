import Link from "next/link";
import {
  ArrowRight, BriefcaseBusiness, Building2, CalendarDays, GraduationCap,
  HeartHandshake, Search, Sparkles, Store, Users, Globe2, ShieldCheck,
} from "lucide-react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeDataSections } from "@/components/home/data-sections";

const shortcuts = [
  { href: "/opportunities", icon: BriefcaseBusiness, title: "Jobs & Careers", text: "Find meaningful work", image: "/images/kenya-turkana-region-refugee-camp-kakuma-vocational-training-typewriter-G47N0B.jpg" },
  { href: "/opportunities?type=TRAINING", icon: GraduationCap, title: "Skills & Training", text: "Grow your skills", image: "/images/images (1).jpg" },
  { href: "/opportunities?type=SCHOLARSHIP", icon: GraduationCap, title: "Scholarships", text: "Unlock education", image: "/images/the_right_to_learn_how_aid_reclaimed_childhood_for_binta_and_Mu-azu_07-8.jpg" },
  { href: "/services", icon: HeartHandshake, title: "Community Support", text: "Find essential services", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_10.jpg" },
  { href: "/businesses", icon: Store, title: "Local Businesses", text: "Shop and connect locally", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg" },
  { href: "/events", icon: CalendarDays, title: "Events & Activities", text: "Be part of the community", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_01.jpg" },
];

const benefits = [
  { icon: Globe2, title: "One connected community", text: "Discover local services, organizations, businesses and opportunities in one place." },
  { icon: ShieldCheck, title: "Built around trust", text: "Clear organization profiles and verification pathways help people make informed choices." },
  { icon: Sparkles, title: "Personalized discovery", text: "Use smart search and recommendations to find resources that match your goals." },
];

export default function HomePage() {
  const dataSections = (
    <Suspense fallback={<div className="container space-y-6 py-12"><div className="h-28 animate-pulse rounded-2xl bg-muted" /><div className="h-56 animate-pulse rounded-2xl bg-muted" /></div>}>
      <HomeDataSections />
    </Suspense>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="hero-shell relative isolate overflow-hidden">
          <div className="hero-glow pointer-events-none absolute inset-0" />
          <div className="container relative grid items-center gap-12 py-16 md:py-20 lg:min-h-[570px] lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div className="max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-accent" /> Local knowledge. Wider opportunities.
              </p>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.04] tracking-tight text-[#123c35] sm:text-5xl md:text-6xl">
                A stronger community starts with <span className="hero-highlight">connection.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                Discover jobs, scholarships, training, trusted services and local businesses across Kakuma and beyond — all in one community hub.
              </p>
              <form action="/opportunities" className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5 focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
                <input name="q" aria-label="Search opportunities" placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 md:text-base" />
                <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-white">Search <ArrowRight className="ml-1 inline h-4 w-4" /></button>
              </form>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-primary" /> Jobs & training</span>
                <span className="inline-flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-primary" /> Community services</span>
                <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> Local organizations</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-2xl shadow-slate-900/15">
                <img src="/images/1000262382.jpg" alt="Community members learning and building skills in Kakuma" className="h-[300px] w-full object-cover sm:h-[390px]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 pt-20 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/75">Discover. Connect. Thrive.</p>
                  <p className="mt-2 max-w-sm text-xl font-bold sm:text-2xl">More access to the resources that move you forward.</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
                <span className="rounded-xl bg-amber-50 p-3 text-amber-700"><Users className="h-5 w-5" /></span>
                <span><span className="block text-sm font-bold text-slate-900">Community first</span><span className="block text-xs text-slate-500">Made for local discovery</span></span>
              </div>
            </div>
          </div>
        </section>

        <section className="container relative z-10 -mt-2 pb-12 pt-10">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Explore the hub</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">What can we help you find?</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Start with a category and discover useful resources close to your community.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map(({ href, icon: Icon, title, text, image }) => (
              <Link key={title} href={href} className="group category-card flex min-h-32 items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="mb-2 inline-flex rounded-lg bg-primary/10 p-2 text-primary"><Icon className="h-4 w-4" /></span>
                  <h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-primary">Explore <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {dataSections}

        <section className="container py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border bg-card p-6">
              <span className="inline-flex rounded-xl bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>)}
          </div>
        </section>

        <section className="container pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-[#123c35] px-6 py-10 text-white sm:px-10 md:flex md:items-center md:justify-between md:gap-8">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
            <div className="relative max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-200">A smarter way to explore</p><h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Find opportunities that fit your goals.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Explore AI-assisted recommendations and relevant resources to help plan your next step.</p></div>
            <Link href="/ai" className="relative mt-6 inline-flex shrink-0 items-center rounded-xl bg-white px-5 py-3 font-bold text-[#123c35] transition hover:bg-emerald-50 md:mt-0">Try AI assistant <Sparkles className="ml-2 h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
