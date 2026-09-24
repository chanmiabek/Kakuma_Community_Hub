import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EventCard } from "@/components/cards/event-card";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/db";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="mt-2 text-muted-foreground">Workshops, job fairs and community meetups</p>

        <div className="mt-8">
          {events.length === 0 ? (
            <EmptyState title="No upcoming events" description="Check back soon." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}