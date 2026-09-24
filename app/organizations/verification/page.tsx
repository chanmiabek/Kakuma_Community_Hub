import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function OrganizationVerificationPage() {
  const session = await auth();
  const org = await prisma.organization.findUnique({ where: { ownerId: session!.user.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verification</h1>
      <Card>
        <CardHeader><CardTitle>Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge>{org?.verificationStatus ?? "NOT_STARTED"}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload your registration documents. Verification typically takes 2–5 business days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}