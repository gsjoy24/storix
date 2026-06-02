"use client"

import Link from "next/link"
import { Heart, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { categories } from "@/constants/categories"
import type { ReactNode } from "react"

export function MobileMenu({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </>
                )
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </>
              )}
            </Button>
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
