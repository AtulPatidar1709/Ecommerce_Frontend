import type { RegisterInput } from "@/features/auth/schemas/auth.schema";

export interface openRazorPayPopUpTypes {
  orderId: string;
  orderDetails: string;
  user: RegisterInput;
  onSuccess: () => void;
  onClose: (msg?: string) => void;
}
