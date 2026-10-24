import { z } from "zod";

const optionalUrl = z.string().url().optional().or(z.literal(""));

export const organizationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().min(10),
  mission: z.string().optional(),
  logoUrl: optionalUrl,
  coverUrl: optionalUrl,
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: optionalUrl,
  focusAreas: z.array(z.string()).default([]),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;
