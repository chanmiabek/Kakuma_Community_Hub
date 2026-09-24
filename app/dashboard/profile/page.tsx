import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    include: { profile: true, skills: { include: { skill: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Card>
        <CardHeader><CardTitle>Personal information</CardTitle></CardHeader>
        <CardContent>
          <ProfileForm user={user!} />
        </CardContent>
      </Card>
    </div>
  );
}