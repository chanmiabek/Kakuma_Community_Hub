import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return 
  <main className="min-h-screen bg-background">
    <div className="border-b bg-white">
      <div className="container flex h-18 items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-9 w-32" />
        </div>
        </div>
        <section className="container py-10">
          <Skeleton className="h-80 w-full rounded-3xl" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
          </div>
          <Skeleton className="mt-10 h-8 w-64" />
          <div className="mt-5 grid gap-5 md:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        </section>
  </main>;
}
