"use client";

import React from "react";
import Link from "next/link";

import ProductListing from "./ProductListing";
import { trpc } from "@/trpc/client";
import { TProductsQueryValidator } from "@/lib/validators/query";
import { type Product } from "@/payload-types";
import Image from "next/image";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TProductsQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel: React.FC<ProductReelProps> = (props) => {
  const { title, subtitle, href, query } = props;

  const { data: rawProducts, isLoading: isProductsLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = rawProducts?.pages.flatMap((page) => page.products);
  let mappedProducts: (Product | null)[] = [];

  if (products && products.length) {
    mappedProducts = products;
  } else if (isProductsLoading) {
    mappedProducts = new Array(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md: flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && (
            <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop to collection <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {!!mappedProducts.length &&
              mappedProducts.map((product, index) => (
                <ProductListing key={index} product={product} index={index} />
              ))}
            {!mappedProducts.length && (
              <div className="col-span-full">
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <div
                    aria-hidden
                    className="relative mb-4 h-40 w-40 text-muted-foreground"
                  >
                    <Image
                      src="/hippo-empty-cart.png"
                      fill
                      loading="eager"
                      alt="Empty shopping cart Hippo"
                    />
                  </div>
                  <p className="text-muted-foreground text-center">
                    Whoops! Nothing to show here yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
