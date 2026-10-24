import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

type Params = Promise<{ slug: string }>;

export default async function BusinessPage({ params }: { params: Params }) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
    include: { products: true, services: true },
  });
  if (!business) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-10">
        <div className="relative h-48 overflow-hidden bg-primary/20 sm:h-64">
          <img src={business.coverUrl || "/images/images (1).jpg"} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-slate-950/5" />
        </div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-10 mb-8 flex items-end gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-card text-2xl font-bold shadow">
              {business.logoUrl ? <img src={business.logoUrl} alt={business.name + " logo"} className="h-full w-full object-cover" /> : business.name.charAt(0)}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{business.name}</h1>
                {business.verificationStatus === "VERIFIED" && <BadgeCheck className="h-6 w-6 text-primary" />}
              </div>
              <p className="mt-1 text-muted-foreground">{business.category}</p>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-7">{business.description}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="mb-3 text-xl font-semibold">Products</h2>
              {business.products.length === 0 ? (
                <p className="text-sm text-muted-foreground">No products listed.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {business.products.map((p) => (
                    <Card key={p.id} className="overflow-hidden">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="h-44 w-full object-cover" loading="lazy" />}
                      <CardHeader><CardTitle className="text-base">{p.name}</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                        {p.price && <p className="mt-2 font-medium">{p.currency} {p.price.toLocaleString()}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <h2 className="mt-8 mb-3 text-xl font-semibold">Services</h2>
              {business.services.length === 0 ? (
                <p className="text-sm text-muted-foreground">No services listed.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {business.services.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      {service.imageUrl && <img src={service.imageUrl} alt={service.title} className="h-40 w-full object-cover" loading="lazy" />}
                      <CardHeader><CardTitle className="text-base">{service.title}</CardTitle></CardHeader>
                      <CardContent><p className="text-sm text-muted-foreground">{service.description}</p></CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <aside className="h-fit space-y-3 rounded-lg border bg-card p-6 text-sm">
              <h3 className="font-semibold">Contact</h3>
              {business.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {business.email}</p>}
              {business.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {business.phone}</p>}
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {business.address ?? business.camp}</p>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
