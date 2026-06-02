"use client"

import Link from "next/link"
import { Heart, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/constants/categories"
import type { ReactNode } from "react"

export function MobileMenu({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-3">
            <Link href="/shop" className="block text-lg font-medium">
              All Products
            </Link>
            <Link href="/wishlist" className="flex items-center gap-2 text-lg font-medium">
              <Heart className="h-5 w-5" />
              Wishlist
            </Link>
            <Link href="/account" className="flex items-center gap-2 text-lg font-medium">
              <User className="h-5 w-5" />
              Account
            </Link>
          </div>
          <Separator />
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="block text-base transition-colors hover:text-foreground/70"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
