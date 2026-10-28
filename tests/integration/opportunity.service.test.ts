import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@/lib/db";

vi.mock("@/lib/db", () => ({
  prisma: {
    opportunity: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { opportunityService } from "@/server/services/opportunity.service";

describe("opportunityService.search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns paginated results", async () => {
    const items = [
      { id: "1", title: "Remote Community Health Worker", status: "OPEN" },
      { id: "2", title: "Career Readiness Workshop", status: "OPEN" },
    ];

    vi.mocked(prisma.opportunity.findMany).mockResolvedValue(items as any);
    vi.mocked(prisma.opportunity.count).mockResolvedValue(2);

    const res = await opportunityService.search({ page: 1, perPage: 5 });

    expect(res).toHaveProperty("items");
    expect(res.items).toEqual(items);
    expect(res.total).toBe(2);
    expect(res.items.length).toBeLessThanOrEqual(5);
    expect(prisma.opportunity.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "OPEN" }),
        take: 5,
      })
    );
  });
});