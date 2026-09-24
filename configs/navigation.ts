import {
    Briefcase, Building2, MapPin, Sparkles, Store, Users, Calendar, Wrench, LayoutDashboard,
    FileText, Bookmark, Bell, User, ShieldCheck, BarChart3, Tags, ClipboardList, ListChecks,
  } from "lucide-react";
  
  export const mainNav = [
    { href: "/opportunities", label: "Opportunities", icon: Briefcase },
    { href: "/organizations", label: "Organizations", icon: Building2 },
    { href: "/businesses", label: "Businesses", icon: Store },
    { href: "/services", label: "Services", icon: Wrench },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/community", label: "Community", icon: Users },
    { href: "/map", label: "Map", icon: MapPin },
    { href: "/ai", label: "AI", icon: Sparkles },
  ];
  
  export type SidebarItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
  
  export function getSidebarNav(role: string, hasProfile?: boolean): SidebarItem[] {
    if (role === "ADMIN") {
      return [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/organizations", label: "Organizations", icon: Building2 },
        { href: "/admin/businesses", label: "Businesses", icon: Store },
        { href: "/admin/opportunities", label: "Opportunities", icon: Briefcase },
        { href: "/admin/services", label: "Services", icon: Wrench },
        { href: "/admin/reports", label: "Reports", icon: ClipboardList },
        { href: "/admin/verification", label: "Verification", icon: ShieldCheck },
        { href: "/admin/categories", label: "Categories", icon: Tags },
        { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      ];
    }
  
    if (role === "ORGANIZATION") {
      return [
        { href: "/organization", label: "Overview", icon: LayoutDashboard },
        { href: "/organization/profile", label: "Profile", icon: Building2 },
        { href: "/organization/opportunities", label: "Opportunities", icon: Briefcase },
        { href: "/organization/applications", label: "Applications", icon: FileText },
        { href: "/organization/verification", label: "Verification", icon: ShieldCheck },
      ];
    }
  
    if (role === "BUSINESS") {
      return [
        { href: "/business", label: "Overview", icon: LayoutDashboard },
        { href: "/business/profile", label: "Profile", icon: Store },
        { href: "/business/products", label: "Products", icon: ListChecks },
        { href: "/business/services", label: "Services", icon: Wrench },
        { href: "/business/verification", label: "Verification", icon: ShieldCheck },
      ];
    }
  
    return [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/profile", label: "Profile", icon: User },
      { href: "/dashboard/recommendations", label: "Recommended", icon: Sparkles },
      { href: "/dashboard/applications", label: "Applications", icon: FileText },
      { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
      { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    ];
  }
