import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { FilterState } from "../schemas/product.schema";

const BRANDS = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "Asus"];
const RATINGS = [5, 4, 3];

interface SidebarContentProps {
  filters: FilterState;
  updateFilters: (filters: FilterState) => void;
  toggleArrayValue: (key: "brands" | "ratings", value: string | number) => void;
}

const SidebarContent = ({
  filters,
  updateFilters,
  toggleArrayValue,
}: SidebarContentProps) => {
  function resetFilters() {
    updateFilters({
      search: "",
      price: [0, 25000],
      brands: [],
      ratings: [],
    });
  }

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardContent className="p-4 space-y-5">
        {/* Search */}
        <Input
          placeholder="Search products"
          value={filters.search}
          onChange={(e) =>
            updateFilters({ ...filters, search: e.target.value })
          }
        />

        <Accordion type="multiple" defaultValue={["price", "brand", "rating"]}>
          {/* Price */}
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent className="space-y-3 mt-2">
              <Slider
                min={0}
                max={150000}
                step={100}
                value={filters.price}
                onValueChange={(v) =>
                  updateFilters({ ...filters, price: v as [number, number] })
                }
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{filters.price[0]}</span>
                <span>₹{filters.price[1]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brands */}
          <AccordionItem value="brand">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => toggleArrayValue("brands", brand)}
                  />
                  {brand}
                </label>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Ratings */}
          <AccordionItem value="rating">
            <AccordionTrigger>Customer Ratings</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {RATINGS.map((rating) => (
                <label key={rating} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.ratings.includes(rating)}
                    onCheckedChange={() => toggleArrayValue("ratings", rating)}
                  />
                  {rating}★ & above
                </label>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button variant="secondary" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarContent;
