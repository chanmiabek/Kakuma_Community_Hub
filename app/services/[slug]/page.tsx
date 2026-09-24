import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

type Params = Promise<{ slug: string }>;

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        <p className="mt-2 text-muted-foreground">{service.category}</p>
        <Card className="mt-6">
          <CardContent className="pt-6 text-sm whitespace-pre-wrap">{service.description}</CardContent>
        </Card>
        {service.price && (
          <p className="mt-4 font-medium">
            {service.price} {service.currency && `(${service.currency})`}
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}