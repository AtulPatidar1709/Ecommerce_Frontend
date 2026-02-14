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
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) return <Loader_Skeleton />;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 overflow-hidden">
      {/* Header */}
      <div className="mb-5">
        <h2 className="font-bold text-xl">POPULAR PRODUCTS</h2>
        <div className="h-0.5 bg-red-200 w-full mt-2" />
      </div>

      {/* Centered Slider */}
      <Slider {...settings} className="-mx-3 flex justify-start">
        {items.map((item) => (
          <div key={item.id} className="flex my-2 justify-center px-3">
            {/* Map only the props that ProductCard needs */}
            <ProductCard {...item} />
          </div>
        ))}
      </Slider>
    </section>
  );
};
