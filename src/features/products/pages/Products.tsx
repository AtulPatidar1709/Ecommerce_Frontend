import EcommerceSidebarFilter from "@/components/EcommerceSidebarFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { useProductQuery } from "../hooks/products.hook";
import { useState } from "react";

export interface FilterState {
  search: string;
  price: [number, number];
  brands: string[];
  ratings: number[];
}

const Products = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    price: [1000, 200000],
    brands: [],
    ratings: [],
  });

  // ✅ PASS FILTERS HERE
  const { products, isProductLoading, isProductError } =
    useProductQuery(filters);

  const updateFilters = (next: FilterState) => {
    setFilters(next);
  };

  const toggleArrayValue = (
    key: "brands" | "ratings",
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value as never)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="flex py-4 gap-6">
      <EcommerceSidebarFilter
        filters={filters}
        updateFilters={updateFilters}
        toggleArrayValue={toggleArrayValue}
      />

      <ProductGrid
        products={products}
        isProductLoading={isProductLoading}
        isProductError={isProductError}
      />
    </div>
  );
};

export default Products;
