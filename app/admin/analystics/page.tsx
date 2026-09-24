import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";

export default async function AdminAnalyticsPage() {
  const [byType, byStatus] = await Promise.all([
    prisma.opportunity.groupBy({ by: ["type"], _count: true }),
    prisma.application.groupBy({ by: ["status"], _count: true }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <Card>
        <CardHeader><CardTitle>Opportunities by type</CardTitle></CardHeader>
        <CardContent>
          <AnalyticsCharts
            typeData={byType.map((d) => ({ name: d.type, value: d._count }))}
            statusData={byStatus.map((d) => ({ name: d.status, value: d._count }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}