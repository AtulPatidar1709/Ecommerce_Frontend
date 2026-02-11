import { axiosApi } from "@/lib/axiosApi";
import type { VerifyRazorpayPaymentInput } from "./payment.schema";
import type { CreateOrderInput } from "../orders/schemas/oders.schema";

export const paymentApi = {
  verifyPayment: (data: VerifyRazorpayPaymentInput) =>
    axiosApi.post("/payments/verify/razorpay", data).then((res) => res.data),
  initiatePayment: (data: CreateOrderInput) =>
    axiosApi
      .post("/payments/verify/initiate-payment", data)
      .then((res) => res.data),
};
