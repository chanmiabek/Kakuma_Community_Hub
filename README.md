# Kakuma Community Hub

## Executive summary

Kakuma Community Hub is a Next.js platform intended to help community members discover opportunities, organizations, businesses, services, events, and community resources. Its planned experience includes public pages, member dashboards, and administrative tools, supported by a shared search and recommendation layer.

The application uses PostgreSQL with the `pgvector` extension and Prisma for data access. The architecture also describes future AI capabilities—including semantic search, embeddings, recommendations, and retrieval-augmented generation (RAG). Optional image uploads use signed Cloudinary uploads, so listings and profiles can be published with or without images.

The codebase is organized to keep route pages, reusable UI, feature logic, server-side business logic, and shared infrastructure separate. The structure below is a recommended architecture; check the current source tree when locating implemented features.

## Developer onboarding checklist

### Prerequisites

- [ ] Install Node.js and a package manager (npm, yarn, pnpm, or bun).
- [ ] Install and start Docker Desktop, or ensure the Docker Engine is available.
- [ ] Clone the repository and open its project directory.

### Set up the environment

- [ ] Create a local `.env` file using `.env.example` as a reference.
- [ ] Set the database connection details required by the local environment.
- [ ] If you need image uploads, configure the Cloudinary variables below. These are optional for development without uploads.

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Keep credentials private:** never use `NEXT_PUBLIC_` for `CLOUDINARY_API_SECRET`, and never commit real credentials.

### Start the database and prepare Prisma

- [ ] Start the local PostgreSQL database:

```bash
docker compose up -d db
```

- [ ] Apply the Prisma schema to the database:

```bash
npx prisma db push
```

The database uses PostgreSQL with `pgvector`. If Docker cannot connect to the Docker Engine, start Docker Desktop and retry.

### Install dependencies and run the app

- [ ] Install dependencies with the package manager used by the project. For npm:

```bash
npm install
```

- [ ] Start the development server:

```bash
npm run dev
```

- [ ] Open [http://localhost:3000](http://localhost:3000).
- [ ] Run the project's available checks before submitting changes. Check `package.json` for the supported scripts.

The starter Next.js page is typically at `src/app/page.tsx` (or `app/page.tsx`, depending on the current project layout). The page updates as you edit and save it.

## Features and architecture

The platform is organized around these areas:

- **Public experience:** landing page and discovery of opportunities, organizations, businesses, services, skills, events, and community resources.
- **Member experience:** account, profile, applications, bookmarks, notifications, and recommendations.
- **Organization and business tools:** profiles and management of listings and opportunities.
- **Administration:** management and verification workflows for platform content and accounts.
- **Search and AI:** global and semantic search, recommendations, embeddings, and RAG, backed by PostgreSQL and `pgvector`.

### Project structure

The README's recommended structure separates responsibilities as follows:

| Directory | Responsibility |
| --- | --- |
| `src/app/` | Pages, layouts, and API routes |
| `src/components/` | Reusable interface components |
| `src/features/` | Feature-specific application logic |
| `src/server/` | Server-side services, repositories, and jobs |
| `src/ai/` | AI, embeddings, RAG, and recommendation logic |
| `src/lib/` | Shared infrastructure, utilities, and permissions |
| `src/types/` | TypeScript types |
| `src/config/` | Application configuration |
| `prisma/` | Database schema and seed data |
| `tests/` | Unit, integration, and end-to-end tests |
| `docs/` | Architecture, API, deployment, and product documentation |

Keep route files focused on pages and routing; put reusable UI and business logic in their corresponding components and feature/server modules.

### Optional image uploads

Cloudinary uploads are signed. Profile logos and cover images, opportunity banners, community report photos, business products, and services may include images or be published without them. The uploader accepts JPG, PNG, WebP, and AVIF files up to 5 MB.

## Useful links

- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [API documentation](docs/api/README.md)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Deploy on Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
