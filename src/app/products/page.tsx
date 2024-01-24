import React from "react";

import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductReel from "@/components/product/ProductReel";

import { getProductLabel, parse } from "@/lib/utils";
import { type PageParam } from "@/types";

interface PageProps {
  searchParams: {
    [key: string]: PageParam;
  };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);
  const label = category && getProductLabel(category as "ui_kits" | "icons");

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse hight-quality assets"}
        query={{
          category,
          limit: 20,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
