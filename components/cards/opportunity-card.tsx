import Link from "next/link";
import { Building2, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type Props = {
  opportunity: {
    id: string;
    title: string;
    slug?: string;
    description?: string;
    type?: string;
    category?: string;
    location?: string | null;
    isRemote?: boolean;
    deadline?: Date | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
    currency?: string | null;
    organization: { name: string; slug?: string; logoUrl?: string | null };
  };
};

export function OpportunityCard({ opportunity }: Props) {
  return (
    <Link href={`/opportunities/${opportunity.slug ?? opportunity.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold leading-tight">{opportunity.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3" /> {opportunity.organization.name}
              </p>
            </div>
            {opportunity.type && <Badge variant="secondary">{opportunity.type}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {opportunity.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{opportunity.description}</p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {opportunity.location && (
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {opportunity.location}</span>
            )}
            {opportunity.deadline && (
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDate(opportunity.deadline)}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {opportunity.salaryMin ? (
            <p className="text-sm font-medium">
              {opportunity.currency} {opportunity.salaryMin.toLocaleString()}
              {opportunity.salaryMax ? ` – ${opportunity.salaryMax.toLocaleString()}` : "+"}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Salary negotiable</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}