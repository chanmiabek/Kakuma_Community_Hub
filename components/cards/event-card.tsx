import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

type Props = {
  event: {
    id: string;
    title: string;
    description: string;
    type: string;
    location?: string | null;
    isOnline: boolean;
    startsAt: Date;
  };
};

export function EventCard({ event }: Props) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-tight">{event.title}</h3>
            <Badge variant="secondary">{event.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /> {formatDateTime(event.startsAt)}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {event.isOnline ? "Online" : event.location}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}