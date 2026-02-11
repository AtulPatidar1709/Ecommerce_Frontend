import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOrders } from "../orders/hooks/orders.hook";
import usePayment from "./payment.hook";
import { useUserQuery } from "../auth/hooks/auth.hooks";
import { useCartDetails } from "../cart/hooks/cart.hook";
import openRazorPayPopUp from "../cart/utils/openRazorPayPopUp";
import type { CreateOrderInput } from "../orders/schemas/oders.schema";

export const usePaymentInitiate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { createOrder, isLoading: orderIsLoading } = useOrders();
  const { initiatePayment, isLoading: paymentIsLoading } = usePayment();

  const { user } = useUserQuery();
  const { allCartItems: cart } = useCartDetails();
  async function handleCheckout({
    addressId,
    couponId,
    paymentMethod,
  }: CreateOrderInput) {
    if (!addressId) {
      alert("Please select an address");
      return;
    }

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user) {
      toast.error("User not found. Please login again.");
      return;
    }

    try {
      if (paymentMethod === "RAZORPAY") {
        // check payment verification and initiate payment from backend.
        let data = await initiatePayment({
          addressId,
          couponId,
          paymentMethod,
        });

        data = data.data;

        if (!data?.orderId || !data?.rzorderData) {
          return;
        } else {
          //Redirect UTR Do Payment and send info to backend to verify again.
          openRazorPayPopUp({
            orderId: data?.rzorderData?.id,
            orderDetails: data?.orderId,
            user,
            onSuccess: async () => {
              queryClient.removeQueries({ queryKey: ["cart"] });
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              toast.success("Order Placed Successfully");
              navigate("/");
            },
            onClose: (msg?: string) => {
              toast.error(msg);
            },
          });
        }
      } else {
        await createOrder({
          addressId: addressId!,
          couponId,
          paymentMethod,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    }
  }

  return {
    handleCheckout,
    orderIsLoading,
    paymentIsLoading,
  };
};
