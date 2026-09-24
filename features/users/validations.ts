import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500).optional(),
  headline: z.string().max(120).optional(),
  summary: z.string().max(2000).optional(),
  yearsExperience: z.coerce.number().int().min(0).max(60).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;