"use client";

import React from "react";
import { Button } from "./ui/Button";
import { type Product } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItems } = useCart();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleAddToCart = () => {
    addItems(product);
    setIsSuccess(true);
  };

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
