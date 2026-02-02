import { useCategoryDetails } from "@/features/category/hooks/category.hook";
import { CategorySlider } from "./CategorySlider";

export default function CategorySection() {
  const { allCategories, categoriesIsLoading, categoriesError } =
    useCategoryDetails();

  if (categoriesIsLoading)
    return <div className="text-center py-6">Loading...</div>;

  if (categoriesError)
    return (
      <div className="text-center py-6 text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <section className="w-full mt-6 py-6 bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 rounded-2xl">
      <CategorySlider items={allCategories} />
    </section>
  );
}
