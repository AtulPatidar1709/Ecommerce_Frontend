import { useState } from "react";
import { useProductQuery } from "./products.hook";
import type { FilterState } from "../schemas/product.schema";
import { useDebounce } from "@/lib/useDebounce";

const useFilterHook = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    price: [100, 250000],
    categories: [],
    ratings: [],
    sort: undefined,
  });

  //Debounce filters to avoid excessive queries
  const debouncedFilters = useDebounce(filters, 500);

  const { products, isProductLoading, isProductError } =
    useProductQuery(debouncedFilters);

  const updateFilters = (next: FilterState) => {
    setFilters(next);
  };

  const toggleArrayValue = (
    key: "categories" | "ratings",
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value as never)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return {
    filters,
    updateFilters,
    toggleArrayValue,
    products,
    isProductLoading,
    isProductError,
  };
};

export default useFilterHook;
