"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, GraduationCap, HeartHandshake, Search, Sparkles, Store, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Suspense } from "react";
import { HomeDataSections } from "@/components/home/data-sections";
import Image from "next/image"

const shortcuts = [
  { href: "/opportunities", icon: BriefcaseBusiness, title: "Jobs", text: "Find your next opportunity", tone: "green", image: "/images/kenya-turkana-region-refugee-camp-kakuma-vocational-training-typewriter-G47N0B.jpg" },
  { href: "/opportunities?type=TRAINING", icon: GraduationCap, title: "Training", text: "Build new skills", tone: "purple", image: "/images/images (1).jpg" },
  { href: "/opportunities?type=SCHOLARSHIP", icon: GraduationCap, title: "Scholarships", text: "Fund your education", tone: "rose", image: "/images/the_right_to_learn_how_aid_reclaimed_childhood_for_binta_and_Mu-azu_07-8.jpg" },
  { href: "/services", icon: HeartHandshake, title: "Community Services", text: "Access essential support", tone: "blue", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_10.jpg" },
  { href: "/businesses", icon: Store, title: "Local Businesses", text: "Discover products & services", tone: "amber", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg" },
  { href: "/events", icon: CalendarDays, title: "Events", text: "Join community activities", tone: "mint", image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_01.jpg" },
];

export default function HomePage() {
  const dataSections = <Suspense fallback={<div className="container space-y-6 py-12"><div className="h-28 animate-pulse rounded-2xl bg-muted" /><div className="h-56 animate-pulse rounded-2xl bg-muted" /></div>}><HomeDataSections /></Suspense>;

  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="relative overflow-hidden bg-[#dff2f5]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.9),transparent_35%),linear-gradient(110deg,rgba(255,255,255,.86),rgba(223,242,245,.3))]" />
        <div className="container relative grid min-h-[480px] items-center gap-10 py-16 lg:grid-cols-[1fr_.8fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm"><Sparkles className="h-4 w-4" /> Your community, your opportunity</p>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[1.02] tracking-tight text-[#073b36] md:text-7xl">Connecting Kakuma <span className="relative whitespace-nowrap">to Opportunity<span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 rounded-full bg-accent/90" /></span></h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-slate-700">Your trusted platform for jobs, training, scholarships, businesses and community services in Kakuma and beyond.</p>
            <form action="/opportunities" className="mt-8 flex max-w-xl rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/5">
              <Search className="m-3 h-5 w-5 shrink-0 text-slate-500" /><input name="q" placeholder="Search for opportunities, services or businesses..." className="min-w-0 flex-1 bg-transparent px-2 outline-none" /><button className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90">Search</button>
            </form>
          </div>
          <div className="relative h-64 overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white/50 lg:h-[390px]">
          <Image src="/images/1000262382.jpg" alt="Community members learning digital skills in Kakuma" fill sizes="(min-width: 1024px) 40vw, 100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#073b36]/40 to-transparent" />
          </div>
        </div>
      </section>

      <section className="container relative z-10 -mt-10">
        <div className="grid overflow-hidden rounded-2xl border bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-6">
          {shortcuts.map(({ href, icon: Icon, title, text, tone, image }) => <Link key={title} href={href} className="group border-b p-5 text-center transition hover:bg-secondary/50 lg:border-b-0 lg:border-r last:border-0"><Image src={image} alt="" width={400} height={160} className="h-20 w-full object-cover" /><span className={`mx-auto -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-${tone === "green" ? "emerald" : tone}-100 text-primary`}><Icon className="h-6 w-6" /></span><h2 className="mt-3 font-bold">{title}</h2><p className="mt-1 text-xs text-muted-foreground">{text}</p></Link>)}
        </div>
      </section>

      {dataSections}

      <section className="container pb-14"><div className="mb-6"><h2 className="text-3xl font-extrabold text-[#073b36]">What you can find</h2><p className="text-muted-foreground">Everything you need to grow, learn and thrive in Kakuma</p></div><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">{shortcuts.slice(0,5).map(({ href, icon: Icon, title, text, tone, image }) => <Link href={href} key={title} className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="-mx-5 -mt-5 mb-5 h-28 overflow-hidden"><Image src={image} alt={title} width={500} height={220} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><span className="mb-8 inline-flex rounded-full bg-secondary p-3 text-primary"><Icon className="h-6 w-6" /></span><h3 className="font-bold">{title}</h3><p className="mt-2 min-h-10 text-sm text-muted-foreground">{text}</p><span className="mt-4 inline-flex items-center text-sm font-bold text-primary">Explore <ArrowRight className="ml-1 h-4 w-4" /></span></Link>)}</div></section>

      <section className="container pb-14"><div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-r from-violet-100 to-purple-50 p-7 sm:flex-row"><div className="flex items-center gap-5"><span className="rounded-full bg-white p-4 text-violet-700 shadow-sm"><Sparkles className="h-8 w-8" /></span><div><h2 className="text-2xl font-extrabold text-violet-900">AI-powered recommendations</h2><p className="text-sm text-violet-800/80">Get personalized opportunities, services and resources based on your goals.</p></div></div><Link href="/ai" className="rounded-lg bg-violet-700 px-5 py-3 text-sm font-bold text-white hover:bg-violet-800">Get AI recommendations <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div></section>

      <section className="container pb-16"><div className="rounded-2xl bg-secondary/80 px-6 py-10 text-center"><h2 className="text-3xl font-extrabold text-[#073b36]">How it works</h2><p className="mt-1 text-sm text-muted-foreground">Simple steps to a brighter future</p><div className="mt-8 grid gap-8 md:grid-cols-4">{[{n:"1",title:"Create your profile",text:"Sign up and tell us about yourself"},{n:"2",title:"Explore opportunities",text:"Browse jobs, training, scholarships and more"},{n:"3",title:"Get recommendations",text:"Receive personalized suggestions"},{n:"4",title:"Take action",text:"Apply, learn and connect with your community"}].map((step) => <div key={step.n}><span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-white">{step.n}</span><h3 className="mt-3 font-bold capitalize">{step.title}</h3><p className="mt-1 text-sm text-muted-foreground">{step.text}</p></div>)}</div></div></section>    </main>
    <SiteFooter />
  </div>;
}










