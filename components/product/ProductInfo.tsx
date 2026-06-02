"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge as ProductBadge } from "@/components/shared/Badge"
import { Rating } from "@/components/shared/Rating"
import { QuantitySelector } from "@/components/shared/QuantitySelector"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "sonner"
import type { Product } from "@/types"

const dummyColors = ["#1a1a1a", "#d4c5b9", "#6b7b8d", "#c44e3f"]

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(dummyColors[0])
  const { addItem } = useCart()
  const { toggle, items: wishlistItems } = useWishlist()
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`Added ${product.name} to cart`)
  }

  const handleToggleWishlist = () => {
    toggle(product)
    toast.success(
      isWishlisted ? `Removed from wishlist` : `Added to wishlist`,
    )
  }

  return (
    <div className="space-y-6">
      {product.badge && <ProductBadge variant={product.badge} />}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{product.brand}</p>
        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Rating value={product.rating} showValue />
        <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-lg text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
        {product.discount && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-200">
            -{product.discount}%
          </span>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Color</p>
        <div className="flex gap-2">
          {dummyColors.map((color, i) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-8 w-8 rounded-full border-2 transition-colors ${
                selectedColor === color ? "border-brand-primary" : "border-border"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color option ${i + 1}`}
              aria-pressed={selectedColor === color}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <span className="text-sm text-muted-foreground">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
        <Truck className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">Free delivery</p>
          <p className="text-muted-foreground">Free shipping on orders over $50</p>
        </div>
      </div>
    </div>
  )
}
