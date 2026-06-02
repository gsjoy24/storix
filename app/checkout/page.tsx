"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, emptyCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  if (items.length === 0 && !submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Checkout" }]} className="mb-6" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <h1 className="font-heading text-2xl font-bold">Nothing to checkout</h1>
          <p className="text-muted-foreground">Add some items to your cart first.</p>
          <Button asChild className="rounded-full bg-brand-primary px-6 text-white hover:bg-brand-primary/90">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    emptyCart()
    toast.success("Order placed successfully!")
    router.push("/order-success")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} className="mb-6" />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" required placeholder="123 Main St" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Portland" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required placeholder="United States" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required placeholder="Oregon" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required placeholder="97201" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Payment</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card">Card Number</Label>
                  <Input id="card" required placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" required placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" required placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" required placeholder="John Doe" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
              <h2 className="font-heading text-lg font-bold">Order Summary</h2>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                         sizes="64px"

                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
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
              <div className="flex items-center gap-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the terms and conditions
                </Label>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
              >
                Place Order
              </Button>
              <Separator className="my-2" />
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/cart" className="flex items-center justify-center gap-1 text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
