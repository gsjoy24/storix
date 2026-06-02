"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "@/components/shared/QuantitySelector"
import { useCart } from "@/hooks/useCart"
import type { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItemRow({ item }: CartItemProps) {
  const { removeItem, updateItemQuantity } = useCart()

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
           sizes="96px"

        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/shop/${item.product.slug}`}
              className="font-medium hover:underline"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
          </div>
          <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateItemQuantity(item.product.id, q)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-red-500"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
