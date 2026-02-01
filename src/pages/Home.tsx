import CategorySection from "@/components/CategorySection";
import { ProductSlider } from "@/components/FeaturedProducts";
import { FeaturesBar } from "@/components/FeaturesBar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import { productsData } from "@/lib/FeaturedProduct";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturesBar />
      <ProductSlider items={productsData} />
      <ProductsSection items={productsData} />
    </div>
  );
};

export default Home;
