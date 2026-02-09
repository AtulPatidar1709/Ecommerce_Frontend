import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

type CartIconProps = {
  count?: number;
};

export function CartIcon({ count = 0 }: CartIconProps) {
  return (
    <Link
      to="/cart"
      aria-label="Shopping cart"
      className="relative inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-muted"
    >
      <ShoppingCart className="h-5 w-5" />

      {count > 0 && (
        <span
          className={cn(
            "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center",
            "rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground",
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
