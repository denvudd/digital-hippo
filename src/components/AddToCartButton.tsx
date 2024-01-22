"use client";

import React from "react";
import { Button } from "./ui/Button";

interface AddToCartButtonProps {}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({}) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button onClick={() => setIsSuccess(true)} size="lg" className="w-full">
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
