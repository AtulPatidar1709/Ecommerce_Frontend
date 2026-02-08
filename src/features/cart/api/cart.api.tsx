import { axiosApi } from "@/lib/axiosApi";

export const cartApi = {
  getCart: async () =>
    await axiosApi.get("/cart").then((res) => {
      return res.data;
    }),
  addToCart: async (productId: string, quantity: number) =>
    axiosApi
      .post("/cart", { productId, quantity })
      .then((res) => res.data.cartItem),
  updateCartItem: async (productId: string, quantity: number) =>
    await axiosApi.patch(`/cart/${productId}`, { quantity }),
  removeFromCart: async (productId: string) =>
    axiosApi.delete(`/cart/${productId}`),
  clearCart: async () => axiosApi.delete("/cart"),
};
