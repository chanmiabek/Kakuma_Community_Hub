import Link from "next/link";
import {

  ArrowRight, BriefcaseBusiness, Building2, CalendarDays, GraduationCap,
  HeartHandshake, Search, Sparkles, Store, Users, Globe2, ShieldCheck,
  ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, GraduationCap,
  HeartHandshake, MapPin, Search, Sparkles, Store, Users
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
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

    <Suspense fallback={<div className="container space-y-6 py-12"><div className="h-28 animate-pulse rounded-2xl bg-muted" /><div className="h-56 animate-pulse rounded-2xl bg-muted" /></div>}>
    <Suspense fallback={<div className="container space-y-5 py-12" aria-label="Loading community listings"><div className="h-28 animate-pulse rounded-2xl bg-muted" /><div className="h-56 animate-pulse rounded-2xl bg-muted" /></div>}>

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
const categories = [
  {
    href: "/opportunities",
    title: "Jobs & careers",
    description: "Find work and grow professionally.",
    icon: BriefcaseBusiness,
    iconStyle: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  },
  {
    href: "/opportunities?type=TRAINING",
    title: "Learning & training",
    description: "Build practical, future-ready skills.",
    icon: BookOpen,
    iconStyle: "bg-sky-50 text-sky-800 ring-sky-100",
  },
  {
    href: "/opportunities?type=SCHOLARSHIP",
    title: "Scholarships",
    description: "Discover ways to fund education.",
    icon: GraduationCap,
    iconStyle: "bg-amber-50 text-amber-800 ring-amber-100",
  },
  {
    href: "/services",
    title: "Community services",
    description: "Find support and local resources.",
    icon: HeartHandshake,
    iconStyle: "bg-rose-50 text-rose-800 ring-rose-100",
  },
  {
    href: "/businesses",
    title: "Local businesses",
    description: "Support entrepreneurs near you.",
    icon: Store,
    iconStyle: "bg-violet-50 text-violet-800 ring-violet-100",
  },
  {
    href: "/events",
    title: "Events & activities",
    description: "Meet people and take part.",
    icon: CalendarDays,
    iconStyle: "bg-orange-50 text-orange-800 ring-orange-100",
  },
];

const principles = [
  {
    icon: Users,
    title: "Community first",
    description:
      "A shared space to discover local resources, connect with organizations, and support one another.",
  },
  {
    icon: ShieldCheck,
    title: "Clear, useful information",
    description:
      "Find key details in one place and make better-informed decisions about your next step.",
  },
  {
    icon: Sparkles,
    title: "Guidance that fits you",
    description:
      "Explore curated resources and AI-assisted recommendations to help you move forward.",
  },
];

export default function HomePage() {
  const dataSections = (
    <Suspense
      fallback={
        <div className="container space-y-6 py-12">
          <div className="h-28 animate-pulse rounded-2xl bg-muted" />
          <div className="h-56 animate-pulse rounded-2xl bg-muted" />
        </div>
      }
    >
      <HomeDataSections />
    </Suspense>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#f4f7f1]" style={{ backgroundImage: "linear-gradient(90deg, rgba(244,247,241,.96) 0%, rgba(244,247,241,.9) 55%, rgba(244,247,241,.72) 100%), url(/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(222,184,92,0.19),transparent_34%),radial-gradient(ellipse_at_8%_65%,rgba(28,112,83,0.09),transparent_32%)]"
          />
          <div className="container grid min-h-[580px] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.03fr_.97fr] lg:gap-14 lg:py-20">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/85 px-3.5 py-2 text-sm font-semibold text-primary shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                Community, connection, opportunity
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#163b30] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
                Find your next step.
                <span className="mt-1 block text-primary">
                  Build it together.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Kakuma Hub brings jobs, education, scholarships, local
                businesses, events, and community services into one accessible
                place—so the opportunities you need are easier to find.
              </p>

              <form
                action="/opportunities"
                method="get"
                role="search"
                className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_50px_-30px_rgba(20,56,43,0.38)] sm:flex-row sm:items-center"
              >
                <label htmlFor="community-search" className="sr-only">
                  Search jobs, training, and scholarships
                </label>
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                  <Search
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-slate-400"
                  />
                  <input
                    id="community-search"
                    name="q"
                    type="search"
                    placeholder="Search jobs, training, scholarships…"
                    className="h-12 min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Search resources
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Kakuma, Turkana County
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Made for the community
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/opportunities"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#173f32] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0f3026] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Explore opportunities
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-5 text-sm font-bold text-slate-700 transition hover:border-primary/40 hover:bg-white hover:text-primary"
                >
                  About Kakuma Hub
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
              <div className="absolute -left-5 -top-5 h-24 w-24 rounded-3xl border border-primary/10 bg-white/60" />
              <div className="absolute -bottom-5 -right-4 h-28 w-28 rounded-full bg-[#e7c77e]/35 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border-[6px] border-white bg-white shadow-[0_28px_80px_-35px_rgba(19,57,43,0.5)]">
                <img
                  src="/images/1000262382.jpg"
                  alt="Community members learning and sharing skills in Kakuma"
                  className="h-[330px] w-full object-cover sm:h-[400px] lg:h-[470px]"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102f25]/75 via-transparent to-[#102f25]/5" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                    Stronger, together
                  </p>
                  <p className="mt-2 max-w-sm text-2xl font-bold leading-tight sm:text-3xl">
                    Opportunity grows when communities connect.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-7 left-4 right-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:left-8 sm:right-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">
                    One connected community
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
                    Discover resources. Build relationships. Move forward.
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-primary"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="discover-heading"
          className="container pb-5 pt-20 sm:pb-8 sm:pt-24"
        >
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Start exploring
              </p>
              <h2
                id="discover-heading"
                className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                What are you looking for?
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Useful places to start, whether you are searching for work,
              learning a skill, or looking for local support.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ href, title, description, icon: Icon, iconStyle }) => (
              <Link
                key={title}
                href={href}
                className="group flex min-h-[124px] items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 transition group-hover:scale-105 ${iconStyle}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-bold text-slate-900">
                    {title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-6 text-slate-500">
                    {description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {dataSections}

        <section className="container pb-14 pt-2 sm:pb-16">
          <div className="rounded-[1.75rem] border border-primary/10 bg-[#f4f7f1] p-6 sm:p-9 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  A hub built around people
                </p>
                <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-[#163b30] sm:text-4xl">
                  Local connections can open up new possibilities.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                  Find information, discover organizations, support local
                  enterprise, and connect with people working toward a stronger
                  Kakuma.
                </p>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                >
                  Learn about the hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {principles.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white bg-white/85 p-5 shadow-sm"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="rounded-[2rem] border bg-card px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.16em] text-primary">Getting started</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">A few steps can open new doors.</h2><p className="mt-3 leading-7 text-muted-foreground">A simple path from finding information to taking action.</p></div>
            <div className="mt-9 grid gap-8 md:grid-cols-3">
              {steps.map((step) => <div key={step.number} className="relative text-center md:px-5"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-lg font-black text-primary">{step.number}</span><h3 className="mt-4 text-lg font-bold">{step.title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.text}</p></div>)}
            </div>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 border-t pt-7 sm:flex-row"><Link href="/register" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:opacity-90">Join the community <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/about" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 font-bold transition hover:bg-secondary">Learn about the hub</Link></div>
          <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#173f32] px-6 py-9 text-white sm:px-9 sm:py-11 lg:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_0%,rgba(222,184,92,0.22),transparent_34%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.08),transparent_35%)]"
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                  <Sparkles className="h-3.5 w-3.5 text-[#e7c77e]" />
                  Smarter discovery
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Not sure where to begin?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                  Use AI-assisted recommendations to explore resources that
                  better match your interests and goals.
                </p>
              </div>
              <Link
                href="/ai"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e7c77e] px-5 py-3 text-sm font-extrabold text-[#173f32] shadow-sm transition hover:bg-[#f0d99f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173f32]"
              >
                Get recommendations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
