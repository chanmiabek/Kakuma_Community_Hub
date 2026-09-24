import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminVerificationPage() {
  const [orgs, businesses] = await Promise.all([
    prisma.organization.findMany({ where: { verificationStatus: "PENDING" } }),
    prisma.business.findMany({ where: { verificationStatus: "PENDING" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verification queue</h1>

      <Card>
        <CardHeader><CardTitle>Organizations ({orgs.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {orgs.map((o) => (
            <div key={o.id} className="flex items-center justify-between border-b pb-2 last:border-0">
              <span>{o.name}</span><Badge>{o.verificationStatus}</Badge>
            </div>
          ))}
          {orgs.length === 0 && <p className="text-sm text-muted-foreground">None pending.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Businesses ({businesses.length})</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {businesses.map((b) => (
            <div key={b.id} className="flex items-center justify-between border-b pb-2 last:border-0">
              <span>{b.name}</span><Badge>{b.verificationStatus}</Badge>
            </div>
          ))}
          {businesses.length === 0 && <p className="text-sm text-muted-foreground">None pending.</p>}
        </CardContent>
      </Card>
    </div>
  );
}