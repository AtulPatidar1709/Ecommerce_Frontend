import { useUserQuery } from "@/features/auth/hooks/auth.hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addressApi } from "../api/address.api";
import type { CreateAddressInputType } from "../schemas/address.schema";

export const useAddresses = () => {
  const { user } = useUserQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: () => addressApi.getAllAddresses(),
    staleTime: 1000 * 60 * 60,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => addressApi.deleteAddressById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address Deleted Success.");
      navigate("/addresses");
    },
    onError: () => {
      toast.error("Something went wrong.");
      navigate("/addresses");
    },
  });

  const deleteAddress = async (id: string) => deleteAddressMutation.mutate(id);

  const createAddressMutation = useMutation({
    mutationFn: (values: CreateAddressInputType) =>
      addressApi.createAddress(values),
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      toast.success("Address Created Success.");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  const createAddress = async (values: CreateAddressInputType) =>
    createAddressMutation.mutate(values);

  return {
    addresses: addressesQuery.data,
    deleteAddress,
    createAddress,
    isLoading:
      addressesQuery.isLoading ||
      deleteAddressMutation.isPending ||
      createAddressMutation.isPending,
    isError:
      addressesQuery.isError ||
      deleteAddressMutation.isError ||
      createAddressMutation.isError,
  };
};

export const useAddress = (id: string) => {
  const address = useQuery({
    queryKey: ["address", id],
    queryFn: () => addressApi.getAddressById(id),
    staleTime: Infinity,
  });

  return {
    address,
    isLoading: address.isLoading,
    isError: address.isError,
  };
};
