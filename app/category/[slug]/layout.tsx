import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Category",
  description: "Browse products by category",
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return children
}
