import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function BusinessVerificationPage() {
  const session = await auth();
  const biz = await prisma.business.findUnique({ where: { ownerId: session!.user.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verification</h1>
      <Card>
        <CardHeader><CardTitle>Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Badge>{biz?.verificationStatus ?? "NOT_STARTED"}</Badge>
          <p className="text-sm text-muted-foreground">
            Submit your business permit to get verified. Verified businesses rank higher.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}