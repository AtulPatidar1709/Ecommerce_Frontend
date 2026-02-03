import type { ProductTypes } from "@/features/products/schemas/product.schema";
import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";

export function ProductGrid({
  products,
  isProductLoading,
  isProductError,
}: {
  products: ProductTypes[];
  isProductLoading: boolean;
  isProductError: boolean;
}) {
  if (isProductLoading)
    return (
      <div className="w-full">
        <CardSkeleton />
      </div>
    );

  if (isProductError) return <div className="w-full">Error...</div>;

  return (
    <section className="flex-1">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product: ProductTypes) => (
          <ProductCard {...product} />
        ))}
      </div>
    </section>
  );
}
