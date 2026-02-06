import { axiosApi } from "@/lib/axiosApi";
import type { CreateAddressInputType } from "../schemas/address.schema";

export const addressApi = {
  getAllAddresses: () =>
    axiosApi.get("/address/").then((res) => res.data.addresses),

  getAddressById: (id: string) =>
    axiosApi.get(`/address/${id}`).then((res) => res.data.address),

  createAddress: (data: CreateAddressInputType) =>
    axiosApi.post(`/address/`, { data }).then((res) => res.data),

  deleteAddressById: (id: string) =>
    axiosApi.delete(`/address/${id}`).then((res) => res.data),
};
