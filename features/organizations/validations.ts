import { z } from "zod";

export const businessSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(10),
  logoUrl: z.string().url().optional().or(z.literal("")),
  coverUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type BusinessInput = z.infer<typeof businessSchema>;
export const organizationSchema = businessSchema.extend({ mission: z.string().optional(), focusAreas: z.array(z.string()).default([]) });
export type OrganizationInput = z.infer<typeof organizationSchema>;
