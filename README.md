# Kakuma Community Hub

## Executive summary

Kakuma Community Hub is a Next.js platform intended to help community members discover opportunities, organizations, businesses, services, events, and community resources. The application also provides member, organization, business, and administrator workflows for managing profiles, applications, listings, and community content.

The project uses PostgreSQL with Prisma for data access, and includes `pgvector`-based AI capabilities for semantic search, recommendations, and retrieval-augmented chat. See the [system architecture](docs/architecture/system-architecture.md), [AI architecture](docs/architecture/ai-architecture.md), and [database architecture](docs/architecture/database.md) documents for more detail.

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

## Features and architecture

The platform is organized around these areas:

- **Public experience:** landing page and discovery of opportunities, organizations, businesses, services, skills, events, and community resources.
- **Member experience:** account, profile, applications, bookmarks, notifications, and recommendations.
- **Organization and business tools:** profiles and management of listings and opportunities.
- **Administration:** management and verification workflows for platform content and accounts.
- **Search and AI:** global and semantic search, recommendations, embeddings, and RAG, backed by PostgreSQL and `pgvector`.

### Architecture overview

The codebase follows a layered Next.js App Router architecture. Route pages and API handlers handle requests and rendering; feature modules contain domain-specific actions, queries, validation, and types; server services and repositories implement business operations and persistence; Prisma and PostgreSQL provide data storage. AI functionality is organized separately and is used by the chat, semantic search, and recommendation flows.

```text
Browser
  └── app/ (Next.js pages, layouts, and API route handlers)
       ├── components/ (shared UI)
       ├── features/ (domain actions, queries, validation, and types)
       ├── server/ (services, repositories, and background jobs)
       ├── ai/ (chat/RAG, embeddings, semantic search, and recommendations)
       └── lib/ (database client, auth, permissions, and shared utilities)
            └── Prisma → PostgreSQL (+ pgvector)
```

### Project structure

This reflects the current repository layout (top-level directories are used; application code is not under `src/`).

| Directory | Responsibility |
| --- | --- |
| `app/` | Next.js App Router pages, layouts, loading states, and API route handlers under `app/api/` |
| `components/` | Shared UI, navigation, forms, cards, maps, and providers |
| `features/` | Domain modules, including actions, queries, validation, and feature types |
| `server/` | Server-side services, repositories, and background jobs |
| `ai/` | AI client, prompts, RAG, embeddings, semantic search, and recommendations |
| `lib/` | Shared infrastructure such as database access, authentication, permissions, and utilities |
| `config/`, `configs/` | Application settings, navigation, categories, and permissions |
| `hooks/` | Reusable React hooks |
| `types/` | Shared TypeScript types and declarations |
| `prisma/` | Prisma schema and database seed data |
| `tests/` | Unit, integration, and end-to-end tests |
| `docs/` | Architecture, API, and project documentation |
| `public/` | Static assets served by the application |

Keep route files focused on pages and routing; put reusable UI and business logic in their corresponding components and feature/server modules.

### Optional image uploads

Cloudinary uploads are signed. Profile logos and cover images, opportunity banners, community report photos, business products, and services may include images or be published without them. The upload route is `app/api/uploads/route.ts`; configure the Cloudinary environment variables above when using uploads.

## Useful links

- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [API documentation](docs/api/README.md)
- [System architecture](docs/architecture/system-architecture.md)
- [AI architecture](docs/architecture/ai-architecture.md)
- [Database architecture](docs/architecture/database.md)
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Deploy on Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
