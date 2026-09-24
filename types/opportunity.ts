import type { OpportunityType, OpportunityStatus } from "@prisma/client";

export type OpportunityDTO = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: OpportunityType;
  status: OpportunityStatus;
  category: string;
  location: string | null;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  deadline: Date | null;
  organization: { id: string; name: string; slug: string; logoUrl: string | null };
};