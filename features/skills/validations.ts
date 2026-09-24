import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(2).max(60),
  category: z.string().min(2),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]).default("BEGINNER"),
  years: z.coerce.number().int().min(0).max(60).default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;