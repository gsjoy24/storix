import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { ProductImages } from "@/components/product/ProductImages"
import { ProductInfo } from "@/components/product/ProductInfo"
import { ProductTabs } from "@/components/product/ProductTabs"
import { RelatedProducts } from "@/components/product/RelatedProducts"
import { products } from "@/constants/products"
import { testimonials } from "@/constants/testimonials"
import { categories } from "@/constants/categories"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/shop/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const category = categories.find((c) => c.slug === product.category)
  const productReviews = testimonials.filter(
    (r) => r.productId === product.id,
  )

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Shop", href: "/shop" },
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: product.name },
          ]}
          className="mb-6"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImages images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-12">
          <ProductTabs product={product} reviews={productReviews} />
        </div>
      </div>

      <RelatedProducts product={product} />
    </div>
  )
}
