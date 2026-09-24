import Link from "next/link";
import { Briefcase, BookmarkIcon, Bell, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [applications, bookmarks, unread, recommended] = await Promise.all([
    prisma.application.count({ where: { userId } }),
    prisma.bookmark.count({ where: { userId } }),
    prisma.notification.count({ where: { userId, readAt: null } }),
    prisma.opportunity.findMany({
      where: { status: "OPEN" },
      take: 4,
      orderBy: { publishedAt: "desc" },
      include: { organization: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: "Applications", value: applications, icon: FileText, href: "/dashboard/applications" },
    { label: "Bookmarks", value: bookmarks, icon: BookmarkIcon, href: "/dashboard/bookmarks" },
    { label: "Notifications", value: unread, icon: Bell, href: "/dashboard/notifications" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {session!.user.name ?? "there"}</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Recommended for you</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {recommended.map((o) => (
            <div key={o.id} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div>
                <p className="font-medium">{o.title}</p>
                <p className="text-sm text-muted-foreground">{o.organization.name}</p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/opportunities/${o.id}`}>View</Link>
              </Button>
            </div>
          ))}
          {recommended.length === 0 && <p className="text-sm text-muted-foreground">No recommendations yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}