import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BusinessProductForm } from "@/components/forms/business-product-form";

export default async function BusinessProductsPage() {
  const session = await auth();
  const biz = await prisma.business.findUnique({
    where: { ownerId: session!.user.id },
    include: { products: true },
  });

  if (!biz) return <EmptyState title="Create your business profile first" description="" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <BusinessProductForm />
      {biz.products.length === 0 ? (
        <EmptyState title="No products yet" description="Add products to attract customers." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {biz.products.map((p) => (
            <Card key={p.id}>
              <CardContent className="pt-6">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="mb-4 h-40 w-full rounded-xl object-cover" loading="lazy" />}
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                {p.price && <p className="mt-2">{p.currency} {p.price.toLocaleString()}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}