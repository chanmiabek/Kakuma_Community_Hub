import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Search,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeDataSections } from "@/components/home/data-sections";

const shortcuts = [
  {
    href: "/opportunities",
    icon: BriefcaseBusiness,
    title: "Jobs & opportunities",
    text: "Find your next step",
    image: "/images/kenya-turkana-region-refugee-camp-kakuma-vocational-training-typewriter-G47N0B.jpg",
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/opportunities?type=TRAINING",
    icon: GraduationCap,
    title: "Learning & training",
    text: "Build practical skills",
    image: "/images/images (1).jpg",
    iconClass: "bg-violet-50 text-violet-700",
  },
  {
    href: "/opportunities?type=SCHOLARSHIP",
    icon: GraduationCap,
    title: "Scholarships",
    text: "Keep education moving",
    image: "/images/the_right_to_learn_how_aid_reclaimed_childhood_for_binta_and_Mu-azu_07-8.jpg",
    iconClass: "bg-rose-50 text-rose-700",
  },
  {
    href: "/services",
    icon: HeartHandshake,
    title: "Community services",
    text: "Find helpful support",
    image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_10.jpg",
    iconClass: "bg-sky-50 text-sky-700",
  },
  {
    href: "/businesses",
    icon: Store,
    title: "Local businesses",
    text: "Shop and connect locally",
    image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg",
    iconClass: "bg-amber-50 text-amber-700",
  },
  {
    href: "/events",
    icon: CalendarDays,
    title: "Events & activities",
    text: "Be part of the community",
    image: "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_01.jpg",
    iconClass: "bg-teal-50 text-teal-700",
  },
];

const steps = [
  { number: "01", title: "Create your profile", text: "Tell us about your interests and goals." },
  { number: "02", title: "Explore what matters", text: "Discover opportunities, services and local organizations." },
  { number: "03", title: "Find your next step", text: "Use relevant resources to plan your next move." },
  { number: "04", title: "Connect and grow", text: "Apply, learn and take part in your community." },
];

export default function HomePage() {
  const dataSections = (
    <Suspense
      fallback={
        <div className="container space-y-5 py-12" aria-label="Loading community information">
          <div className="h-28 animate-pulse rounded-2xl bg-muted" />
          <div className="h-56 animate-pulse rounded-2xl bg-muted" />
        </div>
      }
    >
      <HomeDataSections />
    </Suspense>
  );

  return (
    <div className="min-h-screen overflow-clip bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="hero-surface relative isolate overflow-hidden">
          <div aria-hidden="true" className="hero-orb hero-orb-one" />
          <div aria-hidden="true" className="hero-orb hero-orb-two" />
          <div className="container relative grid min-h-[510px] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-600" aria-hidden="true" />
                A stronger community starts here
              </p>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-[#12372f] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Connecting Kakuma
                <span className="hero-heading-accent mt-1 block">to new opportunities.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                A community-first hub for jobs, learning, scholarships, local businesses and essential services — bringing useful resources closer to you.
              </p>
              <form
                action="/opportunities"
                role="search"
                className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_50px_-24px_rgba(15,55,44,.38)] transition focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/10"
              >
                <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <label htmlFor="home-search" className="sr-only">Search the community hub</label>
                <input
                  id="home-search"
                  name="q"
                  placeholder="Search jobs, training, services…"
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />
                <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-6">
                  Search <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" /> Community-focused resources</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" /> One place to start</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-200/70 via-white/50 to-amber-100/80 blur-xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white p-2 shadow-[0_30px_70px_-28px_rgba(12,50,40,.45)]">
                <div className="relative h-[270px] overflow-hidden rounded-[1.25rem] bg-emerald-50 sm:h-[340px] lg:h-[390px]">
                  <img src="/images/1000262382.jpg" alt="Community members learning and working together in Kakuma" className="h-full w-full object-cover" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e25]/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">Built around community</p>
                    <p className="mt-2 max-w-sm text-2xl font-bold leading-tight sm:text-3xl">Discover resources. Make your next move.</p>
                  </div>
                </div>
              </div>
              <div className="relative mx-3 -mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:absolute sm:-bottom-5 sm:left-0 sm:mx-0 sm:mt-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Users className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Local knowledge, wider access</p>
                  <p className="mt-0.5 text-xs text-slate-500">Opportunities and services in one hub</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Explore categories" className="container relative z-10 py-8 sm:py-10">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Explore the hub</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">What are you looking for?</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-500">Choose a category to find information and resources relevant to your goals.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map(({ href, icon: Icon, title, text, image, iconClass }) => (
              <Link key={title} href={href} className="category-card group flex min-h-[148px] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-lg sm:p-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                  <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-bold leading-snug text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{text}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-primary">Explore <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {dataSections}

        <section className="container pb-12 sm:pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-[#12372f] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[36px] border-white/5" />
            <div className="relative flex max-w-2xl items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300"><Sparkles className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">A little help navigating more</p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Get a clearer view of your next step.</h2>
                <p className="mt-3 text-sm leading-6 text-emerald-50/80 sm:text-base">Explore the AI assistant for help finding relevant opportunities and community resources.</p>
              </div>
            </div>
            <Link href="/ai" className="relative mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-bold text-[#172d26] transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:mt-0">
              Explore AI assistant <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="container pb-16 sm:pb-20">
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-9 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Simple by design</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Your path starts with one step.</h2>
              <p className="mt-3 leading-7 text-slate-500">A straightforward way to discover, connect and move forward.</p>
            </div>
            <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-primary">{step.number}</span>
                  <h3 className="mt-4 font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex justify-center">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Create your account <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
