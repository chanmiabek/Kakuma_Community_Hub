import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { EmptyState } from "@/components/shared/empty-state";
import { opportunityService } from "@/server/services/opportunity.service";

type Params = Promise<{ slug: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { items } = await opportunityService.search({ category: slug, page: 1, perPage: 50 });
  if (!items.length) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-muted-foreground">{items.length} opportunities in this category</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 ? (
            <EmptyState title="Nothing here yet" description="Check back soon." />
          ) : (
            items.map((o) => <OpportunityCard key={o.id} opportunity={o} />)
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}