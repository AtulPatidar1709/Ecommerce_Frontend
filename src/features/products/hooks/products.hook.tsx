import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/products.api";

export const useProductQuery = () => {
  const query = useQuery({
    queryKey: ["product"],
    queryFn: productApi.getAllProducts,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    products: query.data ?? null,
    isProductLoading: query.isLoading,
    isProductError: query.isError,
  };
};
