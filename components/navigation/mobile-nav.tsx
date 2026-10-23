"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mainNav } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs rounded-2xl p-5">
        <DialogHeader>
          <DialogTitle className="text-left text-lg">Explore Kakuma Hub</DialogTitle>
        </DialogHeader>
        <nav aria-label="Mobile navigation" className="mt-2 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-current={pathname === "/" ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${pathname === "/" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-secondary hover:text-primary"}`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${active ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-secondary hover:text-primary"}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 border-t pt-3">
            <p className="px-3 text-xs leading-5 text-muted-foreground">
              Find opportunities, local services, organizations, and community resources.
            </p>
          </div>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
