import { axiosApi } from "@/lib/axiosApi";
import type { LoginInput, RegisterInput } from "../schemas/product.schema";

export const authApi = {
  login: (data: LoginInput) =>
    axiosApi.post("/auth/login", data).then((res) => res.data),

  register: (data: RegisterInput) =>
    axiosApi.post("/auth/register", data).then((res) => res.data),

  logout: () => axiosApi.post("/auth/logout"),

  userInfo: () => axiosApi.get("/users/profile").then((res) => res.data.user),
};
