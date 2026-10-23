"use client";

import Link from "next/link";
import {
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
        <section className="relative isolate overflow-hidden bg-[#f4f7f1]">
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
                  Search opportunities and resources
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
                    placeholder="Search jobs, scholarships, services…"
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
