import { toast } from "react-toastify";
import { couponApi } from "../api/coupon.api";

export const useCoupon = () => {
  async function validateCoupon(data: { code: string; orderAmount: number }) {
    try {
      const response = await couponApi.validateCoupon({
        code: data.code,
        orderAmount: data.orderAmount,
      });
      return response;
    } catch (error) {
      toast.error("Invalid coupon code or coupon is not applicable.");
      console.error("Error validating coupon:", error);
    }
  }
  return {
    validateCoupon,
  };
};
