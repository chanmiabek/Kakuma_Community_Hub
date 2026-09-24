import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminBusinessesPage() {
  const items = await prisma.business.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Businesses</h1>
      <div className="space-y-2">
        {items.map((b) => (
          <Card key={b.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.category}</p>
              </div>
              <Badge>{b.verificationStatus}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}