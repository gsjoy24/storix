import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProductCard } from "@/components/shop/ProductCard"
import { products } from "@/constants/products"

export function TrendingProducts() {
  const trending = products.filter((p) => p.trending).slice(0, 8)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Trending Now"
          subtitle="What everyone's talking about"
          linkLabel="View All"
          linkHref="/shop"
          className="mb-8"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
