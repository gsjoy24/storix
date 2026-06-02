import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProductCard } from "@/components/shop/ProductCard"
import { products } from "@/constants/products"

export function BestSellers() {
  const bestSellers = products.filter((p) => p.featured).slice(0, 8)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Best Sellers"
          subtitle="Our most popular picks"
          linkLabel="View All"
          linkHref="/shop"
          className="mb-8"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
