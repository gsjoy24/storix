"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { Package, MapPin, ArrowRight, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { selectUser, logout } from "@/store/slices/authSlice"
import { orders } from "@/constants/orders"
import { toast } from "sonner"

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Shipped: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function AccountPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  if (!user) return null

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out")
    router.push("/")
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">My Account</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar}
                alt={user.name}
                width={56}
                height={56}
                className="rounded-full"
                 sizes="56px"

              />
              <div>
                <h2 className="font-heading text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {user.address.street}, {user.address.city}, {user.address.country}{" "}
                  {user.address.zip}
                </span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/account/orders">
                  <Package className="mr-2 h-4 w-4" />
                  View All Orders
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/account/profile">
                  <MapPin className="mr-2 h-4 w-4" />
                  Edit Profile
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold">Recent Orders</h2>
            <Link
              href="/account/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border bg-card">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-6 py-4 border-b last:border-0">
                <div>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
