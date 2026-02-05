import { axiosApi } from "@/lib/axiosApi";
import type { FilterState } from "../schemas/product.schema";

export const productApi = {
  getAllProducts: (filters?: FilterState) =>
    axiosApi
      .get("/products/", {
        params: {
          search: filters?.search || undefined,
          minPrice: filters?.price?.[0],
          maxPrice: filters?.price?.[1],
          brand: filters?.brands.length ? filters?.brands.join(",") : undefined,
          rating: filters?.ratings[0] || undefined,
          page: 1,
          limit: 12,
        },
      })
      .then((res) => res.data.products.products),

  getProductBySummary: () =>
    axiosApi.get("/products/summary").then((res) => res.data),

  ProductById: (id: string) =>
    axiosApi.get(`/products/${id}`).then((res) => res.data.product),

  ProductDeleteById: (id: string) =>
    axiosApi.delete(`/products/${id}`).then((res) => res.data),
};
