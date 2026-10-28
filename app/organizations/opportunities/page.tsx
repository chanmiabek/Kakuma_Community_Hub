import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function OrganizationOpportunitiesPage() {
  const session = await auth();
  const org = await prisma.organization.findUnique({ where: { ownerId: session!.user.id } });
  if (!org) return <EmptyState title="Create your organization profile first" description="" />;

  const items = await prisma.opportunity.findMany({
    where: { organizationId: org.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <Button asChild><Link href="/organizations/opportunities/create">New opportunity</Link></Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No opportunities yet" description="Post your first opportunity." />
      ) : (
        <div className="space-y-3">
          {items.map((o) => (
            <Card key={o.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <p className="font-medium">{o.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {o._count.applications} applications · {o.deadline ? `Closes ${formatDate(o.deadline)}` : "Open"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{o.status}</Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/organizations/opportunities/${o.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}