import React from "react";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/get-payload";

import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ImageSlider from "@/components/ui/ImageSlider";
import ProductReel from "@/components/product/ProductReel";
import AddToCartButton from "@/components/AddToCartButton";
import { Check, Shield } from "lucide-react";

import { PRODUCT_BREADCRUMBS } from "./breadcrumbs";
import { formatPrice, getProductLabel } from "@/lib/utils";

interface PageProps {
  params: {
    productId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approved_for_sale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = getProductLabel(product.category);
  const formattedUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:items-start">
            <Breadcrumbs breadcrumbs={PRODUCT_BREADCRUMBS} />

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligable for instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-start">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={formattedUrls} />
            </div>
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <div>
                <div className="mt-10">
                  <AddToCartButton product={product} />
                </div>
                <div className="mt-6 text-center">
                  <div className="group inline-flex text-sm text-medium">
                    <Shield
                      aria-hidden
                      className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    <span className="text-muted-foreground hover:text-gray-700">
                      30 Day Return Guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
