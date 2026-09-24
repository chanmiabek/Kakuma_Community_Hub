import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminReportsPage() {
  const items = await prisma.communityReport.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Community reports</h1>
      <div className="space-y-2">
        {items.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.author.name} · {r.category}</p>
              </div>
              <Badge>{r.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}