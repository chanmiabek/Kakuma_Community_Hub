"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/navigation/user-menu";
import type { Session } from "next-auth";

export function DashboardTopbar({ user }: { user: Session["user"] }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h2 className="text-sm font-medium text-muted-foreground">Dashboard</h2>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/notifications"><Bell className="h-4 w-4" /></Link>
        </Button>
        <UserMenu user={user} />
      </div>
    </header>
  );
}