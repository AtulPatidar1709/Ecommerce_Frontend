import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useUpdateCartItems } from "@/features/cart/hooks/cart.hook";
import { cloudinaryUrl } from "@/lib/cloudinary";
import type { ProductTypes } from "../schemas/product.schema";

const ProductCard = (product: ProductTypes) => {
  const thumbnail = product.images?.[0]?.publicId;

  const price = product.price;
  const discountPrice =
    product.discountPrice && product.discountPrice < price
      ? product.discountPrice
      : null;

  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const { updateCartItemQuantity, isUpdating } = useUpdateCartItems();

  return (
    <div
      className="
        group
        relative
        flex
        h-[360px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        bg-background
        transition
        hover:-translate-y-0.5
        hover:shadow-xl
      "
    >
      {discountPercentage > 0 && (
        <Badge className="absolute left-0 top-0 z-10 rounded-none rounded-br-xl bg-red-600 px-2 py-1 text-xs font-semibold text-white">
          {discountPercentage}% OFF
        </Badge>
      )}

      <div className="relative flex h-[180px] items-center justify-center bg-muted p-2">
        <img
          src={cloudinaryUrl(thumbnail, { size: "GRID" })}
          alt={product.title}
          loading="lazy"
          className="
            max-h-full
            max-w-full
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
          srcSet={`
            ${cloudinaryUrl(thumbnail, { size: "GRID" })} 1x,
            ${cloudinaryUrl(thumbnail, { size: "DETAIL" })} 2x
          `}
        />

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-md bg-white px-4 py-1 text-sm font-semibold text-red-600">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="h-[2.75rem] overflow-hidden text-sm font-medium leading-snug">
          {product.title}
        </h3>

        <div className="mt-2 flex h-[28px] items-center gap-2">
          {discountPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-lg font-semibold">
            ₹{(discountPrice ?? price).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-auto flex h-[40px] gap-2 pt-3">
          <Button
            size="icon"
            disabled={product.stock === 0 || isUpdating}
            onClick={() => updateCartItemQuantity(product.id, 1)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

          <Link to={`/products/${product.slug}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
