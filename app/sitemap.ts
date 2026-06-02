import type { MetadataRoute } from "next"
import { products } from "@/constants/products"
import { categories } from "@/constants/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://storix.com"

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${baseUrl}/wishlist`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.3 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${baseUrl}/auth/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${baseUrl}/auth/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
  ]

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes]
}
