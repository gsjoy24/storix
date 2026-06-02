# Storix — E-Commerce Frontend Project Plan

> A realistic, fully dummy, frontend-only Next.js shop. All data lives in constant files. No backend, no real auth, no API calls.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Component Library | shadcn/ui |
| State Management | Redux Toolkit |
| Icons | Lucide React |
| Fonts | Next/font (e.g. `Playfair Display` for headings, `DM Sans` for body) |
| Images | next/image with local `/public` assets or Unsplash static URLs |
| Language | TypeScript |

---

## 2. Brand Identity

- **Name:** Storix
- **Tagline:** *"Everything you need. Nothing you don't."*
- **Niche:** Modern lifestyle & tech accessories store
- **Color Palette:**
  - Primary: `#0f0f0f` (near black)
  - Accent: `#e8ff47` (electric lime)
  - Surface: `#f5f5f0` (off-white)
  - Muted: `#888888`
- **Tone:** Clean, confident, slightly editorial — like a premium DTC brand

---

## 3. Folder Structure

```
storix/
├── app/
│   ├── layout.tsx               # Root layout (Navbar + Footer)
│   ├── page.tsx                 # Homepage
│   ├── shop/
│   │   ├── page.tsx             # All products
│   │   └── [slug]/
│   │       └── page.tsx         # Product detail
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx         # Category filtered view
│   ├── cart/
│   │   └── page.tsx             # Cart page
│   ├── wishlist/
│   │   └── page.tsx             # Wishlist page
│   ├── checkout/
│   │   └── page.tsx             # Checkout form (dummy, no submit)
│   ├── order-success/
│   │   └── page.tsx             # Post-checkout success screen
│   ├── account/
│   │   ├── page.tsx             # Account dashboard
│   │   ├── orders/
│   │   │   └── page.tsx         # Order history
│   │   └── profile/
│   │       └── page.tsx         # Profile editor (dummy)
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx         # Login form (dummy)
│   │   └── register/
│   │       └── page.tsx         # Register form (dummy)
│   └── not-found.tsx            # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── FeaturedCategories.tsx
│   │   ├── TrendingProducts.tsx
│   │   ├── PromoStrip.tsx
│   │   ├── BestSellers.tsx
│   │   ├── Testimonials.tsx
│   │   └── NewsletterBanner.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── SortDropdown.tsx
│   │   └── Pagination.tsx
│   ├── product/
│   │   ├── ProductImages.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductTabs.tsx      # Description / Specs / Reviews tabs
│   │   ├── RelatedProducts.tsx
│   │   └── ReviewCard.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx       # Slide-in cart sidebar
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   └── OrderSummary.tsx
│   └── shared/
│       ├── Badge.tsx
│       ├── Rating.tsx
│       ├── QuantitySelector.tsx
│       ├── Breadcrumb.tsx
│       └── SectionHeading.tsx
│
├── constants/
│   ├── products.ts              # All product data
│   ├── categories.ts            # Category list
│   ├── testimonials.ts          # Review/testimonial data
│   ├── orders.ts                # Dummy order history
│   ├── user.ts                  # Dummy user profile
│   └── promos.ts                # Banner/promo text
│
├── store/
│   ├── index.ts                 # Redux store setup
│   └── slices/
│       ├── cartSlice.ts         # Cart state
│       ├── wishlistSlice.ts     # Wishlist state
│       └── authSlice.ts         # Auth state (dummy login/logout)
│
├── types/
│   └── index.ts                 # Shared TypeScript types
│
├── lib/
│   └── utils.ts                 # cn() + misc helpers
│
├── hooks/
│   ├── useCart.ts
│   └── useWishlist.ts
│
└── public/
    └── images/                  # Local product/banner images (or Unsplash URLs)
```

---

## 4. Data Model (TypeScript Types)

```ts
// types/index.ts

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;            // matches Category.slug
  price: number;
  originalPrice?: number;      // for discount display
  discount?: number;           // percentage
  rating: number;              // 1–5
  reviewCount: number;
  images: string[];            // array of URLs
  badge?: "New" | "Sale" | "Hot" | "Limited";
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  trending: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
  productCount: number;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
};

export type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  items: CartItem[];
  total: number;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    country: string;
    zip: string;
  };
};
```

---

## 5. Constant Data Files

### `constants/categories.ts`
10 categories: Electronics, Audio, Wearables, Bags, Desk Setup, Lighting, Apparel, Home, Gaming, Outdoor

### `constants/products.ts`
~40 products spread across categories. Each with:
- Realistic names and brands (e.g. "ArcLens X1 Wireless Earbuds", brand "Veonar")
- Unsplash image URLs (tech/product photography)
- Prices between $19–$499
- Mix of sale/featured/trending flags
- Full `specs` and `description` text

### `constants/testimonials.ts`
8 customer testimonials with name, location, avatar, rating, quote

### `constants/orders.ts`
5 dummy orders with mixed statuses and items

### `constants/user.ts`
One dummy logged-in user profile

---

## 6. Redux Store Slices

### `cartSlice.ts`
```
State: { items: CartItem[], isOpen: boolean }
Actions:
  - addToCart(product, quantity)
  - removeFromCart(productId)
  - updateQuantity(productId, quantity)
  - clearCart()
  - toggleCartDrawer()
Selectors:
  - selectCartItems
  - selectCartTotal
  - selectCartCount
```

### `wishlistSlice.ts`
```
State: { items: Product[] }
Actions:
  - addToWishlist(product)
  - removeFromWishlist(productId)
  - toggleWishlist(product)
Selectors:
  - selectWishlistItems
  - selectIsWishlisted(productId)
```

### `authSlice.ts`
```
State: { isLoggedIn: boolean, user: User | null }
Actions:
  - login(user)    ← sets dummy user from constants/user.ts
  - logout()
```
> Login page sets `isLoggedIn: true` with dummy credentials (any email + password works)

---

## 7. Pages — Detailed Breakdown

### `/` — Homepage
Sections in order:
1. **PromoStrip** — thin top bar ("Free shipping on orders over $50 · Use code STORIX10")
2. **HeroBanner** — full-width editorial hero, headline + CTA button + product image
3. **FeaturedCategories** — horizontal scroll of category cards (10 items)
4. **TrendingProducts** — 8-product grid with "Trending Now" heading
5. **PromoBlock** — split-screen: left text promo, right product image (hardcoded)
6. **BestSellers** — horizontal scrollable product strip
7. **Testimonials** — 3-column review cards
8. **NewsletterBanner** — email input (dummy, no submit logic)

---

### `/shop` — All Products
- Filter sidebar (desktop) / bottom sheet (mobile):
  - Category checkboxes
  - Price range slider
  - Rating filter
  - In stock toggle
- Sort dropdown: Newest / Price Low→High / Price High→Low / Top Rated
- Product grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Pagination: 12 per page (client-side)
- Active filter chips shown above grid

---

### `/shop/[slug]` — Product Detail
Layout:
- Breadcrumb (Home > Category > Product)
- Left: image gallery (main + thumbnails)
- Right: product info
  - Name, brand, rating, review count
  - Price (with original if on sale)
  - Color/variant picker (dummy, 3–4 options)
  - Quantity selector
  - "Add to Cart" + "Add to Wishlist" buttons
  - Delivery badge ("Free delivery · In stock")
- Tabs below: Description | Specifications | Reviews
- Related Products (4 cards, same category)

---

### `/category/[slug]` — Category Page
Same layout as `/shop` but pre-filtered by category, with a category hero banner at top.

---

### `/cart` — Cart Page
- Table of cart items (image, name, price, quantity, subtotal, remove)
- Order summary card (subtotal, shipping, tax, total)
- "Continue Shopping" + "Proceed to Checkout" buttons
- Empty state with illustration if cart is empty

---

### `/checkout` — Checkout
- Two-column layout:
  - Left: form (Contact Info, Shipping Address, Payment — all dummy fields)
  - Right: Order Summary (read-only)
- "Place Order" button → redirects to `/order-success`
- No actual validation needed, but basic HTML required attributes

---

### `/order-success` — Order Confirmation
- Large checkmark animation
- Order number (random generated)
- Summary of items ordered
- "Continue Shopping" CTA

---

### `/wishlist` — Wishlist
- Grid of wishlisted products
- Each card has "Move to Cart" + "Remove" actions
- Empty state if wishlist is empty

---

### `/account` — Account Dashboard
> Shows dummy data. If not "logged in" (Redux state), redirect to `/auth/login`

- Profile summary card (avatar, name, email)
- Recent orders (last 3)
- Quick links: View All Orders, Edit Profile

### `/account/orders` — Order History
- Table/list of all 5 dummy orders
- Status badges (color coded)
- "View Details" expands inline (accordion)

### `/account/profile` — Profile Editor
- Form pre-filled with dummy user data
- Fields: Name, Email, Phone, Address
- "Save Changes" button (does nothing, or shows a toast)

---

### `/auth/login`
- Clean centered card
- Email + Password fields
- "Sign In" → sets Redux `isLoggedIn: true`, redirects to `/account`
- Link to Register

### `/auth/register`
- Name + Email + Password + Confirm Password
- "Create Account" → sets Redux `isLoggedIn: true`, redirects to `/`
- Link to Login

---

## 8. Shared Components

| Component | Description |
|---|---|
| `Navbar` | Logo + nav links + search icon + wishlist icon (with count badge) + cart icon (with count badge) + account icon. Sticky on scroll. Mobile hamburger. |
| `Footer` | 4-column: Brand info, Shop links, Account links, Contact. Bottom: copyright + social icons. |
| `CartDrawer` | Sheet (shadcn) that slides in from right. Shows cart items + total + checkout CTA. |
| `MobileMenu` | Sheet from left. Full nav links + category list. |
| `ProductCard` | Image, badge, name, brand, rating, price. Hover reveals "Quick Add" button. |
| `Rating` | Star display from numeric value (e.g. 4.3 → 4 filled + 1 partial) |
| `QuantitySelector` | −/+ buttons with input |
| `Breadcrumb` | Using shadcn Breadcrumb |
| `Badge` | Colored pill for "New", "Sale", "Hot", "Limited" |
| `SectionHeading` | Headline + optional subtext + optional "View All" link |

---

## 9. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 640px` (mobile) | Single column layouts, bottom nav icons, mobile menu drawer |
| `640–1024px` (tablet) | 2-col grids, collapsible filters |
| `> 1024px` (desktop) | 3–4 col grids, sidebar filters visible |

---

## 10. UI/UX Details

- **Cart Drawer** opens immediately when user adds to cart
- **Toast notifications** (shadcn `Sonner` or `useToast`) for:
  - Item added to cart
  - Item added to wishlist
  - Profile saved
- **Skeleton loaders** on product grid (shimmer effect, even though data is instant)
- **Smooth page transitions** via CSS
- **Active nav link** highlighted in navbar
- **404 page** with a playful illustration and back-home CTA

---

## 11. shadcn/ui Components Used

```
Button, Card, Badge, Sheet, Dialog, Dropdown Menu,
Select, Slider, Checkbox, Input, Label, Separator,
Tabs, Accordion, Avatar, Skeleton, Sonner (toast),
Breadcrumb, ScrollArea, Toggle, Tooltip
```

---

## 12. Build Order (Recommended for AI)

Follow this order to avoid broken imports:

```
1.  types/index.ts
2.  constants/ (all files)
3.  store/ (index + all slices)
4.  hooks/ (useCart, useWishlist)
5.  lib/utils.ts
6.  components/shared/ (all)
7.  components/layout/Navbar + Footer + MobileMenu + CartDrawer
8.  app/layout.tsx  ← wraps everything in Redux Provider
9.  app/page.tsx + all home/ components
10. app/shop/page.tsx + shop/ components
11. app/shop/[slug]/page.tsx + product/ components
12. app/category/[slug]/page.tsx
13. app/cart/page.tsx + cart/ components
14. app/wishlist/page.tsx
15. app/checkout/page.tsx + checkout/ components
16. app/order-success/page.tsx
17. app/auth/login + register
18. app/account/ (all)
19. app/not-found.tsx
```

---

## 13. Key Implementation Notes for AI

1. **No API calls.** All data imported directly from `constants/`.
2. **Redux Provider** must wrap the app in `app/layout.tsx` — use a client wrapper component since layout is a Server Component.
3. **Images:** Use `next/image` with `unoptimized` prop for external Unsplash URLs, or set `remotePatterns` in `next.config.js` for `images.unsplash.com`.
4. **Routing:** Use Next.js App Router. All interactive components (with hooks/Redux) must be `"use client"`.
5. **Tailwind config:** Extend with brand colors (`primary`, `accent`, `surface`, `muted`).
6. **shadcn init:** Run `npx shadcn@latest init` with default style `default`, base color `neutral`.
7. **Auth guard:** Account pages check `isLoggedIn` from Redux; if false, use `useRouter().replace('/auth/login')`.
8. **Cart persistence:** Optionally use `redux-persist` with localStorage so cart survives refresh. Not required but adds realism.
9. **Dummy checkout:** On "Place Order", clear cart in Redux and redirect to `/order-success`.
10. **Filters on /shop:** All filtering/sorting is pure client-side array manipulation — no URL state required (but optional for extra realism).

---

## 14. Suggested `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
```

---

## 15. Suggested `tailwind.config.ts` Extension

```ts
theme: {
  extend: {
    colors: {
      primary: '#0f0f0f',
      accent: '#e8ff47',
      surface: '#f5f5f0',
      muted: '#888888',
    },
    fontFamily: {
      heading: ['var(--font-playfair)', 'serif'],
      body: ['var(--font-dm-sans)', 'sans-serif'],
    },
  },
},
```

---

*End of Plan — total estimated pages: 12 | components: ~40 | slices: 3 | constant files: 6*