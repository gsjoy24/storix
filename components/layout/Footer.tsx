import Link from "next/link"
import { MessageCircle, Globe, Camera } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="font-heading text-xl font-bold tracking-tight">
              STORIX
            </Link>
            <p className="text-sm text-muted-foreground">
              Everything you need. Nothing you don&apos;t.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Social media">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Social media">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Social media">
                <Camera className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/account" className="hover:text-foreground transition-colors">My Account</Link></li>
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-foreground transition-colors">Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@storix.com</li>
              <li>1-800-STORIX</li>
              <li>Mon–Fri, 9am–6pm EST</li>
              <li>Portland, OR</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Storix. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
