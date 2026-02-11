import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/HeroSection";
import { Loader_Skeleton } from "@/components/skeletons/Loader_Skeleton";
import { ProductSlider } from "@/features/products/components/FeaturedProducts";
import { FeaturesBar } from "@/features/products/components/FeaturesBar";
import ProductsSection from "@/features/products/components/ProductsSection";
import { useProductQuery } from "@/features/products/hooks/products.hook";

const Home = () => {
  const { products, isProductLoading } = useProductQuery();

  if (isProductLoading) {
    return <Loader_Skeleton />;
  }

  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturesBar />
      <ProductSlider items={products ?? []} />
      <ProductsSection items={products ?? []} />
    </div>
  );
};

export default Home;
