"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CartItemRow } from "@/components/cart/CartItem"
import { CartSummary } from "@/components/cart/CartSummary"
import { useCart } from "@/hooks/useCart"

export default function CartPage() {
  const { items, emptyCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Cart" }]} className="mb-6" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <h1 className="font-heading text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild className="mt-4 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Cart" }]} className="mb-6" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={emptyCart}>
          Clear Cart
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card">
            <div className="divide-y px-6">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
