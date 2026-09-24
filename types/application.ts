import type { ApplicationStatus } from "@prisma/client";

export type ApplicationDTO = {
  id: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  createdAt: Date;
  opportunity: { id: string; title: string; organizationName: string };
};