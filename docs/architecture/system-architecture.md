
# System Architecture

Kakuma Community Hub is a Next.js 15 (App Router) application with:

- **Frontend**: React Server Components + client components, Tailwind v4, shadcn/ui.
- **Backend**: Route handlers under `src/app/api`, server actions under `src/features/*/actions.ts`.
- **Database**: PostgreSQL via Prisma. Vector column for semantic search (`pgvector`).
- **Auth**: Auth.js v5 with credentials + Prisma adapter.
- **AI**: OpenAI-compatible client for chat, embeddings, and RAG.

## Layers

1. UI (`src/app`, `src/components`)
2. Feature modules (`src/features/*`) — validations, actions, queries
3. Services & repositories (`src/server/*`)
4. Data & AI (`src/lib/db.ts`, `src/ai/*`)
