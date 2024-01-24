export type ProductCategories = (
  | {
      label: string;
      value: "ui_kits";
      children: {
        name: string;
        href: string;
        image: string;
      }[];
    }
  | {
      label: string;
      value: "icons";
      children: {
        name: string;
        href: string;
        image: string;
      }[];
    }
)[];

export const PRODUCT_CATEGORIES: ProductCategories = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    children: [
      {
        name: "Editor picks",
        href: "/products?category=ui_kits",
        image: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        image: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        image: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    children: [
      {
        name: "Favorite Icon Picks",
        href: "/products?category=icons",
        image: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        image: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        image: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const FEE = 1;
