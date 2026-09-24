import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [users, orgs, businesses, opportunities, reports] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.business.count(),
    prisma.opportunity.count(),
    prisma.communityReport.count({ where: { status: "OPEN" } }),
  ]);

  const stats = [
    { label: "Users", value: users },
    { label: "Organizations", value: orgs },
    { label: "Businesses", value: businesses },
    { label: "Opportunities", value: opportunities },
    { label: "Open reports", value: reports },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}