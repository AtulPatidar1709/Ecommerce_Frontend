import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";

export const useCategoryDetails = () => {
  const categories = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryApi.getAllCategory(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 1000 * 20,
    retry: false,
  });

  return {
    allCategories: categories.data ?? {},
    categoriesIsLoading: categories.isLoading,
    categoriesError: categories.isError,
  };
};
