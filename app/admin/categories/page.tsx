import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id}>
            <CardContent className="pt-6">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.kind}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}