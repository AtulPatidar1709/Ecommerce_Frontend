import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddresses } from "@/features/address/hooks/address.hook";
import { useCoupon } from "@/features/coupon/hooks/coupon.hook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CouponData {
  couponId: string;
  code: string;
  discountAmount: number;
  discountType: string;
  finalAmount: number;
}

export function OrderSummary({ subtotal }: { subtotal: number }) {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponData, setCouponData] = useState<CouponData | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(
    null,
  );

  const { addresses, isLoading: addressesLoading } = useAddresses();

  const { validateCoupon } = useCoupon();

  const shipping = subtotal >= 1000 ? 0 : 5.99;

  async function applyCoupon(code: string, amount: number) {
    if (!code) return;

    const coupon = await validateCoupon({
      code,
      orderAmount: amount,
    });

    if (!coupon) return;

    setAppliedCouponCode(code);
    setCouponData(coupon);
  }

  // 🔁 Recalculate coupon when cart subtotal changes
  useEffect(() => {
    if (!appliedCouponCode) return;

    const timer = setTimeout(async () => {
      const coupon = await validateCoupon({
        code: appliedCouponCode,
        orderAmount: subtotal,
      });

      if (!coupon) {
        // coupon no longer valid
        setAppliedCouponCode(null);
        setCouponData(null);
        return;
      }

      setCouponData(coupon);
    }, 400);

    return () => clearTimeout(timer);
  }, [subtotal, appliedCouponCode]);

  const discount = couponData?.discountAmount ?? 0;
  const total = Math.max(0, subtotal + shipping - discount);

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
          <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
        </div>

        {couponData && (
          <div className="flex justify-between text-green-700">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          name="coupon"
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter promo code"
        />
        <Button
          variant="outline"
          onClick={() => applyCoupon(couponCode, subtotal)}
          disabled={!!appliedCouponCode}
        >
          Apply
        </Button>
      </div>

      {couponData && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            Coupon applied! You saved ₹{discount.toFixed(2)}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold">Select Address</h2>
        {addressesLoading && <p>Loading addresses...</p>}
        {addresses.length === 0 ? (
          <div>
            <p className="text-sm text-zinc-400">
              No addresses found. Please add an address to proceed.
            </p>
            <Link
              className="text-blue-500 hover:underline p-1 rounded-md inline-block my-2"
              to="/addresses"
            >
              Add Address
            </Link>
          </div>
        ) : (
          <select className="w-full rounded-md border-gray-300">
            {addresses.map(
              (address: {
                id: string;
                street: string;
                city: string;
                state: string;
                zipCode: string;
              }) => (
                <option
                  className="p-2 my-2"
                  key={address.id}
                  value={address.id}
                >
                  {address.street}, {address.city}, {address.state} -{" "}
                  {address.zipCode}
                </option>
              ),
            )}
          </select>
        )}
      </div>

      <Button className="w-full" >Proceed to Checkout</Button>
    </div>
  );
}
