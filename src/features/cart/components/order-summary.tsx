import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  subtotal: number;
  shipping: number;
};

export function OrderSummary({ subtotal, shipping }: Props) {
  const total = subtotal + shipping;

  return (
    <div className="rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-pink-100 p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <p className="mb-4 text-sm text-zinc-400">
        Review your order details and shipping information
      </p>

      <div className="mb-4 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{subtotal >= 1000 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <Input placeholder="Enter promo code" />
        <Button variant="outline">Apply</Button>
      </div>

      <Button className="w-full">Proceed to Checkout</Button>
    </div>
  );
}
