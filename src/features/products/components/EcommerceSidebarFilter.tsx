import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import SidebarContent from "@/features/products/lib/SidebarContent";
import type { FilterState } from "@/features/products/schemas/product.schema";

interface SidebarContentProps {
  filters: FilterState;
  updateFilters: (filters: FilterState) => void;
  toggleArrayValue: (
    key: "categories" | "ratings",
    value: string | number,
  ) => void;
}

export default function EcommerceSidebarFilter({
  filters,
  updateFilters,
  toggleArrayValue,
}: SidebarContentProps) {
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter size={16} /> Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[320px] sm:w-90`">
            <ScrollArea className="h-full pr-4">
              <SidebarContent
                filters={filters}
                updateFilters={updateFilters}
                toggleArrayValue={toggleArrayValue}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden lg:block w-70 sticky top-20">
        <SidebarContent
          filters={filters}
          updateFilters={updateFilters}
          toggleArrayValue={toggleArrayValue}
        />
      </aside>
    </>
  );
}
