This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Local database

This project uses PostgreSQL with the `pgvector` extension. Start the database before running Prisma or opening pages that read database data:

```bash
docker compose up -d db
npx prisma db push
```

If Docker reports that it cannot connect to the Docker Engine, start Docker Desktop and run those commands again. The local connection settings are documented in `.env.example`.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# basic Startup

Start with exactly these:

kakuma-community-hub/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   └── api/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── navigation/
│   │   └── landing/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   └── opportunities/
│   │
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── permissions.ts
│   │
│   └── types/
│
├── public/
├── tests/
├── docs/
├── .env.example
├── README.md
└── package.json


🏗️ Recommended Project Structure
kakuma-community-hub/
│
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── components.json
├── middleware.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│       └── ...
│
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── opportunities/
│   │   ├── organizations/
│   │   ├── businesses/
│   │   └── services/
│   │
│   ├── icons/
│   └── manifest.json
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── opportunities/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── categories/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── organizations/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── businesses/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── skills/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── map/
│   │   │   └── page.tsx
│   │   │
│   │   ├── community/
│   │   │   ├── page.tsx
│   │   │   └── reports/
│   │   │       ├── page.tsx
│   │   │       └── create/
│   │   │           └── page.tsx
│   │   │
│   │   ├── ai/
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── recommendations/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── applications/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── bookmarks/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── notifications/
│   │   │       └── page.tsx
│   │   │
│   │   ├── organization/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── opportunities/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── applications/
│   │   │   │   └── page.tsx
│   │   │   └── verification/
│   │   │       └── page.tsx
│   │   │
│   │   ├── business/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   └── verification/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── organizations/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── businesses/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── opportunities/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── verification/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       │
│   │       ├── users/
│   │       │   └── route.ts
│   │       │
│   │       ├── opportunities/
│   │       │   └── route.ts
│   │       │
│   │       ├── organizations/
│   │       │   └── route.ts
│   │       │
│   │       ├── businesses/
│   │       │   └── route.ts
│   │       │
│   │       ├── services/
│   │       │   └── route.ts
│   │       │
│   │       ├── applications/
│   │       │   └── route.ts
│   │       │
│   │       ├── notifications/
│   │       │   └── route.ts
│   │       │
│   │       ├── reports/
│   │       │   └── route.ts
│   │       │
│   │       ├── search/
│   │       │   └── route.ts
│   │       │
│   │       └── ai/
│   │           ├── chat/
│   │           │   └── route.ts
│   │           ├── recommendations/
│   │           │   └── route.ts
│   │           └── search/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── cards/
│   │   ├── forms/
│   │   ├── modals/
│   │   ├── tables/
│   │   ├── charts/
│   │   ├── maps/
│   │   ├── ai/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── actions.ts
│   │   │   ├── queries.ts
│   │   │   ├── validations.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── users/
│   │   ├── opportunities/
│   │   ├── organizations/
│   │   ├── businesses/
│   │   ├── services/
│   │   ├── applications/
│   │   ├── skills/
│   │   ├── events/
│   │   ├── notifications/
│   │   ├── community-reports/
│   │   ├── search/
│   │   └── recommendations/
│   │
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── permissions.ts
│   │   ├── validation.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── pagination.ts
│   │   └── errors.ts
│   │
│   ├── server/
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   │   ├── opportunity.service.ts
│   │   │   ├── organization.service.ts
│   │   │   ├── business.service.ts
│   │   │   ├── application.service.ts
│   │   │   └── recommendation.service.ts
│   │   │
│   │   ├── repositories/
│   │   │   ├── user.repository.ts
│   │   │   ├── opportunity.repository.ts
│   │   │   ├── organization.repository.ts
│   │   │   └── business.repository.ts
│   │   │
│   │   └── jobs/
│   │       ├── recommendation.job.ts
│   │       └── embedding.job.ts
│   │
│   ├── ai/
│   │   ├── client.ts
│   │   ├── prompts/
│   │   │   ├── assistant.prompt.ts
│   │   │   ├── recommendation.prompt.ts
│   │   │   └── search.prompt.ts
│   │   │
│   │   ├── embeddings/
│   │   │   ├── generate.ts
│   │   │   └── search.ts
│   │   │
│   │   ├── rag/
│   │   │   ├── retrieve.ts
│   │   │   ├── context.ts
│   │   │   └── answer.ts
│   │   │
│   │   ├── recommendations/
│   │   │   ├── score.ts
│   │   │   ├── rank.ts
│   │   │   └── explain.ts
│   │   │
│   │   └── types.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── opportunity.ts
│   │   ├── organization.ts
│   │   ├── business.ts
│   │   ├── service.ts
│   │   ├── application.ts
│   │   ├── ai.ts
│   │   └── api.ts
│   │
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── categories.ts
│   │   └── permissions.ts
│   │
│   └── hooks/
│       ├── use-mobile.ts
│       ├── use-debounce.ts
│       ├── use-search.ts
│       └── use-notifications.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture/
│   │   ├── system-architecture.md
│   │   ├── database.md
│   │   └── ai-architecture.md
│   │
│   ├── api/
│   ├── deployment/
│   └── product/
│       ├── requirements.md
│       └── user-stories.md
│
├── docker/
│   └── ...
│
└── .github/
    └── workflows/
        ├── ci.yml
        ├── test.yml
        └── deploy.yml
🧭 How the structure works

The most important folders are these:



src/
│
├── app/          → Pages and routes
├── components/   → Reusable UI
├── features/     → Feature-specific frontend logic
├── server/       → Backend/business logic
├── ai/           → AI & recommendation engine
├── lib/          → Shared infrastructure
├── types/        → TypeScript types
└── config/       → Application configuration

This prevents your app/ directory from becoming a giant collection of business logic.

🏠 1. Landing page

Your generated landing page goes here:

src/
└── app/
    └── page.tsx

But don't put the entire landing page into page.tsx.

Instead:

src/components/
├── navigation/
│   ├── Navbar.tsx
│   ├── DesktopMenu.tsx
│   ├── MobileMenu.tsx
│   └── DropdownMenu.tsx
│
└── landing/
    ├── Hero.tsx
    ├── SearchSection.tsx
    ├── ImpactStats.tsx
    ├── FeatureGrid.tsx
    ├── FeaturedOpportunities.tsx
    ├── AIRecommendationBanner.tsx
    ├── HowItWorks.tsx
    ├── CommunityCTA.tsx
    └── Footer.tsx


# Project Architecture

⭐ The architecture I recommend you actually use

If I were building this project with you, I'd keep the mental model very simple:

                    KAKUMA COMMUNITY HUB_Platform
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
        PUBLIC             USERS             ADMIN
          │                  │                  │
          ▼                  ▼                  ▼
     Landing Page       Dashboard          Admin Panel
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                         FEATURES
                             │
       ┌──────────┬──────────┼─────────┬──────────┐
       ▼          ▼          ▼         ▼          ▼
 Opportunities Organizations Businesses Services Applications
       │          │          │         │          │
       └──────────┴──────────┼─────────┴──────────┘
                             ▼
                          SEARCH
                             │
                             ▼
                     RECOMMENDATION
                             │
                             ▼
                            AI
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
                  RAG             Embeddings
                    │                 │
                    └────────┬────────┘
                             ▼
                        PostgreSQL
                           + pgvector
