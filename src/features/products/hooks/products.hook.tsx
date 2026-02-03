import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/products.api";
import type { FilterState } from "../pages/Products";

export const useProductDetails = (id: string) => {
  const productDetails = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.ProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 1000 * 20,
    retry: false,
  });

  return {
    productDetails: productDetails.data ?? {},
    productIsLoading: productDetails.isLoading,
    productError: productDetails.isError,
  };
};

export const useProductQuery = (filters?: FilterState) => {
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productApi.getAllProducts(filters!),
    retry: false,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  return {
    products: query.data ?? [],
    isProductLoading: query.isLoading,
    isProductError: query.isError,
  };
};
