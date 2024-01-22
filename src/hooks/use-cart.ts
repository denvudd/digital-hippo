import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type Product } from "@/payload-types";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItems: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItems: (product) =>
        set((state) => {
          return {
            items: [...state.items, { product }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
