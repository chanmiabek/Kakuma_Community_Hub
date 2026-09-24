import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

export default async function NotificationsPage() {
  const session = await auth();
  const items = await prisma.notification.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  await prisma.notification.updateMany({
    where: { userId: session!.user.id, readAt: null },
    data: { readAt: new Date() },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      {items.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <Card key={n.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{n.title}</p>
                    {n.body && <p className="text-sm text-muted-foreground">{n.body}</p>}
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatDateTime(n.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}