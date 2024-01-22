import React from "react";
import { type Product } from "@/payload-types";
import ProductPlaceholder from "./ProductPlaceholder";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing: React.FC<ProductListingProps> = ({ product, index }) => {
  const [isVisible, setIsVisilbe] = React.useState<boolean>(false);
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisilbe(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <ImageSlider />
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
