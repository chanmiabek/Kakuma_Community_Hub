import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="space-y-2">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{u.name ?? "Unnamed"}</p>
                <p className="text-sm text-muted-foreground">{u.email} · Joined {formatDate(u.createdAt)}</p>
              </div>
              <Badge>{u.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}