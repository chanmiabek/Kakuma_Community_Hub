import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ThumbsUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Props = {
  report: {
    id: string;
    title: string;
    description: string;
    imageUrls?: string[];
    category: string;
    status: string;
    location?: string | null;
    upvotes: number;
    createdAt: Date;
    author: { name: string | null; image: string | null };
  };
};

export function ReportCard({ report }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{report.title}</h3>
          <Badge variant={report.status === "OPEN" ? "destructive" : "secondary"}>{report.status}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {report.author.name ?? "Anonymous"} · {formatDate(report.createdAt)}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm text-muted-foreground">{report.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {report.location ?? "Kakuma"}</span>
          <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {report.upvotes}</span>
        </div>
        <Badge variant="outline">{report.category}</Badge>
      </CardContent>
    </Card>
  );
}