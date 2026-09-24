import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { OrganizationProfileForm } from "@/components/forms/organization-profile-form";

export default async function OrganizationProfilePage() {
  const session = await auth();
  const org = await prisma.organization.findUnique({ where: { ownerId: session!.user.id } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Organization profile</h1>
      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent>
          <OrganizationProfileForm organization={org} />
        </CardContent>
      </Card>
    </div>
  );
}