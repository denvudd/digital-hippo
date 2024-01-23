import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type Product } from "@/payload-types";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  total: number;
  addItems: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItems: (product) =>
        set((state) => {
          const items = [...state.items, { product }];
          return {
            items,
            total: items.reduce((total, { product }) => total + product.price, 0),
          };
        }),
      removeItem: (productId) =>
        set((state) => {
          const items = state.items.filter((item) => item.product.id !== productId);
          return {
            items,
            total: items.reduce((total, { product }) => total + product.price, 0),
          }
        }),
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
