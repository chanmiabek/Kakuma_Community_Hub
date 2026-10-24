import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/shared/hero-section";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { name: "asc" } });
  const byCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <HeroSection title="Skills & learning" eyebrow="Grow your future" description="Explore practical skills, learn from others and discover new ways to contribute." imageUrl="/images/the_right_to_learn_how_aid_reclaimed_childhood_for_binta_and_Mu-azu_07-8.jpg" />

        <div className="mt-8 space-y-8">
          {Object.entries(byCategory).map(([category, list]) => (
            <section key={category}>
              <h2 className="mb-3 text-xl font-semibold">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((s) => (
                  <Card key={s.id}>
                    <CardHeader><CardTitle className="text-base">{s.name}</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {s.description ?? "No description"}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}