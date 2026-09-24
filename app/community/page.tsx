import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { ReportCard } from "@/components/cards/report-card";
import { EmptyState } from "@/components/shared/empty-state";
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community reports</h1>
            <p className="mt-2 text-muted-foreground">Report issues and follow what&apos;s happening</p>
          </div>
          <Button asChild>
            <Link href="/community/reports/create">New report</Link>
          </Button>
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