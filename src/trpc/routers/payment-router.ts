import { privateProcedure, publicProcedure, router } from "../trpc";
import { PaymentValidator } from "../../lib/validators/payment";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../../get-payload";

import { stripe } from "../../lib/stripe";
import type Stripe from "stripe";
import { PollOrderStatusValidator } from "../../lib/validators/poll-order-status";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(PaymentValidator)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productsIds } = input;
      const payload = await getPayloadClient();

      if (!productsIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "BECAUSE PRODUCTS IDS",
        });
      }

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productsIds,
          },
        },
      });

      if (!products.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      if (products.length !== productsIds.length) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const filteredProducts = products.filter((product) =>
        Boolean(product.priceId)
      );

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts.map((product) => product.id),
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      line_items.push({
        price: "price_1ObhN4AAqghrhKQI88kJEpjn", // from Stripe dashboard, "Transaction Fee" product
        quantity: 1,
        adjustable_quantity: {
          enabled: false, // disable multiple transactions fee for one transaction
        },
      });

      filteredProducts.forEach((product) => {
        line_items.push({
          price: product.priceId!,
          quantity: 1,
        });
      });

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });

        return { url: stripeSession.url };
      } catch (error) {
        console.log(error);

        return { url: null };
      }
    }),
  pollOrderStatus: privateProcedure
    .input(PollOrderStatusValidator)
    .query(async ({ input }) => {
      const { orderId } = input;
      const payload = await getPayloadClient();

      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: {
            equals: orderId,
          },
        },
      });

      if (!orders.length) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
