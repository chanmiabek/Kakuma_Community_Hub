"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Compass, HeartHandshake, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const groups = [
  { label: "Discover", icon: Compass, items: [{ href: "/opportunities", label: "Opportunities" }, { href: "/organizations", label: "Organizations" }, { href: "/businesses", label: "Businesses" }, { href: "/services", label: "Services" }] },
  { label: "Community", icon: Users, items: [{ href: "/events", label: "Events" }, { href: "/community", label: "Community reports" }, { href: "/map", label: "Community map" }] },
  { label: "Support", icon: HeartHandshake, items: [{ href: "/ai", label: "AI recommendations" }, { href: "/about", label: "About Kakuma Hub" }] },
];

export function Navigation() {
  const pathname = usePathname();
  return <nav className="hidden items-center gap-1 md:flex">{groups.map((group) => {
    const active = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
    const Icon = group.icon;
    return <DropdownMenu key={group.label}>
      <DropdownMenuTrigger className={cn("inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold outline-none transition hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary/10", active ? "text-primary" : "text-slate-600")}><Icon className="h-4 w-4" />{group.label}<ChevronDown className="h-3.5 w-3.5" /></DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 rounded-xl p-2">
        <DropdownMenuLabel className="px-3 text-xs uppercase tracking-wider text-muted-foreground">{group.label}</DropdownMenuLabel>
        {group.items.map((item) => <DropdownMenuItem key={item.href} asChild className="rounded-lg"><Link href={item.href} className={cn("w-full", pathname === item.href && "font-semibold text-primary")}>{item.label}</Link></DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>;
  })}</nav>;
}
