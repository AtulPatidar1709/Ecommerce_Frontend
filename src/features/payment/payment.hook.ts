import { useState } from "react";
import { paymentApi } from "./payment.api";
import type { CreateOrderInput } from "../orders/schemas/oders.schema";

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function initiatePayment(orderData: CreateOrderInput) {
    setIsError(null); // reset previous error
    setIsLoading(true);

    try {
      const data = await paymentApi.initiatePayment(orderData);
      return data;
    } catch (error: unknown) {
      console.error(error);
      setIsError("Something went wrong while initiating Payment");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    initiatePayment,
    isLoading,
    isError,
  };
};

export default usePayment;
