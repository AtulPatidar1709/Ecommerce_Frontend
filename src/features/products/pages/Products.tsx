import EcommerceSidebarFilter from "../components/EcommerceSidebarFilter";
import { ProductGrid } from "../components/ProductGrid";
import useFilterHook from "../hooks/filter.hook";

const Products = () => {
  const {
    filters,
    updateFilters,
    toggleArrayValue,
    products,
    isProductLoading,
    isProductError,
  } = useFilterHook();

  return (
    <div className="flex min-h-max py-4 gap-6 flex-col lg:flex-row">
      <EcommerceSidebarFilter
        filters={filters}
        updateFilters={updateFilters}
        toggleArrayValue={toggleArrayValue}
      />

      <ProductGrid
        products={products}
        isProductLoading={isProductLoading}
        isProductError={isProductError}
      />
    </div>
  );
};

export default Products;
