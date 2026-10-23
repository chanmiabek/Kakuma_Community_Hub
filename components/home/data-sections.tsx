import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Store,
  Users,
} from "lucide-react";
import { getHomeData } from "@/lib/home-data";

export async function HomeDataSections() {
  const { opportunities, stats } = await getHomeData();

  const metrics = [
    { icon: BriefcaseBusiness, value: stats[0], label: "Open opportunities" },
    { icon: Building2, value: stats[1], label: "Organizations" },
    { icon: Store, value: stats[2], label: "Local businesses" },
    { icon: Users, value: stats[3], label: "Community members" },
  ];

  return (
    <>
      <section
        aria-label="Community hub statistics"
        className="container py-10 sm:py-12"
      >
        <div className="grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, value, label }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-5 py-5 sm:px-6 ${index < 3 ? "border-b sm:border-b-0 lg:border-r" : ""} ${index === 0 || index === 2 ? "sm:border-r lg:border-r" : ""}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <strong className="block text-2xl font-extrabold tracking-tight text-slate-900">
                  {value.toLocaleString()}
                </strong>
                <span className="mt-0.5 block text-sm text-slate-500">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="featured-opportunities-heading"
        className="container pb-14 sm:pb-16"
      >
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Take your next step
            </p>
            <h2
              id="featured-opportunities-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Featured opportunities
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Recently published ways to learn, work, and grow.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 self-start text-sm font-bold text-primary transition hover:gap-3 sm:self-auto"
          >
            View all opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {opportunities.length ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <Link
                key={opportunity.id}
                href={`/opportunities/${opportunity.slug ?? opportunity.id}`}
                className="group flex min-h-[220px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-primary">
                    {opportunity.type.toLowerCase().replaceAll("_", " ")}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-primary/10 group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold leading-6 text-slate-900 transition group-hover:text-primary">
                  {opportunity.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {opportunity.organization?.name ?? "Kakuma Community"}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-primary">
                  View opportunity
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <BriefcaseBusiness className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold text-slate-900">
              New opportunities are on the way
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Check back soon or browse the full opportunities directory to
              explore current listings.
            </p>
            <Link
              href="/opportunities"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Browse opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
