import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ordersApi } from "../api/orders.api";
import type { CreateOrderInput, Order } from "../schemas/oders.schema";

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch all orders
  const getAllOrdersQuery = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: ordersApi.getAllOrders,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
  });

  // Create order mutation
  const createOrderMutation = useMutation<Order, Error, CreateOrderInput>({
    mutationFn: ordersApi.createOrder,
    onSuccess: () => {
      toast.success("Order created successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousOrders =
        queryClient.getQueryData<Order[]>(["orders"]) || [];
      queryClient.setQueryData<Order[]>(["orders"], (old: any) => [
        ...(old || []),
        { ...newOrder, id: `temp-${Date.now()}` },
      ]);
      return { previousOrders };
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData<Order[]>(
        ["orders"],
        context?.previousOrders || [],
      );
      toast.error("Failed to create order");
    },
  });

  // Delete order mutation
  const deleteOrderMutation = useMutation<void, Error, string>({
    mutationFn: ordersApi.deleteOrderById,
    onSuccess: (_, orderId) => {
      toast.success("Order deleted successfully");
      queryClient.setQueryData<Order[]>(["orders"], (old) =>
        old ? old.filter((order) => order.id !== orderId) : [],
      );
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });

  return {
    // Queries
    getAllOrders: getAllOrdersQuery.data || [],

    // Mutations
    createOrder: createOrderMutation.mutate,
    createOrderAsync: createOrderMutation.mutateAsync,
    deleteOrder: deleteOrderMutation.mutate,
    deleteOrderAsync: deleteOrderMutation.mutateAsync,

    // Mutation objects (optional)
    createOrderMutation,
    deleteOrderMutation,

    // Loading / error states
    isLoading: getAllOrdersQuery.isLoading,
    isError: getAllOrdersQuery.isError,
  };
};

// Fetch single order by ID
export const useOrder = (id: string) => {
  const orderQuery = useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getOrderById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });

  return {
    order: orderQuery.data?.orderDetails,
    isLoading: orderQuery.isLoading,
    isError: orderQuery.isError,
  };
};
