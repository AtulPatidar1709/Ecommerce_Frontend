import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart.api";
import { useUserQuery } from "@/features/auth/hooks/auth.hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCartDetails = () => {
  const { user } = useUserQuery();

  const cartData = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart(),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 1000 * 20,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    allCartItems: cartData.data ?? {},
    cartIsLoading: cartData.isLoading,
    cartError: cartData.isError,
  };
};

type UpdateCartItemParams = {
  productId: string;
  quantity: number;
};

export const useUpdateCartItems = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateCartItem = useMutation({
    mutationFn: async ({ productId, quantity }: UpdateCartItemParams) => {
      await cartApi.addToCart(productId, quantity);
    },
    onMutate: async ({ productId, quantity }: UpdateCartItemParams) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (oldCart: any) => {
        if (!oldCart) return oldCart;

        const newQuantity = Number(quantity ?? 0);

        const updatedCartItems = oldCart.cartItems.map((item: any) => {
          if (item.productId !== productId) return item;

          const price = Number(
            item.product.discountPrice ?? item.product.price ?? 0,
          );

          return {
            ...item,
            quantity: newQuantity,
            subtotal: price * newQuantity,
          };
        });

        const prevItem =
          oldCart.cartItems.find((item: any) => item.productId === productId) ??
          {};

        const prevQuantity = Number(prevItem.quantity ?? 0);

        return {
          ...oldCart,
          cartItems: updatedCartItems,
          summary: {
            ...oldCart.summary,
            totalItems:
              Number(oldCart.summary.totalItems ?? 0) +
              (newQuantity - prevQuantity),
          },
        };
      });

      return { previousCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error, _, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }

      if (error instanceof Error && error.message === "Unauthorized") {
        toast.error("Please log in to update cart items.");
        navigate("/login");
      }
      toast.error("Failed to update cart item. Please try again.");
    },
  });

  const updateCartItemQuantity = (productId: string, quantity: number) =>
    updateCartItem.mutate({ productId, quantity });

  const removeFromCartItemMutation = useMutation({
    mutationFn: async (productId: string) => {
      await cartApi.removeFromCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (error instanceof Error && error.message === "Unauthorized") {
        toast.error("Please log in to remove items from cart.");
        navigate("/login");
      }
      toast.error("Failed to remove item from cart. Please try again.");
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (oldCart: any) => {
        if (!oldCart) return oldCart;
        const updatedCartItems = oldCart.cartItems.filter(
          (item: any) => item.productId !== productId,
        );
        return { ...oldCart, cartItems: updatedCartItems };
      });
      toast.success("Item removed from cart.");
      return { previousCart };
    },
  });

  const removeItemFromCart = (productId: string) =>
    removeFromCartItemMutation.mutate(productId);

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await cartApi.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (error instanceof Error && error.message === "Unauthorized") {
        toast.error("Please log in to clear cart.");
        navigate("/login");
      }
      toast.error("Failed to clear cart. Please try again.");
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (oldCart: any) => {
        if (!oldCart) return oldCart;
        return { ...oldCart, cartItems: [] };
      });
      toast.success("Cart cleared.");
      return { previousCart };
    },
  });

  const clearCart = () => clearCartMutation.mutate();

  return {
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart,
    isUpdating:
      updateCartItem.isPending ||
      removeFromCartItemMutation.isPending ||
      clearCartMutation.isPending,
    isError:
      updateCartItem.isError ||
      removeFromCartItemMutation.isError ||
      clearCartMutation.isError,
  };
};
