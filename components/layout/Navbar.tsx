"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { ShoppingBag, Heart, User, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { selectCartCount } from "@/store/slices/cartSlice"
import { selectWishlistItems } from "@/store/slices/wishlistSlice"
import { useCart } from "@/hooks/useCart"
import { MobileMenu } from "./MobileMenu"

export function Navbar() {
  const cartCount = useSelector(selectCartCount)
  const wishlistItems = useSelector(selectWishlistItems)
  const { toggleDrawer } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            STORIX
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shop" className="transition-colors hover:text-foreground/70">
              Shop
            </Link>
            <Link href="/shop?category=electronics" className="transition-colors hover:text-foreground/70">
              Electronics
            </Link>
            <Link href="/shop?category=audio" className="transition-colors hover:text-foreground/70">
              Audio
            </Link>
            <Link href="/shop?category=wearables" className="transition-colors hover:text-foreground/70">
              Wearables
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Search products">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={toggleDrawer} aria-label="Open cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-primary">
                {cartCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex relative" asChild aria-label="Wishlist">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-primary">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild aria-label="Account">
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <div className="md:hidden">
            <MobileMenu>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </MobileMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
