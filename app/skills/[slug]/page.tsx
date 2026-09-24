import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

type Params = Promise<{ slug: string }>;

export default async function SkillPage({ params }: { params: Params }) {
  const { slug } = await params;
  const skill = await prisma.skill.findUnique({
    where: { slug },
    include: { users: { include: { user: { select: { id: true, name: true, image: true } } } } },
  });
  if (!skill) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">{skill.name}</h1>
        <p className="mt-2 text-muted-foreground">{skill.category}</p>
        {skill.description && <p className="mt-4 text-sm">{skill.description}</p>}

        <h2 className="mt-8 mb-3 text-xl font-semibold">People with this skill</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skill.users.map((us) => (
            <Card key={us.id}>
              <CardContent className="pt-6">
                <p className="font-medium">{us.user.name}</p>
                <p className="text-sm text-muted-foreground">{us.level} · {us.years} yrs</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}