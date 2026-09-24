import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { OpportunityFilters } from "@/components/forms/opportunity-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { opportunityService } from "@/server/services/opportunity.service";
import { parsePagination } from "@/lib/pagination";

export const metadata: Metadata = { title: "Opportunities" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function OpportunitiesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { page, perPage } = parsePagination(sp);

  const { items, total } = await opportunityService.search({
    q: typeof sp.q === "string" ? sp.q : undefined,
    type: typeof sp.type === "string" ? sp.type : undefined,
    category: typeof sp.category === "string" ? sp.category : undefined,
    location: typeof sp.location === "string" ? sp.location : undefined,
    page,
    perPage,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="mt-2 text-muted-foreground">
            {total} {total === 1 ? "opportunity" : "opportunities"} available
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside>
            <OpportunityFilters />
          </aside>

          <Suspense fallback={<OpportunitiesSkeleton />}>
            {items.length === 0 ? (
              <EmptyState
                title="No opportunities found"
                description="Try adjusting your filters or search terms."
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {items.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function OpportunitiesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-56 w-full" />
      ))}
    </div>
  );
}