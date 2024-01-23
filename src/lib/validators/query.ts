import { z } from "zod";

export const ProductsQueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export type TProductsQueryValidator = z.infer<typeof ProductsQueryValidator>;
