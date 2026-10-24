# Upgrade plan: Kakuma Community Hub

This document tracks a safe, incremental path to improving the existing application without replacing working features blindly.

## Current stack

- Next.js App Router, React 19, and TypeScript
- Tailwind CSS and Radix UI primitives
- Prisma with PostgreSQL and pgvector
- NextAuth, Vitest, and Playwright
- AI-powered search and recommendations

## Upgrade principles

1. Preserve the existing application routes and domain behavior unless a change is justified.
2. Keep UI changes responsive, keyboard-accessible, and usable with reduced motion.
3. Validate all untrusted input at API boundaries and enforce authorization on the server.
4. Keep secrets in environment variables; never expose service keys in client code or logs.
5. Make database changes with reviewed migrations and a backup/rollback plan.
6. Verify changes with type-checking, linting, unit/integration tests, and a production build where environment access permits.

## Delivery checklist

### Design system and experience
- [x] Consolidate global theme tokens and base interaction styles.
- [x] Respect reduced-motion preferences and visible keyboard focus.
- [ ] Audit public pages for consistent spacing, typography, empty states, loading states, and error states.
- [ ] Audit small-screen navigation, forms, tables, and admin views.
- [ ] Check contrast and image alternative text across key flows.

### Image uploads and content publishing
- [x] Add authenticated, signed Cloudinary uploads with a 5 MB limit and an image MIME allowlist.
- [x] Allow optional organization/business logo and cover images, opportunity banners, community-report photos, product images, and service images.
- [x] Provide photographic fallbacks so content remains attractive when an uploader leaves images blank.
- [ ] Configure Cloudinary credentials in local and deployment environments.
- [ ] Apply the Prisma schema update to the database and regenerate Prisma Client.

### Reliability and security
- [ ] Reproduce and fix current database initialization/connectivity failures.
- [ ] Review authentication, role checks, and object-level authorization on every protected route.
- [ ] Validate API payloads and query parameters with Zod; return consistent error responses.
- [ ] Add rate limiting and abuse controls to authentication, search, and AI endpoints.
- [ ] Confirm AI provider keys are server-only and failures are handled without leaking internals.
- [ ] Review pgvector/Prisma integration and the production migration workflow.

### Testing and operations
- [ ] Run lint and TypeScript checks.
- [ ] Run unit tests and integration tests against a disposable test database.
- [ ] Add or update end-to-end coverage for registration, login, opportunity search, application submission, and admin moderation.
- [ ] Run a production build with documented environment variables.
- [ ] Document deployment, backups, migrations, observability, and incident recovery.

## Local verification

Use Node.js 20 or newer and install dependencies using the repository's package manager. Configure local environment variables from `.env.example`, start PostgreSQL/pgvector using the documented Docker setup, then run:

```bash
npm run db:generate
npm run typecheck
npm run lint
npm test
npm run build
```

Some checks require a reachable database and valid provider credentials. Record environment-dependent failures separately from code failures; do not claim a clean production build until it has been run successfully.
