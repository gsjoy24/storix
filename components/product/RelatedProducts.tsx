import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProductCard } from "@/components/shop/ProductCard"
import { products } from "@/constants/products"
import type { Product } from "@/types"

interface RelatedProductsProps {
  product: Product
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="You Might Also Like" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
