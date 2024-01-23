import { PaymentValidator } from "../lib/validators/payment";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(PaymentValidator)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productsIds } = input;
      const payload = await getPayloadClient();

      if (!!productsIds.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productsIds,
          },
        },
      });

      if (!!products.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      if (products.length !== productsIds.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
