import { z } from "zod";

export const PaymentValidator = z.object({
  productsIds: z.array(z.string()),
});

export type TPaymentValidator = z.infer<typeof PaymentValidator>
