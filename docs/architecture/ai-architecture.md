
# AI Architecture

Three capabilities:

1. **Assistant chat** — `/api/ai/chat` uses `src/ai/rag/*` to retrieve context then answer.
2. **Semantic search** — embeddings are stored in `Embedding.vector` (pgvector). `src/ai/embeddings/search.ts` does nearest-neighbour search.
3. **Recommendations** — `src/server/services/recommendation.service.ts` scores open opportunities per user.

Prompts live in `src/ai/prompts/`. Swap `AI_CHAT_MODEL` / `AI_EMBEDDING_MODEL` via env vars.
