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
      <main className="container mx-auto flex-1 px-4 py-10">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{business.name}</h1>
          {business.verificationStatus === "VERIFIED" && <BadgeCheck className="h-6 w-6 text-primary" />}
        </div>
        <p className="mt-2 text-muted-foreground">{business.category}</p>
        <p className="mt-4 whitespace-pre-wrap text-sm">{business.description}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-3 text-xl font-semibold">Products</h2>
            {business.products.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products listed.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {business.products.map((p) => (
                  <Card key={p.id}>
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
              <div className="space-y-3">
                {business.services.map((s) => (
                  <div key={s.id} className="rounded-lg border p-4">
                    <p className="font-medium">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-3 rounded-lg border bg-card p-6 text-sm">
            <h3 className="font-semibold">Contact</h3>
            {business.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {business.email}</p>}
            {business.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {business.phone}</p>}
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {business.address ?? business.camp}</p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}