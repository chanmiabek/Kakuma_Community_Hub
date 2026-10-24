import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, FileText } from "lucide-react";

interface HeroProps {
  stats: { users: number; opportunities: number; applications: number };
  imageUrl?: string | null;
}

export function Hero({ stats, imageUrl }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <img
        src={imageUrl || "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_10.jpg"}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-primary/35" />
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-amber-300">Community, connection, opportunity</p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Building a <span className="text-amber-300">Stronger Community</span> Through Opportunities
          </h1>
          <p className="mb-8 text-lg leading-8 text-white/80 md:text-xl">
            Discover jobs, education, and volunteer opportunities in Kakuma. Connect with community members and build your future.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg"><Link href="/opportunities">Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Link href="/register">Join Community</Link></Button>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur sm:grid-cols-3">
            <Stat icon={<Users className="h-7 w-7 text-amber-300" />} value={stats.users} label="Community Members" />
            <Stat icon={<Briefcase className="h-7 w-7 text-amber-300" />} value={stats.opportunities} label="Opportunities" />
            <Stat icon={<FileText className="h-7 w-7 text-amber-300" />} value={stats.applications} label="Applications" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return <div className="flex items-center justify-center gap-3">{icon}<div className="text-left"><div className="text-2xl font-bold">{value.toLocaleString()}</div><div className="text-sm text-white/70">{label}</div></div></div>;
}
