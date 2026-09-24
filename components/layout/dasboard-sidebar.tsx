"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSidebarNav } from "@/config/navigation";

export function DashboardSidebar({ role, hasProfile }: { role: string; hasProfile?: boolean }) {
  const pathname = usePathname();
  const items = getSidebarNav(role, hasProfile);

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">K</span>
            Kakuma Hub
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}