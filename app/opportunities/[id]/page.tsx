import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplyButton } from "@/components/forms/apply-button";
import { BookmarkButton } from "@/components/forms/bookmark-button";
import { opportunityService } from "@/server/services/opportunity.service";
import { formatDate } from "@/lib/utils";
import { HeroSection } from "@/components/shared/hero-section";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const opp = await opportunityService.getByIdOrSlug(id);
  if (!opp) return { title: "Opportunity not found" };
  return { title: opp.title, description: opp.description.slice(0, 160) };
}

export default async function OpportunityDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const opp = await opportunityService.getByIdOrSlug(id);
  if (!opp) notFound();

  await opportunityService.incrementViews(opp.id);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="mb-6">
              <HeroSection title={opp.title} eyebrow={opp.organization.name} description={opp.location ?? "Kakuma community"} imageUrl={opp.imageUrl} >
                <div className="flex flex-wrap gap-2">
                  <Badge>{opp.type}</Badge>
                  <Badge variant="secondary">{opp.category}</Badge>
                  {opp.isRemote && <Badge variant="outline">Remote</Badge>}
                </div>
              </HeroSection>
            </div>      </div>

            <Card>
              <CardHeader><CardTitle>Description</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none whitespace-pre-wrap dark:prose-invert">
                {opp.description}
              </CardContent>
            </Card>

            {opp.requirements && (
              <Card className="mt-6">
                <CardHeader><CardTitle>Requirements</CardTitle></CardHeader>
                <CardContent className="whitespace-pre-wrap text-sm">{opp.requirements}</CardContent>
              </Card>
            )}

            {opp.responsibilities && (
              <Card className="mt-6">
                <CardHeader><CardTitle>Responsibilities</CardTitle></CardHeader>
                <CardContent className="whitespace-pre-wrap text-sm">{opp.responsibilities}</CardContent>
              </Card>
            )}
          </article>

          <aside className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Quick facts</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Deadline" value={opp.deadline ? formatDate(opp.deadline) : "Open"} />
                <Separator />
                <Row label="Positions" value={String(opp.positions)} />
                <Separator />
                <Row
                  label="Salary"
                  value={
                    opp.salaryMin
                      ? `${opp.currency} ${opp.salaryMin.toLocaleString()}${
                          opp.salaryMax ? ` – ${opp.salaryMax.toLocaleString()}` : "+"
                        }`
                      : "Negotiable"
                  }
                />
                <Separator />
                <Row label="Views" value={String(opp.views)} />
              </CardContent>
            </Card>

            <div className="space-y-2">
              <ApplyButton opportunityId={opp.id} applyUrl={opp.applyUrl} />
              <BookmarkButton opportunityId={opp.id} />
              <Button asChild variant="outline" className="w-full">
                <a href={`mailto:${opp.contactEmail ?? opp.organization.email ?? ""}`}>Contact organization</a>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}