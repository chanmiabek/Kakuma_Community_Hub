import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, Store, Users } from "lucide-react";
import { getHomeData } from "@/lib/home-data";

export async function HomeDataSections() {
  const { opportunities, stats } = await getHomeData();

  return (
    <>
      <section className="container py-10 sm:py-12" aria-label="Community hub statistics">
        <div className="grid gap-3 rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          {[
            { icon: BriefcaseBusiness, value: stats[0], label: "Opportunities", detail: "Ways to learn and work" },
            { icon: Building2, value: stats[1], label: "Organizations", detail: "Groups serving the community" },
            { icon: Store, value: stats[2], label: "Local businesses", detail: "Services near you" },
            { icon: Users, value: stats[3], label: "Community members", detail: "People building together" },
          ].map(({ icon: Icon, value, label, detail }) => (
            <div key={label} className="flex items-start gap-3 rounded-2xl px-3 py-4 transition hover:bg-emerald-50/60">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <strong className="block text-2xl font-extrabold tracking-tight text-slate-900">{value.toLocaleString()}</strong>
                <span className="mt-0.5 block text-sm font-semibold text-slate-700">{label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-14 sm:pb-16">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Hand-picked for discovery</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Featured opportunities</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">Fresh ways to learn, work and grow.</p>
          </div>
          <Link href="/opportunities" className="inline-flex items-center gap-1 self-start rounded-lg py-2 text-sm font-bold text-primary hover:text-emerald-900 sm:self-auto">
            Browse all opportunities <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {opportunities.length ? opportunities.map((opportunity) => (
            <Link
              key={opportunity.id}
              href={`/opportunities/${opportunity.slug ?? opportunity.id}`}
              className="group flex h-full flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-700/40 hover:shadow-lg sm:p-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
                    {opportunity.type.replaceAll("_", " ")}
                  </span>
                  <span className="text-xs text-slate-400">Community listing</span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-primary sm:text-xl">{opportunity.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{opportunity.organization?.name ?? "Kakuma Community"}</p>
              </div>
              <span className="inline-flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-primary">
                View opportunity details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          )) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center lg:col-span-2">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-primary"><BriefcaseBusiness className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-4 font-bold text-slate-900">New opportunities are on their way</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Check back soon, or browse all listings to explore what is available today.</p>
              <Link href="/opportunities" className="mt-5 inline-flex items-center gap-2 font-bold text-primary">Explore opportunities <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
