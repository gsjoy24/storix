import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full catalog of premium tech accessories and lifestyle products. 40+ products across 10 categories.",
  alternates: {
    canonical: "/shop",
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
