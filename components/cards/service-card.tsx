import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  service: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    price?: string | null;
    address?: string | null;
  };
};

export function ServiceCard({ service }: Props) {
  return (
    <Link href={`/services/${service.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">{service.title}</h3>
            <Badge variant="secondary">{service.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
          {service.price && <p className="text-sm font-medium">{service.price}</p>}
          {service.address && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {service.address}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}