import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityForm } from "@/components/forms/opportunity-form";

export default function CreateOpportunityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New opportunity</h1>
      <Card>
        <CardHeader><CardTitle>Opportunity details</CardTitle></CardHeader>
        <CardContent><OpportunityForm /></CardContent>
      </Card>
    </div>
  );
}