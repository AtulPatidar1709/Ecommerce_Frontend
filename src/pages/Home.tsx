import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/HeroSection";
import { ProductSlider } from "@/features/products/components/FeaturedProducts";
import { FeaturesBar } from "@/features/products/components/FeaturesBar";
import ProductsSection from "@/features/products/components/ProductsSection";
import { useProductQuery } from "@/features/products/hooks/products.hook";

const Home = () => {
  const { products } = useProductQuery();

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
