import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10),
  category: z.string().min(2),
  price: z.string().optional(),
  currency: z.string().default("KES"),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;