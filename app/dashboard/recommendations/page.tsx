import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpportunityCard } from "@/components/cards/opportunity-card";
import { auth } from "@/lib/auth";
import { recommendationService } from "@/server/services/recommendation.service";

export default async function RecommendationsPage() {
  const session = await auth();
  const recs = await recommendationService.forUser(session!.user.id, 12);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recommended for you</h1>
        <p className="text-muted-foreground">Based on your skills, applications and activity</p>
      </div>

      {recs.length === 0 ? (
        <Card>
          <CardHeader><CardTitle>No recommendations yet</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Add skills to your profile to get personalized recommendations.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recs.map(({ opportunity, reason }) => (
            <div key={opportunity.id}>
              <OpportunityCard opportunity={opportunity} />
              {reason && <p className="mt-2 text-xs text-muted-foreground">{reason}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}