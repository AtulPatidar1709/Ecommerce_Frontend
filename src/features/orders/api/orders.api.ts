import { axiosApi } from "@/lib/axiosApi";
import type { CreateOrderInput } from "../schemas/oders.schema";

export const ordersApi = {
  getAllOrders: () => axiosApi.get("/orders/").then((res) => res.data.orders),

  getOrderById: (id: string) =>
    axiosApi.get(`/orders/${id}`).then((res) => res.data),

  createOrder: (data: CreateOrderInput) =>
    axiosApi.post(`/orders/`, { data }).then((res) => res.data),

  deleteOrderById: (id: string) =>
    axiosApi.delete(`/orders/${id}`).then((res) => res.data),
};
