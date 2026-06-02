import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved items. Products you love, all in one place.",
  robots: { index: false, follow: false },
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
