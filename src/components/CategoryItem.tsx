import type { CreateCategoryInput } from "@/features/category/schemas/category.schema";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export const CategoryItem = ({
  name = "Default Category",
  imageUrl,
}: CreateCategoryInput) => {
  const navigate = useNavigate();

  name = name.toUpperCase();

  console.log("name in category section ,", name);

  function handleCategoryClick() {
    navigate(`/products?categories=${name}`);
  }

  return (
    <div
      onClick={handleCategoryClick}
      className="flex flex-col items-center w-28 px-2"
    >
      <Card className="rounded-full border-none shadow-md hover:shadow-lg transition-all duration-300 w-28 h-28 flex items-center justify-center bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 object-contain rounded-full"
          />
        ) : (
          <span className="text-lg font-semibold text-gray-700 text-center">
            {name[0].toUpperCase()}
          </span>
        )}
      </Card>
      <span className="mt-2 text-sm font-medium text-gray-800 text-center truncate w-full">
        {name}
      </span>
    </div>
  );
};
