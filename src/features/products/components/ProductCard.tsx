import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductTypes } from "@/features/products/schemas/product.schema";

const ProductCard = (product: ProductTypes) => {
  const thumbnail = product.images?.[0]?.imageUrl;

  const price = product.price;
  const discountPrice =
    product.discountPrice && product.discountPrice < price
      ? product.discountPrice
      : null;

  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <Card className="group relative min-w-44 max-w-sm rounded-2xl border bg-background transition-all duration-300 hover:shadow-2xl">
      {discountPercentage > 0 && (
        <div className="absolute left-0 top-0 z-20">
          <Badge className="rounded-none rounded-br-xl bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            {discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-50">
        <img
          src={thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-md bg-white px-4 py-1 text-sm font-semibold text-red-600">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <CardContent className="space-y-2 px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          {discountPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}

          <span className="text-lg font-semibold text-gray-900">
            ₹{(discountPrice ?? price).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            size="icon"
            disabled={product.stock === 0}
            className="shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

          <Link to={`/products/${product.slug}`} className="flex-1">
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
