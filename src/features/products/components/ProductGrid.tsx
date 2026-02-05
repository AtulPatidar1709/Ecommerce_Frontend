import type { ProductTypes } from "@/features/products/schemas/product.schema";
import ProductCard from "./ProductCard";
import CardSkeleton from "@/components/CardSkeleton";
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
      <div
        className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-4
    "
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
