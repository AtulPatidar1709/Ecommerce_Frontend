import { axiosApi } from "@/lib/axiosApi";

export const couponApi = {
  validateCoupon: async (data: { code: string; orderAmount: number }) =>
    await axiosApi.post("/coupons/validate", data).then((res) => {
      return res.data.couponData;
    }),
};
