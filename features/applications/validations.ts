import { z } from "zod";

export const applicationSchema = z.object({
  opportunityId: z.string().cuid(),
  coverLetter: z.string().max(5000).optional(),
  resumeUrl: z.string().url().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;