"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { selectIsLoggedIn } from "@/store/slices/authSlice"
import { orders } from "@/constants/orders"

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Shipped: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function OrdersPage() {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/account">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Account
        </Link>
      </Button>
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-8">Order History</h1>

      <div className="rounded-xl border bg-card">
        <Accordion type="single" collapsible>
          {orders.map((order) => (
            <AccordionItem key={order.id} value={order.id}>
              <AccordionTrigger className="px-6">
                <div className="flex w-full items-center justify-between pr-4">
                  <div className="text-left">
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Items in this order are for display purposes.</p>
                  <p>Status: {order.status}</p>
                  <p>Order placed on {order.date}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
