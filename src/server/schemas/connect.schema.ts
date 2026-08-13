import { z } from "zod";

export const connectSchema = z.object({
  mentorId: z.string().min(1),
  requestContext: z.string().min(15, "Give the sage some context (at least 15 characters).").max(1000),
});
