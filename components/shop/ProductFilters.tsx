"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Rating } from "@/components/shared/Rating"
import { categories } from "@/constants/categories"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  inStockOnly: boolean
  onInStockChange: (inStock: boolean) => void
}

export function ProductFilters({
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  inStockOnly,
  onInStockChange,
}: ProductFiltersProps) {
  const handleCategoryToggle = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== slug))
    } else {
      onCategoriesChange([...selectedCategories, slug])
    }
  }

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["categories", "price", "rating"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat.slug}`}
                    checked={selectedCategories.includes(cat.slug)}
                    onCheckedChange={() => handleCategoryToggle(cat.slug)}
                  />
                  <Label htmlFor={`cat-${cat.slug}`} className="text-sm cursor-pointer">
                    {cat.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                min={0}
                max={500}
                step={10}
                className="mt-2"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => onMinRatingChange(minRating === r ? 0 : r)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    minRating === r ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                >
                  <Rating value={r} />
                  <span className="text-muted-foreground">& up</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => onInStockChange(checked as boolean)}
        />
        <Label htmlFor="in-stock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>
    </div>
  )
}
