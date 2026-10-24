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
    imageUrl?: string | null;
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
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-40 overflow-hidden bg-muted">
          <img src={opportunity.imageUrl || "/images/kenya-turkana-region-refugee-camp-kakuma-vocational-training-typewriter-G47N0B.jpg"} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          {opportunity.category && <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800">{opportunity.category}</span>}
        </div>
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