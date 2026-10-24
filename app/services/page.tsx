import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ServiceCard } from "@/components/cards/service-card";
import { EmptyState } from "@/components/shared/empty-state";
import { HeroSection } from "@/components/shared/hero-section";
import { prisma } from "@/lib/db";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <HeroSection title="Community services" eyebrow="Find local support" description="Discover trusted services, practical support, training, health resources and more." imageUrl="/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_01.jpg" />

        <div className="mt-8">
          {services.length === 0 ? (
            <EmptyState title="No services yet" description="Services will appear here once published." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}