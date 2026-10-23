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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto flex h-[4.25rem] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Kakuma Community Hub home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">K</span>
            <span className="hidden text-base font-extrabold tracking-tight text-slate-950 sm:inline md:text-lg">Kakuma <span className="text-primary">Hub</span></span>
          </Link>
          <Navigation />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/opportunities" aria-label="Search opportunities" className="hidden rounded-xl p-2.5 text-slate-600 transition hover:bg-emerald-50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:inline-flex">
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <MobileNav />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="hidden rounded-xl border-slate-200 px-4 sm:inline-flex">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl px-4 font-semibold shadow-sm">
                <Link href="/register">Join the hub</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
