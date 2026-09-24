import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().min(10),
  type: z.enum(["WORKSHOP", "TRAINING", "MEETUP", "JOB_FAIR", "COMMUNITY", "WEBINAR"]),
  location: z.string().optional(),
  isOnline: z.boolean().default(false),
  meetingUrl: z.string().url().optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  capacity: z.coerce.number().int().min(1).optional(),
});

export type EventInput = z.infer<typeof eventSchema>;