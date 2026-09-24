import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  business: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    address?: string | null;
    camp?: string | null;
    verificationStatus: string;
  };
};

export function BusinessCard({ business }: Props) {
  return (
    <Link href={`/businesses/${business.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
              {business.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold leading-tight">{business.name}</h3>
                {business.verificationStatus === "VERIFIED" && <BadgeCheck className="h-4 w-4 text-primary" />}
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {business.address ?? business.camp ?? "Kakuma"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge variant="secondary">{business.category}</Badge>
          <p className="line-clamp-2 text-sm text-muted-foreground">{business.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}