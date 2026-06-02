import type { Metadata } from "next"
import { PromoStrip } from "@/components/home/PromoStrip"
import { HeroBanner } from "@/components/home/HeroBanner"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { TrendingProducts } from "@/components/home/TrendingProducts"
import { PromoBlock } from "@/components/home/PromoBlock"
import { BestSellers } from "@/components/home/BestSellers"
import { Testimonials } from "@/components/home/Testimonials"
import { NewsletterBanner } from "@/components/home/NewsletterBanner"

export const metadata: Metadata = {
  title: "Storix — Everything you need. Nothing you don't.",
  description:
    "Modern lifestyle & tech accessories store. Premium headphones, wearables, bags, desk setups & more — curated for the modern you.",
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <PromoStrip />
      <HeroBanner />
      <FeaturedCategories />
      <TrendingProducts />
      <PromoBlock />
      <BestSellers />
      <Testimonials />
      <NewsletterBanner />
    </>
  )
}
