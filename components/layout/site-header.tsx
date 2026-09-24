"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation/navigation";
import { UserMenu } from "@/components/navigation/user-menu";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function SiteHeader() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-[4.5rem] items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">K</span>
            <span className="hidden text-lg font-bold tracking-tight text-slate-950 sm:inline">Kakuma <span className="text-primary">Hub</span></span>
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center gap-2">
          <Link href="/opportunities" aria-label="Search opportunities" className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary sm:block"><Search className="h-5 w-5" /></Link>
          <MobileNav />
          {session?.user ? <UserMenu user={session.user} /> : <><Button asChild variant="outline" size="sm" className="hidden rounded-lg sm:inline-flex"><Link href="/login">Sign in</Link></Button><Button asChild size="sm" className="rounded-lg"><Link href="/register">Get Started</Link></Button></>}
        </div>
      </div>
    </header>
  );
}


