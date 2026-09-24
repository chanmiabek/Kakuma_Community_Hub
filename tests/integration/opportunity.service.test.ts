import { describe, it, expect } from "vitest";
import { opportunityService } from "@/server/services/opportunity.service";

describe("opportunityService.search", () => {
  it("returns paginated results", async () => {
    const res = await opportunityService.search({ page: 1, perPage: 5 });
    expect(res).toHaveProperty("items");
    expect(res.items.length).toBeLessThanOrEqual(5);
  });
});