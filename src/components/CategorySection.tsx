import Slider from "react-slick";

import { Card, CardContent } from "@/components/ui/card";
import boatImg from "../../public/banner-images/boat.png";

export interface CategoryItemType {
  id: number;
  label: string;
  icon: string;
}

const categories: CategoryItemType[] = [
  { id: 1, label: "Tablet", icon: boatImg },
  { id: 2, label: "Smartphone", icon: boatImg },
  { id: 3, label: "Game Console", icon: boatImg },
  { id: 4, label: "Camera", icon: boatImg },
  { id: 5, label: "Smartwatch", icon: boatImg },
  { id: 6, label: "Drone & Flycam", icon: boatImg },
  { id: 7, label: "Audio", icon: boatImg },
  { id: 8, label: "Computer", icon: boatImg },
];

const CategoryItem = ({ label, icon }: CategoryItemType) => {
  return (
    <div className="flex flex-col items-center">
      <Card className="rounded-full border-none shadow-md hover:shadow-lg transition">
        <CardContent className="flex flex-col items-center p-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <img
              src={icon}
              alt={label}
              className="w-full h-full object-contain"
            />
          </div>
        </CardContent>
      </Card>
      <span className="mt-2 text-sm font-medium text-gray-700 text-center">
        {label}
      </span>
    </div>
  );
};

const CategorySlider = ({ items }: { items: CategoryItemType[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 overflow-hidden">
      <div className="flex flex-col">
        <span className="font-bold mb-1">CATEGORIE'S</span>
        <span className="h-0.5 mb-3 bg-red-200 w-full" />
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id}>
              <CategoryItem {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default function CategorySection() {
  return (
    <section className="w-full mt-2 py-3 mx-auto relative rounded-2xl flex gap-2 justify-center items-center bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200">
      <CategorySlider items={categories} />
    </section>
  );
}
