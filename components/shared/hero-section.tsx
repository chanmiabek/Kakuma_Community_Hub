import type { ReactNode } from "react";

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  imageUrl?: string | null;
  children?: ReactNode;
  className?: string;
};

export function HeroSection({
  eyebrow,
  title,
  description,
  imageUrl,
  children,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`relative isolate overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm ${className}`}>
      <img
        src={imageUrl || "/images/life_in_Kakuma_hope_and_resilience_in_a_refugee_camp_08.jpg"}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/35" />
      <div className="relative flex min-h-56 flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12 lg:min-h-64 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{eyebrow}</p>}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{description}</p>}
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </section>
  );
}
