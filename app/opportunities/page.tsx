import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { HeroSection } from "@/components/shared/hero-section";
import { OpportunityFilters } from "@/components/forms/opportunity-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { opportunityService } from "@/server/services/opportunity.service";
import { parsePagination } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Search jobs, internships, training, scholarships, grants, and volunteer opportunities connected to Kakuma and the surrounding community.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const { page, perPage } = parsePagination(sp);

  const result = await opportunityService.search({
    q: typeof sp.q === "string" ? sp.q : undefined,
    type: typeof sp.type === "string" ? sp.type : undefined,
    category: typeof sp.category === "string" ? sp.category : undefined,
    location: typeof sp.location === "string" ? sp.location : undefined,
    page,
    perPage,
  });
  const {
    items,
    total,
    page: currentPage,
    perPage: pageSize,
    totalPages,
  } = result;

  if (currentPage !== page) {
    redirect(buildPageHref(sp, currentPage));
  }

  const firstResult = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastResult = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="container mx-auto flex-1 py-10 sm:py-12">
        <div className="mb-8">
          <HeroSection
            eyebrow="Discover your next step"
            title="Opportunities"
            description="Explore jobs, internships, training, scholarships, grants, and ways to contribute your skills."
            imageUrl="/images/kenya-turkana-region-refugee-camp-kakuma-vocational-training-typewriter-G47N0B.jpg"
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-slate-900 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <SlidersHorizontal className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-extrabold leading-none">{total.toLocaleString()}</p>
                <p className="mt-1 text-xs text-muted-foreground">{total === 1 ? "opportunity found" : "opportunities found"}</p>
              </div>
            </div>
          </HeroSection>
        </div>/header>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-24">
            <OpportunityFilters />
          </aside>

          <section aria-label="Opportunity results" className="min-w-0">
            {items.length > 0 && (
              <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {firstResult}–{lastResult}
                  </span>{" "}
                  of {total.toLocaleString()} opportunities
                </p>
                <p>Recently published first</p>
              </div>
            )}

            {items.length === 0 ? (
              <EmptyState
                title="No opportunities found"
                description="Try a broader keyword, choose a different category, or reset your filters."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                aria-label="Opportunity pagination"
                className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:flex-row"
              >
                {currentPage > 1 ? (
                  <Link
                    href={buildPageHref(sp, currentPage - 1)}
                    rel="prev"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:border-primary/30 hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-xl border px-4 text-sm font-semibold text-muted-foreground/60"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </span>
                )}

                <p className="text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-bold text-foreground">{currentPage}</span> of{" "}
                  <span className="font-bold text-foreground">{totalPages}</span>
                </p>

                {currentPage < totalPages ? (
                  <Link
                    href={buildPageHref(sp, currentPage + 1)}
                    rel="next"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-xl border px-4 text-sm font-semibold text-muted-foreground/60"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </nav>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function buildPageHref(
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;

    if (typeof value === "string" && value.length > 0) {
      params.set(key, value);
    } else if (Array.isArray(value) && value[0]) {
      params.set(key, value[0]);
    }
  }

  params.set("page", String(page));
  return `/opportunities?${params.toString()}`;
}
