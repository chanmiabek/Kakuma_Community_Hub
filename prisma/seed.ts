import { PrismaClient, Role, OpportunityType, OpportunityStatus, VerificationStatus, EventType, ReportCategory, ReportStatus, SkillLevel } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Kakuma Community Hub...");

  const password = await bcrypt.hash("Password123!", 10);

  // ── Admin ─────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@kakuma-hub.org" },
    update: {},
    create: {
      email: "admin@kakuma-hub.org",
      name: "Hub Administrator",
      passwordHash: password,
      role: Role.ADMIN,
      emailVerified: new Date(),
      profile: { create: { headline: "Platform Administrator" } },
    },
  });

  // ── Job seeker ────────────────────────────────────────
  const seeker = await prisma.user.upsert({
    where: { email: "amina@example.com" },
    update: {},
    create: {
      email: "amina@example.com",
      name: "Amina Yusuf",
      passwordHash: password,
      role: Role.USER,
      phone: "+254700000001",
      location: "Kakuma 1, Block 3",
      languages: ["Swahili", "English", "Somali"],
      emailVerified: new Date(),
      profile: {
        create: {
          headline: "Junior Web Developer",
          summary: "Self-taught developer passionate about building community tools.",
          yearsExperience: 2,
          educationLevel: "Diploma",
          availability: "Immediately",
        },
      },
    },
  });

  // ── Organization owner ────────────────────────────────
  const orgOwner = await prisma.user.upsert({
    where: { email: "info@kakumaworks.org" },
    update: {},
    create: {
      email: "info@kakumaworks.org",
      name: "Kakuma Works",
      passwordHash: password,
      role: Role.ORGANIZATION,
      emailVerified: new Date(),
    },
  });

  const org = await prisma.organization.upsert({
    where: { slug: "kakuma-works" },
    update: {},
    create: {
      ownerId: orgOwner.id,
      name: "Kakuma Works",
      slug: "kakuma-works",
      description: "A vocational training and job placement NGO serving Kakuma refugees and host community.",
      mission: "Empower youth through skills and dignified work.",
      email: "info@kakumaworks.org",
      phone: "+254700000010",
      address: "Kakuma 2, Zone 4",
      camp: "Kakuma",
      foundedYear: 2016,
      size: "11-50",
      focusAreas: ["Vocational Training", "Employment", "Youth"],
      verificationStatus: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
      isPublished: true,
    },
  });

  // ── Business owner ────────────────────────────────────
  const bizOwner = await prisma.user.upsert({
    where: { email: "hello@sunrisebakery.co.ke" },
    update: {},
    create: {
      email: "hello@sunrisebakery.co.ke",
      name: "Sunrise Bakery",
      passwordHash: password,
      role: Role.BUSINESS,
      emailVerified: new Date(),
    },
  });

  const business = await prisma.business.upsert({
    where: { slug: "sunrise-bakery" },
    update: {},
    create: {
      ownerId: bizOwner.id,
      name: "Sunrise Bakery",
      slug: "sunrise-bakery",
      description: "Fresh bread, mandazi and pastries baked daily in Kakuma 1.",
      category: "Food & Beverage",
      email: "hello@sunrisebakery.co.ke",
      phone: "+254700000020",
      address: "Kakuma 1, Market Street",
      camp: "Kakuma",
      latitude: 3.7185,
      longitude: 34.8595,
      verificationStatus: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
      isPublished: true,
    },
  });

  // ── Skills ────────────────────────────────────────────
  const skillNames = [
    ["Web Development", "Technology"],
    ["Tailoring", "Vocational"],
    ["Carpentry", "Vocational"],
    ["Solar Installation", "Technology"],
    ["English", "Language"],
    ["Bookkeeping", "Business"],
    ["Catering", "Hospitality"],
    ["Driving", "Logistics"],
  ];
  for (const [name, category] of skillNames) {
    await prisma.skill.upsert({
      where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        category,
      },
    });
  }

  const web = await prisma.skill.findUnique({ where: { slug: "web-development" } });
  if (web) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: seeker.id, skillId: web.id } },
      update: {},
      create: { userId: seeker.id, skillId: web.id, level: SkillLevel.INTERMEDIATE, years: 2 },
    });
  }

  // ── Opportunities ─────────────────────────────────────
  const opportunities = [
    {
      title: "Junior Web Developer",
      slug: "junior-web-developer",
      description: "Build and maintain web applications for community programs.",
      type: OpportunityType.JOB,
      category: "Technology",
      location: "Kakuma",
      salaryMin: 25000,
      salaryMax: 40000,
      tags: ["React", "Node.js", "Remote-friendly"],
    },
    {
      title: "Tailoring Apprenticeship",
      slug: "tailoring-apprenticeship",
      description: "6-month paid apprenticeship in garment production.",
      type: OpportunityType.APPRENTICESHIP,
      category: "Vocational",
      location: "Kakuma 2",
      salaryMin: 12000,
      salaryMax: 18000,
      tags: ["Tailoring", "Hands-on"],
    },
    {
      title: "Solar Technician Training",
      slug: "solar-technician-training",
      description: "Free 12-week training with certification.",
      type: OpportunityType.TRAINING,
      category: "Technology",
      location: "Kakuma 3",
      tags: ["Solar", "Certification"],
    },
  ];

  for (const o of opportunities) {
    await prisma.opportunity.upsert({
      where: { slug: o.slug },
      update: {},
      create: {
        ...o,
        status: OpportunityStatus.OPEN,
        organizationId: org.id,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        publishedAt: new Date(),
      },
    });
  }

  // ── Services ──────────────────────────────────────────
  await prisma.service.upsert({
    where: { slug: "phone-repair" },
    update: {},
    create: {
      title: "Phone Repair",
      slug: "phone-repair",
      description: "Screen replacement, battery and software repair.",
      category: "Repair",
      price: "From KES 500",
      businessId: business.id,
      address: "Kakuma 1 Market",
      latitude: 3.7185,
      longitude: 34.8595,
      isPublished: true,
    },
  });

  // ── Events ────────────────────────────────────────────
  await prisma.event.upsert({
    where: { slug: "kakuma-job-fair-2025" },
    update: {},
    create: {
      title: "Kakuma Job Fair 2025",
      slug: "kakuma-job-fair-2025",
      description: "Meet 30+ employers and training providers.",
      type: EventType.JOB_FAIR,
      location: "Kakuma 1 Community Center",
      startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000),
      organizationId: org.id,
      isPublished: true,
    },
  });

  // ── Community report ──────────────────────────────────
  await prisma.communityReport.create({
    data: {
      authorId: seeker.id,
      title: "Broken water pump at Block 3",
      description: "The main water pump has been broken for 4 days. Residents are walking 2km.",
      category: ReportCategory.WATER,
      status: ReportStatus.OPEN,
      location: "Kakuma 1, Block 3",
      latitude: 3.716,
      longitude: 34.858,
    },
  });

  // ── Categories ────────────────────────────────────────
  const categories = [
    { name: "Technology", slug: "technology", kind: "opportunity" },
    { name: "Vocational", slug: "vocational", kind: "opportunity" },
    { name: "Education", slug: "education", kind: "opportunity" },
    { name: "Healthcare", slug: "healthcare", kind: "opportunity" },
    { name: "Food & Beverage", slug: "food-beverage", kind: "business" },
    { name: "Repair", slug: "repair", kind: "service" },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  console.log("✅ Seed complete.");
  console.log({ admin: admin.email, seeker: seeker.email, org: org.slug, business: business.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });