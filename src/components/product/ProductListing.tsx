import React from "react";
import Link from "next/link";

import ProductPlaceholder from "./ProductPlaceholder";
import ImageSlider from "../ui/ImageSlider";
import { type Product } from "@/payload-types";
import { cn, formatPrice, getProductLabel } from "@/lib/utils";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing: React.FC<ProductListingProps> = ({ product, index }) => {
  const [isVisible, setIsVisilbe] = React.useState<boolean>(false);

  const formattedUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisilbe(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = getProductLabel(product.category);

  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={formattedUrls} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
