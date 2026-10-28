import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { ReportCard } from "@/components/cards/report-card";
import { EmptyState } from "@/components/shared/empty-state";
import { HeroSection } from "@/components/shared/hero-section";
import { prisma } from "@/lib/db";

export default async function CommunityPage() {
  const reports = await prisma.communityReport.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { author: { select: { name: true, image: true } } },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <div className="mb-8">
          <HeroSection title="Community reports" eyebrow="Your voice matters" description="Share local concerns, add a photo if it helps, and follow community issues as they progress." imageUrl="/images/Life in Kakuma hope and resilience in a refugee camp photo 4 (1).jpg">
            <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
              <Link href="/community/reports/create">Create a report</Link>
            </Button>
          </HeroSection>
        </div>

        <div className="mt-8">
          {reports.length === 0 ? (
            <EmptyState title="No reports yet" description="Be the first to report an issue." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((r) => <ReportCard key={r.id} report={r} />)}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}