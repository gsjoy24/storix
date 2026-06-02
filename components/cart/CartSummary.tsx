"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"

export function CartSummary() {
  const { total } = useCart()

  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h2 className="font-heading text-lg font-bold">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
      <Button
        asChild
        size="lg"
        className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
      >
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="w-full rounded-full">
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  )
}
