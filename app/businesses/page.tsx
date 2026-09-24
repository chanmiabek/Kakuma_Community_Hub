import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function BusinessDashboard() {
  const session = await auth();
  const biz = await prisma.business.findUnique({
    where: { ownerId: session!.user.id },
    include: { _count: { select: { products: true, services: true } } },
  });

  if (!biz) {
    return (
      <Card>
        <CardHeader><CardTitle>Set up your business</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">Create your business profile to list products and services.</p>
          <Button asChild><Link href="/business/profile">Create profile</Link></Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{biz.name}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Products</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{biz._count.products}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Services</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{biz._count.services}</div></CardContent></Card>
      </div>
    </div>
  );
}