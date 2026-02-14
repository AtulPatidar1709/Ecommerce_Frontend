import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductTypes } from "@/features/products/schemas/product.schema";
import { useUpdateCartItems } from "@/features/cart/hooks/cart.hook";
import { cloudinaryUrl } from "@/lib/cloudinary";

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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-background transition hover:shadow-xl">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge className="absolute left-0 top-0 z-20 rounded-none rounded-br-xl bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          {discountPercentage}% OFF
        </Badge>
      )}

      {/* Image Wrapper — FIXED HEIGHT */}
      <div className="relative aspect-auto w-full bg-muted">
        <img
          src={cloudinaryUrl(thumbnail, { size: "THUMB" })}
          alt={product.title}
          loading="lazy"
          className="
            h-full
            w-full
            object-contain
            p-1
            transition-transform
            duration-300
            group-hover:scale-105
          "
          aria-label={`Category Banner - ${product.title}`}
          srcSet={`
            ${cloudinaryUrl(thumbnail, { size: "GRID" })} 1x,
            ${cloudinaryUrl(thumbnail, { size: "DETAIL" })} 2x,
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

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          {discountPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}

          <span className="text-lg font-semibold">
            ₹{(discountPrice ?? price).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="icon"
            aria-label="Update Cart Items"
            disabled={product.stock === 0 || isUpdating}
            onClick={() => updateCartItemQuantity(product.id, 1)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

          <Link
            to={`/products/${product.slug}`}
            aria-label="View Product Details"
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
