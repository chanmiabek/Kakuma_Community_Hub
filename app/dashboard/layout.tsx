import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={session.user.role} />
      <div className="flex flex-1 flex-col">
        <DashboardTopbar user={session.user} />
        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}