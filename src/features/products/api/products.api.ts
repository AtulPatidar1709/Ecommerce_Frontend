import { axiosApi } from "@/lib/axiosApi";

export const productApi = {
  getAllProducts: () =>
    axiosApi.get("/products/").then((res) => res.data.products),

  getProductBySummary: () =>
    axiosApi.get("/products/summary").then((res) => res.data),

  ProductById: (id: string) =>
    axiosApi.get(`/products/${id}`).then((res) => res.data.product),

  ProductDeleteById: (id: string) =>
    axiosApi.delete(`/products/${id}`).then((res) => res.data),
};
