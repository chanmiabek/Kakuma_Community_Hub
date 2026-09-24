
# API

All routes are under `/api` and return JSON.

| Method | Route                       | Description                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | `/api/users`              | Register a user                |
| GET    | `/api/opportunities`      | List opportunities (paginated) |
| POST   | `/api/opportunities`      | Create opportunity (org only)  |
| GET    | `/api/organizations`      | List published organizations   |
| POST   | `/api/organizations`      | Upsert my organization         |
| GET    | `/api/businesses`         | List published businesses      |
| POST   | `/api/businesses`         | Upsert my business             |
| GET    | `/api/services`           | List services                  |
| GET    | `/api/applications`       | My applications                |
| POST   | `/api/applications`       | Apply to an opportunity        |
| GET    | `/api/notifications`      | My notifications               |
| PATCH  | `/api/notifications`      | Mark all read                  |
| GET    | `/api/reports`            | List community reports         |
| POST   | `/api/reports`            | Create a report                |
| GET    | `/api/search`             | Global search                  |
| POST   | `/api/ai/chat`            | AI assistant                   |
| GET    | `/api/ai/recommendations` | My recommendations             |
| POST   | `/api/ai/search`          | Semantic search                |
