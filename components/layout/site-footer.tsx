import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-900/30 bg-[#043c32] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">K</span>
              Kakuma Hub
            </div>
            <p className="mt-3 text-sm text-emerald-100/80">{siteConfig.description}</p>
          </div>

          <FooterCol title="Explore" links={[
            { href: "/opportunities", label: "Opportunities" },
            { href: "/organizations", label: "Organizations" },
            { href: "/businesses", label: "Businesses" },
            { href: "/services", label: "Services" },
          ]} />

          <FooterCol title="Community" links={[
            { href: "/events", label: "Events" },
            { href: "/community", label: "Reports" },
            { href: "/map", label: "Map" },
            { href: "/ai", label: "AI Assistant" },
          ]} />

          <FooterCol title="Account" links={[
            { href: "/login", label: "Sign in" },
            { href: "/register", label: "Create account" },
            { href: "/dashboard", label: "Dashboard" },
          ]} />
        </div>

        <p className="mt-8 border-t border-emerald-100/20 pt-6 text-center text-xs text-emerald-100/70">
          © {new Date().getFullYear()} Kakuma Community Hub. Built with care.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-emerald-100/80">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
