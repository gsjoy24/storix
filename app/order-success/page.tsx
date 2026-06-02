"use client"

import Link from "next/link"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const [orderNumber] = useState(
    () => `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
  )

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="h-20 w-20 text-green-500 animate-in zoom-in" />
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight">Order Confirmed!</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Thank you for your purchase. Your order is being processed.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Order number: <span className="font-mono font-medium text-foreground">{orderNumber}</span>
      </p>
      <div className="mt-8 flex gap-4">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-brand-primary px-8 text-white hover:bg-brand-primary/90"
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link href="/account/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  )
}
