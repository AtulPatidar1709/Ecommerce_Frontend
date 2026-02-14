import Slider from "react-slick";
import ProductCard from "./ProductCard";
import type { ProductTypes } from "@/features/products/schemas/product.schema";
import { Loader_Skeleton } from "@/components/skeletons/Loader_Skeleton";

export const ProductSlider = ({
  items,
  isLoading,
}: {
  items: ProductTypes[];
  isLoading: boolean;
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) return <Loader_Skeleton />;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">POPULAR PRODUCTS</h2>
        <div className="mt-2 h-0.5 w-full bg-red-200" />
      </div>

      {/* Slider */}
      <Slider {...settings} className="-mx-3">
        {items.map((item) => (
          <div key={item.id} className="h-full px-3">
            {/* 👇 CRITICAL */}
            <div className="h-full">
              <ProductCard {...item} />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};
