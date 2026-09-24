import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function ApplicationsPage() {
  const session = await auth();
  const applications = await prisma.application.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { opportunity: { include: { organization: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My applications</h1>

      {applications.length === 0 ? (
        <EmptyState title="No applications yet" description="Browse opportunities and apply." />
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <Link href={`/opportunities/${a.opportunity.id}`} className="font-medium hover:underline">
                    {a.opportunity.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {a.opportunity.organization.name} · Applied {formatDate(a.createdAt)}
                  </p>
                </div>
                <Badge>{a.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}