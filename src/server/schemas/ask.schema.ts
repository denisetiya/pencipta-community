import { z } from "zod";

export const askSchema = z.object({
  question: z.string().min(3, "Ask something specific (at least 3 characters).").max(500),
});
