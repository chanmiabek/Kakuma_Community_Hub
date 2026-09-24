import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "./constatnts";

export type Pagination = { page: number; perPage: number; skip: number; take: number };

export function parsePagination(params: Record<string, string | string[] | undefined>): Pagination {
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const rawPer = Array.isArray(params.perPage) ? params.perPage[0] : params.perPage;

  const page = Math.max(1, Number(rawPage) || 1);
  const perPage = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(rawPer) || DEFAULT_PAGE_SIZE));

  return { page, perPage, skip: (page - 1) * perPage, take: perPage };
}
