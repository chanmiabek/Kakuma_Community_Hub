import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  organization: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logoUrl?: string | null;
    coverUrl?: string | null;
    address?: string | null;
    camp?: string | null;
    verificationStatus: string;
  };
};

export function OrganizationCard({ organization }: Props) {
  return (
    <Link href={`/organizations/${organization.slug}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-32 overflow-hidden bg-muted">
          <img src={organization.coverUrl || "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_01.jpg"} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
        </div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
              {organization.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold leading-tight">{organization.name}</h3>
                {organization.verificationStatus === "VERIFIED" && (
                  <BadgeCheck className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {organization.address ?? organization.camp ?? "Kakuma"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{organization.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}