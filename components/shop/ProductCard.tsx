"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge as ProductBadge } from "@/components/shared/Badge"
import { Rating } from "@/components/shared/Rating"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "sonner"
import type { Product } from "@/types"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle, items: wishlistItems } = useWishlist()
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`Added ${product.name} to cart`)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
    toast.success(
      isWishlisted ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`,
    )
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

        />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <ProductBadge variant={product.badge} />
          </div>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-all translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground">{product.brand}</p>
      <h3 className="mt-1 text-sm font-medium leading-tight">{product.name}</h3>
      <Rating value={product.rating} className="mt-1" />
      <div className="mt-1.5 flex items-center gap-2">
        <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  )
}
