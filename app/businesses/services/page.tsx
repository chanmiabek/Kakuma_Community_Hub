import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function BusinessServicesPage() {
  const session = await auth();
  const biz = await prisma.business.findUnique({
    where: { ownerId: session!.user.id },
    include: { services: true },
  });

  if (!biz) return <EmptyState title="Create your business profile first" description="" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Services</h1>
      {biz.services.length === 0 ? (
        <EmptyState title="No services yet" description="" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {biz.services.map((s) => (
            <Card key={s.id}>
              <CardContent className="pt-6">
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}