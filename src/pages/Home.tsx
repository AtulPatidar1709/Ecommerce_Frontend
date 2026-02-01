import CategorySection from "@/components/CategorySection";
import { ProductSlider } from "@/components/FeaturedProducts";
import { FeaturesBar } from "@/components/FeaturesBar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import { useProductQuery } from "@/features/products/hooks/products.hook";

const Home = () => {
  const { products } = useProductQuery();

  console.log("Products ", products);

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
