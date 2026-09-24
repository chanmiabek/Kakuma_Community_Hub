import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation/navigation";
import { UserMenu } from "@/components/navigation/user-menu";
import { MobileNav } from "@/components/navigation/mobile-nav";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">K</span>
            <span className="hidden sm:inline">Kakuma Hub</span>
          </Link>
          <Navigation />
        </div>

        <div className="flex items-center gap-2">
          <MobileNav />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link href="/login">Sign in</Link></Button>
              <Button asChild size="sm"><Link href="/register">Sign up</Link></Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}