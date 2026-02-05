import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { ProductTypes } from "@/features/products/schemas/product.schema";

const ProductsSection = ({ items }: { items: ProductTypes[] }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 overflow-hidden">
      {/* Header */}
      <div className="mb-5">
        <div className="flex justify-between px-2">
          <h2 className="font-bold text-xl">PRODUCTS</h2>
          <Link to={"/products/"}>See All Products</Link>
        </div>
        <div className="h-0.5 bg-red-200 w-full mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="flex my-2 justify-center px-3">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
