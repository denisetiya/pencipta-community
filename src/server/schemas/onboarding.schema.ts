import { z } from "zod";

export const onboardingSchema = z.object({
  chat: z.string().min(20, "Tell us a bit more about yourself (at least 20 characters).").max(4000),
});
