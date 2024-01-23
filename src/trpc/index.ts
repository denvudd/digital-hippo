import { z } from "zod";
import { authRouter } from "./routers/auth-router";
import { publicProcedure, router } from "./trpc";
import { ProductsQueryValidator } from "../lib/validators/query";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./routers/payment-router";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: ProductsQueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOptions } = query;

      const payload = await getPayloadClient();

      const parsedQueryOptions: Record<string, { equals: string }> = {};

      Object.entries(queryOptions).forEach(([key, value]) => {
        parsedQueryOptions[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const { docs: products, hasNextPage, nextPage } = await payload.find({
        collection: "products",
        depth: 1,
        where: {
          approved_for_sale: {
            equals: "approved",
          },
          ...parsedQueryOptions,
        },
        sort,
        limit,
        page,
      });

      return {
        nextPage: hasNextPage ? nextPage : null,
        products,
      }
    }),
});

export type AppRouter = typeof appRouter;
