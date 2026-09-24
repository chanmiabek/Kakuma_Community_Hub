import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminOpportunitiesPage() {
  const items = await prisma.opportunity.findMany({
    orderBy: { createdAt: "desc" },
    include: { organization: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Opportunities</h1>
      <div className="space-y-2">
        {items.map((o) => (
          <Card key={o.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{o.title}</p>
                <p className="text-sm text-muted-foreground">{o.organization.name}</p>
              </div>
              <Badge>{o.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}