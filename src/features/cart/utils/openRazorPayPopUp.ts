import { config } from "@/config/config";
import type { openRazorPayPopUpTypes } from "../schema/razorpayPopUp";
import { paymentApi } from "@/features/payment/payment.api";

function openRazorPayPopUp({
  orderId,
  orderDetails,
  user,
  onSuccess,
  onClose,
}: openRazorPayPopUpTypes) {
  const rzp = new window.Razorpay({
    key: config.RZP_TEST_API_KEY,
    description: `Payment By ${user.name} for order ${orderDetails}`,
    name: "Ecommerce App",
    order_id: orderId,
    notes: {
      orderDetails: JSON.stringify(orderDetails),
      name: user.name,
      email: user.email,
    },
    handler: async (response) => {
      try {
        const data = await paymentApi.verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          orderId: orderDetails,
        });

        if (data?.result?.status === "success") {
          onSuccess();
        } else {
          onClose("Payment Verification Failed.");
        }
      } catch (error: unknown) {
        onClose("Verification Failed");
      }
    },
    modal: {
      ondismiss: () => {
        onClose("Payment cancelled");
      },
    },
  });

  rzp.on("payment.failed", (response) => {
    onClose(response.error?.description ?? "Payment failed");
  });

  rzp.open();
}

export default openRazorPayPopUp;
