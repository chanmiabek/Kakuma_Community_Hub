import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function OrganizationDashboard() {
  const session = await auth();
  const org = await prisma.organization.findUnique({
    where: { ownerId: session!.user.id },
    include: { _count: { select: { opportunities: true, services: true, events: true } } },
  });

  if (!org) {
    return (
      <Card>
        <CardHeader><CardTitle>Set up your organization</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Create your organization profile to publish opportunities.
          </p>
          <Button asChild><Link href="/organizations/profile">Create profile</Link></Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{org.name}</h1>
        <p className="text-muted-foreground">Organization dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Opportunities" value={org._count.opportunities} />
        <Stat label="Services" value={org._count.services} />
        <Stat label="Events" value={org._count.events} />
      </div>

      <Card>
        <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild><Link href="/organizations/opportunities/create">Post opportunity</Link></Button>
          <Button asChild variant="outline"><Link href="/organizations/applications">View applications</Link></Button>
          <Button asChild variant="outline"><Link href="/organizations/profile">Edit profile</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{label}</CardTitle></CardHeader>
      <CardContent><div className="text-3xl font-bold">{value}</div></CardContent>
    </Card>
  );
}