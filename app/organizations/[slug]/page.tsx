import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BadgeCheck, Globe, Mail, MapPin, Phone } from "lucide-react";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { organizationService } from "@/server/services/organization.service";

type Params = Promise<{ slug: string }>;

export default async function OrganizationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const org = await organizationService.getBySlug(slug);
  if (!org) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative h-48 w-full overflow-hidden bg-primary/20 sm:h-64"><img src={org.coverUrl || "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg"} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-slate-950/5" /></div>
        <div className="container mx-auto px-4">
          <div className="-mt-12 mb-8 flex items-end gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border bg-card text-2xl font-bold shadow">
              {org.name.charAt(0)}
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{org.name}</h1>
                {org.verificationStatus === "VERIFIED" && (
                  <BadgeCheck className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground">{org.address ?? org.camp}</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="mb-3 text-xl font-semibold">About</h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{org.description}</p>

              {org.mission && (
                <>
                  <h2 className="mt-8 mb-3 text-xl font-semibold">Mission</h2>
                  <p className="text-sm leading-relaxed">{org.mission}</p>
                </>
              )}

              <h2 className="mt-8 mb-3 text-xl font-semibold">Open opportunities</h2>
              {org.opportunities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No open opportunities right now.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {org.opportunities.map((o) => <OpportunityCard key={o.id} opportunity={o as any} />)}
                </div>
              )}
            </div>

            <aside className="space-y-4 rounded-lg border bg-card p-6 text-sm">
              <h3 className="font-semibold">Contact</h3>
              {org.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {org.email}</p>}
              {org.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {org.phone}</p>}
              {org.website && (
                <p className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a href={org.website} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                    {org.website}
                  </a>
                </p>
              )}
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {org.address ?? org.camp}</p>

              <div className="border-t pt-4">
                <h3 className="font-semibold">Focus areas</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {org.focusAreas.map((a) => <span key={a} className="rounded-full bg-muted px-2 py-1 text-xs">{a}</span>)}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
