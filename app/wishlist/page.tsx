"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import type { Product } from "@/types"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const handleMoveToCart = (product: Product) => {
    addItem(product)
    removeItem(product.id)
  }

  const handleRemove = (product: Product) => {
    removeItem(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Wishlist" }]} className="mb-6" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/40" />
          <h1 className="font-heading text-2xl font-bold">Your wishlist is empty</h1>
          <p className="text-muted-foreground">Save items you love for later.</p>
          <Button asChild className="mt-4 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 px-6">
            <Link href="/shop">Discover Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Wishlist" }]} className="mb-6" />
      <h1 className="mb-8 font-heading text-3xl font-bold tracking-tight">Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="group rounded-xl border bg-card p-4 space-y-3">
            <Link href={`/shop/${product.slug}`} className="block">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

                />
              </div>
            </Link>
            <div>
              <p className="text-xs text-muted-foreground">{product.brand}</p>
              <Link href={`/shop/${product.slug}`} className="font-medium hover:underline">
                {product.name}
              </Link>
              <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
                onClick={() => handleMoveToCart(product)}
              >
                <ShoppingBag className="mr-1 h-4 w-4" />
                Move to Cart
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-red-500"
                onClick={() => handleRemove(product)}
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
