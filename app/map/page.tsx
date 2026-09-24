"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Skeleton } from "@/components/ui/skeleton";

const MapView = dynamic(() => import("@/components/maps/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Map</h1>
        <p className="mt-2 text-muted-foreground">Explore businesses, services and community reports</p>
        <div className="mt-6 overflow-hidden rounded-lg border">
          <MapView />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}