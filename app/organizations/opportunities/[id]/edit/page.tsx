import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityForm } from "@/components/forms/opportunity-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Params = Promise<{ id: string }>;

export default async function EditOpportunityPage({ params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  const opp = await prisma.opportunity.findFirst({
    where: { id, organization: { ownerId: session!.user.id } },
  });
  if (!opp) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit opportunity</h1>
      <Card>
        <CardHeader><CardTitle>Opportunity details</CardTitle></CardHeader>
        <CardContent><OpportunityForm opportunity={opp} /></CardContent>
      </Card>
    </div>
  );
}