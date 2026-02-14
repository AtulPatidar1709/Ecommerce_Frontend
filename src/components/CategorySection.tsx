import { useCategoryDetails } from "@/features/category/hooks/category.hook";
import { CategorySlider } from "./CategorySlider";
import { Loader_Skeleton } from "./skeletons/Loader_Skeleton";

export default function CategorySection() {
  const { allCategories, categoriesIsLoading, categoriesError } =
    useCategoryDetails();

  if (categoriesError) {
    return (
      <div className="py-6 text-center text-red-500">
        Something went wrong...
      </div>
    );
  }

  return (
    <section className="w-full mt-6 py-6 bg-linear-to-r from-cyan-200 via-sky-200 to-indigo-200 rounded-2xl">
      <div className="h-[180px] md:h-[200px]">
        {categoriesIsLoading ? (
          <Loader_Skeleton />
        ) : (
          <CategorySlider items={allCategories} />
        )}
      </div>
    </section>
  );
}
