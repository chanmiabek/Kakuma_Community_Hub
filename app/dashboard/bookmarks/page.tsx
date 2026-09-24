import { OpportunityCard } from "@/components/cards/opportunity-card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function BookmarksPage() {
  const session = await auth();
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      opportunity: { include: { organization: { select: { name: true, slug: true, logoUrl: true } } } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <EmptyState title="No bookmarks yet" description="Save opportunities to view them later." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((b) => <OpportunityCard key={b.id} opportunity={b.opportunity} />)}
        </div>
      )}
    </div>
  );
}