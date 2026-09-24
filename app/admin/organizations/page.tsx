import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminOrganizationsPage() {
  const orgs = await prisma.organization.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Organizations</h1>
      <div className="space-y-2">
        {orgs.map((o) => (
          <Card key={o.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{o.name}</p>
                <p className="text-sm text-muted-foreground">{o.email}</p>
              </div>
              <Badge>{o.verificationStatus}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}