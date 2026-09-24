import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BusinessProfileForm } from "@/components/forms/business-profile-form";

export default async function BusinessProfilePage() {
  const session = await auth();
  const biz = await prisma.business.findUnique({ where: { ownerId: session!.user.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Business profile</h1>
      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent><BusinessProfileForm business={biz} /></CardContent>
      </Card>
    </div>
  );
}