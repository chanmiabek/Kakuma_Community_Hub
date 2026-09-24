import type { VerificationStatus } from "@prisma/client";

export type OrganizationDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  verificationStatus: VerificationStatus;
  isPublished: boolean;
};