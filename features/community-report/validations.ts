import { z } from "zod";

export const communityReportSchema = z.object({
  title: z.string().min(4).max(160),
  description: z.string().min(10),
  category: z.enum(["SAFETY", "INFRASTRUCTURE", "HEALTH", "WATER", "EDUCATION", "SECURITY", "OTHER"]),
  location: z.string().optional(),
  imageUrls: z.array(z.string().url()).max(1).default([]),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type CommunityReportInput = z.infer<typeof communityReportSchema>;