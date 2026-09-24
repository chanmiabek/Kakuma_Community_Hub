import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminServicesPage() {
  const items = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Services</h1>
      <div className="space-y-2">
        {items.map((s) => (
          <Card key={s.id}>
            <CardContent className="pt-6">
              <p className="font-medium">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}