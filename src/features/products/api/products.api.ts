import { axiosApi } from "@/lib/axiosApi";

export const productApi = {
  getAllProducts: () =>
    axiosApi.get("/products/").then((res) => res.data.products),

  getProductBySummary: () =>
    axiosApi.get("/products/summary").then((res) => res.data),

  ProductById: () => axiosApi.get("/products/:id"),

  ProductDeleteById: (id: string) =>
    axiosApi.delete(`/products/${id}`).then((res) => res.data.user),
};
