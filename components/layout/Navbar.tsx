"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { ShoppingBag, Heart, User, Menu, Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { selectCartCount } from "@/store/slices/cartSlice"
import { selectWishlistItems } from "@/store/slices/wishlistSlice"
import { useCart } from "@/hooks/useCart"
import { MobileMenu } from "./MobileMenu"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/category/electronics", label: "Electronics" },
  { href: "/category/audio", label: "Audio" },
  { href: "/category/wearables", label: "Wearables" },
]

export function Navbar() {
  const pathname = usePathname()
  const cartCount = useSelector(selectCartCount)
  const wishlistItems = useSelector(selectWishlistItems)
  const { toggleDrawer } = useCart()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            STORIX
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 transition-colors",
                  pathname === link.href || (link.href !== "/shop" && pathname.startsWith(link.href))
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild aria-label="Search products">
            <Link href="/shop">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Moon className="h-5 w-5" />
            )}
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
