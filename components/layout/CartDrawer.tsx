"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"

export function CartDrawer() {
  const { items, total, isOpen, toggleDrawer } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={toggleDrawer}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground/60">Add some items to get started</p>
            <Button asChild className="rounded-full bg-brand-primary text-white hover:bg-brand-primary/90">
              <Link href="/shop" onClick={toggleDrawer}>
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                         sizes="80px"

                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="text-sm font-medium hover:underline"
                          onClick={toggleDrawer}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">Subtotal</span>
                <span className="text-base font-bold">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Button
                asChild
                className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
                onClick={toggleDrawer}
              >
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full"
                onClick={toggleDrawer}
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
