import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function OrganizationApplicationsPage() {
  const session = await auth();
  const applications = await prisma.application.findMany({
    where: { opportunity: { organization: { ownerId: session!.user.id } } },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true, image: true } },
      opportunity: { select: { title: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications</h1>
      {applications.length === 0 ? (
        <EmptyState title="No applications yet" description="" />
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <p className="font-medium">{a.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {a.opportunity.title} · {formatDate(a.createdAt)}
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