import { useProductQuery } from "../hooks/products.hook";
import { useState } from "react";
import type { FilterState } from "../schemas/product.schema";
import { useDebounce } from "@/lib/useDebounce";
import EcommerceSidebarFilter from "../components/EcommerceSidebarFilter";
import { ProductGrid } from "../components/ProductGrid";

const Products = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    price: [100, 25000],
    brands: [],
    ratings: [],
  });

  //Debounce filters to avoid excessive queries
  const debouncedFilters = useDebounce(filters, 500);

  const { products, isProductLoading, isProductError } =
    useProductQuery(debouncedFilters);

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
    <div className="flex min-h-max py-4 gap-6 flex-col lg:flex-row">
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
