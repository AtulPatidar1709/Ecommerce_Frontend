import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addressApi } from "../api/address.api";

export const useAddresses = (enabled = true) => {
  const queryClient = useQueryClient();

  // Fetch all addresses
  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: addressApi.getAllAddresses,
    staleTime: 1000 * 60 * 60,
    enabled,
    retry: false,
  });

  // Create address mutation
  const createAddressMutation = useMutation({
    mutationFn: addressApi.createAddress,
    onSuccess: () => {
      toast.success("Address created successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("Failed to create address");
    },
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation<void, Error, string>({
    mutationFn: addressApi.deleteAddressById,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete address");
    },
  });

  return {
    addresses: addressesQuery.data,
    isLoading: addressesQuery.isLoading,
    isError: addressesQuery.isError,
    createAddress: createAddressMutation.mutate,
    createAddressAsync: createAddressMutation.mutateAsync,
    deleteAddress: deleteAddressMutation.mutate,
    deleteAddressAsync: deleteAddressMutation.mutateAsync,
    createAddressMutation,
    deleteAddressMutation,
  };
};

export const useAddress = (id: string) => {
  const addressQuery = useQuery({
    queryKey: ["address", id],
    queryFn: () => addressApi.getAddressById(id),
    staleTime: Infinity,
    enabled: !!id,
  });

  return {
    address: addressQuery.data,
    isLoading: addressQuery.isLoading,
    isError: addressQuery.isError,
    addressQuery,
  };
};
