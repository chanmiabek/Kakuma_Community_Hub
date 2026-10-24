import { describe, expect, it } from "vitest";
import { parsePagination } from "@/lib/pagination";

describe("parsePagination", () => {
  it("uses safe defaults when no pagination parameters are provided", () => {
    expect(parsePagination({})).toEqual({
      page: 1,
      perPage: 20,
      skip: 0,
      take: 20,
    });
  });

  it("calculates the correct offset for valid query parameters", () => {
    expect(parsePagination({ page: "3", perPage: "5" })).toEqual({
      page: 3,
      perPage: 5,
      skip: 10,
      take: 5,
    });
  });

  it("uses the first value when a query parameter is repeated", () => {
    expect(parsePagination({ page: ["2", "8"], perPage: ["10", "25"] })).toEqual({
      page: 2,
      perPage: 10,
      skip: 10,
      take: 10,
    });
  });

  it("rejects unsafe, negative, and non-integer pagination values", () => {
    expect(parsePagination({ page: "Infinity", perPage: "-3" })).toEqual({
      page: 1,
      perPage: 20,
      skip: 0,
      take: 20,
    });

    expect(parsePagination({ page: "2.5", perPage: "0" })).toEqual({
      page: 1,
      perPage: 20,
      skip: 0,
      take: 20,
    });
  });

  it("caps the requested page size at the configured maximum", () => {
    expect(parsePagination({ page: "1", perPage: "1000" })).toEqual({
      page: 1,
      perPage: 100,
      skip: 0,
      take: 100,
    });
  });
});
