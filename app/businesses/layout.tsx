import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS") redirect("/login");
  const biz = await prisma.business.findUnique({ where: { ownerId: session.user.id } });

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role="BUSINESS" hasProfile={!!biz} />
      <div className="flex flex-1 flex-col">
        <DashboardTopbar user={session.user} />
        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}