// components/cart/cart-item.tsx
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  item: {
    id: string;
    product: {
      discountPrice: number;
      images: {
        imageUrl: string;
      }[];
      price: number;
      title: string;
    };
    productId: string;
    quantity: number;
    subtotal: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  isLoading: boolean;
};

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  isLoading,
}: Props) {
  return (
    <div className="flex gap-4 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-pink-100 p-4">
      <img
        src={item.product.images[0]?.imageUrl}
        alt={item.product.title}
        className="h-24 w-24 rounded-lg object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-semibold">{item.product.title}</h3>
            <p className="text-sm text-zinc-400">{item.product.title}</p>
          </div>

          <button onClick={onRemove} className="text-zinc-400 hover:text-white">
            <Trash size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              disabled={isLoading}
              size="icon"
              variant="outline"
              onClick={onDecrease}
            >
              <Minus size={14} />
            </Button>
            <span className="w-6 text-center">{item.quantity}</span>
            <Button
              disabled={isLoading}
              size="icon"
              variant="outline"
              onClick={onIncrease}
            >
              <Plus size={14} />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-semibold">₹{item.subtotal?.toFixed(2)}</p>
            {item.product.price && (
              <p className="text-sm text-zinc-500 line-through">
                ₹{item.product.price?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
