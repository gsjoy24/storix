import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Rating } from "@/components/shared/Rating"
import type { Product, Review } from "@/types"

interface ProductTabsProps {
  product: Product
  reviews: Review[]
}

export function ProductTabs({ product, reviews }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-brand-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specs"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-brand-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-brand-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reviews ({reviews.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="pt-6">
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </TabsContent>

      <TabsContent value="specs" className="pt-6">
        <div className="divide-y">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between py-3 text-sm">
              <span className="font-medium text-muted-foreground">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="pt-6">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{review.author}</p>
                  <Rating value={review.rating} />
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <h4 className="font-medium text-sm mb-1">{review.title}</h4>
              <p className="text-sm text-muted-foreground">{review.body}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
