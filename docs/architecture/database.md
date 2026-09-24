
# Database

Prisma schema lives in `prisma/schema.prisma`.

Key models: `User`, `Profile`, `Organization`, `Business`, `Opportunity`, `Application`, `Service`, `Product`, `Skill`, `Event`, `CommunityReport`, `Notification`, `Embedding`.

Requires PostgreSQL extensions: `pg_trgm` and `vector`.

## Common commands

- `npm run db:migrate` — create + apply a migration (dev)
- `npm run db:deploy` — apply migrations in production
- `npm run db:seed` — seed sample data
- `npm run db:studio` — browse data
