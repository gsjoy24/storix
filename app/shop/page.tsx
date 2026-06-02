"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { ProductFilters } from "@/components/shop/ProductFilters"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { SortDropdown, type SortOption } from "@/components/shop/SortDropdown"
import { Pagination } from "@/components/shop/Pagination"
import { products } from "@/constants/products"

const ITEMS_PER_PAGE = 12

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState<SortOption>("newest")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        break
    }

    return result
  }, [selectedCategories, priceRange, minRating, inStockOnly, sort, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Shop" }]} className="mb-6" />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>
          <SortDropdown value={sort} onChange={(v) => { setSort(v); setPage(1) }} />
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters
                  selectedCategories={selectedCategories}
                  onCategoriesChange={(v) => { setSelectedCategories(v); setPage(1) }}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  minRating={minRating}
                  onMinRatingChange={(v) => { setMinRating(v); setPage(1) }}
                  inStockOnly={inStockOnly}
                  onInStockChange={(v) => { setInStockOnly(v); setPage(1) }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <ProductFilters
            selectedCategories={selectedCategories}
            onCategoriesChange={(v) => { setSelectedCategories(v); setPage(1) }}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={(v) => { setMinRating(v); setPage(1) }}
            inStockOnly={inStockOnly}
            onInStockChange={(v) => { setInStockOnly(v); setPage(1) }}
          />
        </aside>
        <div className="flex-1 space-y-8">
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((slug) => (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                >
                  {slug}
                  <button
                    onClick={() => {
                      setSelectedCategories(selectedCategories.filter((c) => c !== slug))
                      setPage(1)
                    }}
                    className="ml-1 font-bold hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <ProductGrid products={paginated} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  )
}
