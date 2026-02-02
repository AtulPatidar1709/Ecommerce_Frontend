import type { CreateCategoryInput } from "@/features/category/schemas/category.schema";
import Slider from "react-slick";
import { CategoryItem } from "./CategoryItem";

export const CategorySlider = ({ items }: { items: CreateCategoryInput[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 overflow-hidden">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg mb-2 text-gray-900">Categories</h2>
        <div className="h-0.5 mb-4 w-full bg-red-200 rounded-full" />
        <Slider {...settings}>
          {items.map((item) => (
            <CategoryItem key={item.id} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
