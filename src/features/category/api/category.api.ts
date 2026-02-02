import { axiosApi } from "@/lib/axiosApi";
import type { CreateCategoryInput } from "../schemas/category.schema";

export const categoryApi = {
  getAllCategory: () =>
    axiosApi.get("/category/").then((res) => res.data.categories),

  getCategoryBySlug: () =>
    axiosApi.get("/category/slug/:id").then((res) => res.data),

  createCategory: (data: CreateCategoryInput) =>
    axiosApi.get(`/category/`, { data }).then((res) => res.data),

  deleteCategoryById: (id: string) =>
    axiosApi.delete(`/category/${id}`).then((res) => res.data),
};
