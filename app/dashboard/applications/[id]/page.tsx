import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

type Params = Promise<{ id: string }>;

export default async function ApplicationDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  const app = await prisma.application.findFirst({
    where: { id, userId: session!.user.id },
    include: { opportunity: { include: { organization: true } } },
  });
  if (!app) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{app.opportunity.title}</h1>
      <Card>
        <CardHeader><CardTitle>Application status</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge>{app.status}</Badge></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span>{formatDateTime(app.createdAt)}</span></div>
          {app.reviewedAt && <div className="flex justify-between"><span className="text-muted-foreground">Reviewed</span><span>{formatDateTime(app.reviewedAt)}</span></div>}
        </CardContent>
      </Card>
      {app.coverLetter && (
        <Card>
          <CardHeader><CardTitle>Cover letter</CardTitle></CardHeader>
          <CardContent className="whitespace-pre-wrap text-sm">{app.coverLetter}</CardContent>
        </Card>
      )}
    </div>
  );
}