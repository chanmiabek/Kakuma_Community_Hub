import { z } from "zod";

export const opportunitySchema = z.object({
  title: z.string().min(4).max(160),
  description: z.string().min(20),
  imageUrl: z.string().url().optional().or(z.literal("")),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  type: z.enum(["JOB", "INTERNSHIP", "TRAINING", "SCHOLARSHIP", "GRANT", "VOLUNTEER", "APPRENTICESHIP"]),
  category: z.string().min(2),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  salaryMin: z.coerce.number().int().nonnegative().optional(),
  salaryMax: z.coerce.number().int().nonnegative().optional(),
  currency: z.string().default("KES"),
  deadline: z.coerce.date().optional(),
  positions: z.coerce.number().int().min(1).default(1),
  contactEmail: z.string().email().optional(),
  applyUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;