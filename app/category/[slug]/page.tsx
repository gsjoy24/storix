import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { categories } from "@/constants/categories"
import { products } from "@/constants/products"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: category.name,
    description: `Browse ${category.productCount} products in our ${category.name.toLowerCase()} collection.`,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((p) => p.category === slug)

  return (
    <div>
      <div className="relative h-48 overflow-hidden bg-brand-surface md:h-64">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center bg-black/10">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              {category.name}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {category.productCount} products
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Categories" }, { label: category.name }]}
          className="mb-6"
        />
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  )
}
