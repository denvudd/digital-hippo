import { z } from "zod";

export const PollOrderStatusValidator = z.object({
  orderId: z.string(),
});

export type TPollOrderStatusValidator = z.infer<
  typeof PollOrderStatusValidator
>;
