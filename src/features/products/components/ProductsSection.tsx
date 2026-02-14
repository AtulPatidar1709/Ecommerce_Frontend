import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { ProductTypes } from "@/features/products/schemas/product.schema";
import { Loader_Skeleton } from "@/components/skeletons/Loader_Skeleton";

const ProductsSection = ({
  items,
  isLoading,
}: {
  items: ProductTypes[];
  isLoading: boolean;
}) => {
  if (isLoading) return <Loader_Skeleton />;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-5">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold">PRODUCTS</h2>
          <Link
            to="/products"
            className="text-sm font-medium text-primary hover:underline"
          >
            See All Products
          </Link>
        </div>
        <div className="mt-2 h-0.5 w-full bg-red-200" />
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="h-full">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
