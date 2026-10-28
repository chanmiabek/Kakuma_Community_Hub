'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Globe2, LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials, cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Community', href: '/community' },
  { name: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dashboardHref =
    session?.user?.role === 'ORGANIZATION'
      ? '/organizations'
      : session?.user?.role === 'BUSINESS'
        ? '/businesses'
        : '/dashboard'
  const settingsHref =
    session?.user?.role === 'ORGANIZATION'
      ? '/organizations/profile'
      : session?.user?.role === 'BUSINESS'
        ? '/businesses/profile'
        : '/dashboard/profile'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <nav className="container flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
              <Globe2 className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-950">Kakuma<span className="text-primary">Hub</span></span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary',
                  pathname === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user!.image || ''} alt={session.user!.name || ''} />
                    <AvatarFallback>{getInitials(session.user!.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user!.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user!.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href={dashboardHref}>
                <LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={settingsHref}><User className="mr-2 h-4 w-4" />Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={settingsHref}><Settings className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}><LogOut className="mr-2 h-4 w-4" />Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block"><Button variant="ghost">Sign in</Button></Link>
              <Link href="/register" className="hidden sm:block"><Button className="rounded-lg px-5 shadow-sm">Get Started</Button></Link>
            </>
          )}

          <Button variant="ghost" className="h-10 w-10 rounded-lg md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container space-y-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary',
                  pathname === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {status !== 'authenticated' && (
              <div className="flex flex-col gap-2 border-t pt-4">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}><Button variant="outline" className="w-full">Sign in</Button></Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}><Button className="w-full">Get Started</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

