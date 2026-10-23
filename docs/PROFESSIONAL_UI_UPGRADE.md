# Professional UI upgrade

This branch refreshes the Kakuma Community Hub experience while preserving the existing Next.js, TypeScript, Tailwind CSS, authentication, Prisma and PostgreSQL architecture.

## Included
- Updated landing page hierarchy with a clearer call to action and responsive hero.
- Consistent evergreen, cream and warm-gold visual direction.
- Accessible search label, focus states, image alt behavior and reduced-motion support.
- Fixed, statically analyzable category icon color classes rather than dynamically composed Tailwind class names.
- Responsive category cards and more scannable opportunity panels.
- Updated navigation CTA and more descriptive home-page statistic labels.
- Empty/loading states kept in place for data-backed content.

## Notes
- Existing database queries and routes remain the source of truth; no mock backend data was added.
- AI, authentication and community data functionality are not replaced by UI-only placeholders.
- Verify locally with `npm run typecheck`, `npm run lint`, and `npm run build` with the required environment variables and PostgreSQL/pgvector service available.
- Visual review should include mobile, tablet, desktop, keyboard navigation and reduced-motion settings.
