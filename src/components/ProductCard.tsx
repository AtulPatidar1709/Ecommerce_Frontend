import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import type { ProductTypes } from "@/features/products/schemas/product.schema";

const ProductCard = (product: ProductTypes) => {
  console.log("Product Card Section ", product);
  const thumbnail: string = product?.images[0].imageUrl;
  const discountPercentage =
    ((product.price - product.discountPrice) / product.price) * 100;

  // Optional: round to nearest integer
  const disCount = Math.round(discountPercentage);

  console.log("Persentage dis. ", disCount);

  return (
    <Card className="group relative max-w-sm overflow-hidden rounded-2xl border bg-background transition-all hover:shadow-xl">
      {disCount > 0 && (
        <Badge className="absolute left-3 top-3 z-10 bg-red-600 text-white">
          -{disCount}%
        </Badge>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <CardContent className="px-3 py-2">
        <h3 className="truncate text-base font-semibold">{product.title}</h3>

        <div className="flex items-center gap-2">
          {product.discountPrice > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            ₹{product.discountPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            aria-label="add-to-cart"
            size="icon"
            className="shrink-0"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

          <Link to={`/products/${product.id}`} className="flex-1">
            <Button
              aria-label="product-details"
              variant="outline"
              className="w-full"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
