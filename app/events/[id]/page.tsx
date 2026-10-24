import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { HeroSection } from "@/components/shared/hero-section";

type Params = Promise<{ id: string }>;

export default async function EventDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, include: { organization: true } });
  if (!event) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <HeroSection title={event.title} eyebrow={event.type} description={`${formatDateTime(event.startsAt)} → ${formatDateTime(event.endsAt)} · ${event.isOnline ? "Online" : event.location ?? "Kakuma"}`} imageUrl={event.coverUrl} />

        <Card className="mt-6">
          <CardHeader><CardTitle>About this event</CardTitle></CardHeader>
          <CardContent className="whitespace-pre-wrap text-sm">{event.description}</CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}