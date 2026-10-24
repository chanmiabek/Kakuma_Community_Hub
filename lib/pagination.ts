import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "./constatnts";

export type Pagination = {
  page: number;
  perPage: number;
  skip: number;
  take: number;
};

export function parsePagination(
  params: Record<string, string | string[] | undefined>,
): Pagination {
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const rawPerPage = Array.isArray(params.perPage)
    ? params.perPage[0]
    : params.perPage;

  const parsedPage = Number(rawPage);
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedPerPage = Number(rawPerPage);
  const requestedPerPage =
    Number.isSafeInteger(parsedPerPage) && parsedPerPage > 0
      ? parsedPerPage
      : DEFAULT_PAGE_SIZE;
  const perPage = Math.min(MAX_PAGE_SIZE, Math.max(1, requestedPerPage));

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    take: perPage,
  };
}
