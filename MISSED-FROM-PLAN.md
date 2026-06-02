# Storix — Missed Requirements & Additions

Things identified as necessary during development that were absent from the original project plan.

---

## 1. SEO & Discoverability

| Item | Reason |
|---|---|
| `app/sitemap.ts` | Dynamic sitemap for search engines indexing all product and category pages. No e-commerce site ships without one. |
| `app/robots.ts` | Crawl directives to allow/disallow routes (account, auth, checkout pages should not be indexed). |
| Full `metadata` on root layout | The plan had a basic `title` + `description`. Missing: `metadataBase`, `openGraph` (title, description, image, siteName), `twitter` card, `keywords`, `robots` directive, `alternates` canonical URL template. |
| `generateMetadata` on dynamic routes | `/shop/[slug]` and `/category/[slug]` need per-page SEO metadata (product name, description, OG image). Required for product page rankings. |
| Layout `metadata` for client pages | Client components (`"use client"`) cannot export `metadata`. Need separate `layout.tsx` files for `/shop`, `/cart`, `/checkout`, `/wishlist`, `/order-success`, `/auth`, `/account`. |

---

## 2. Accessibility (a11y)

| Item | Reason |
|---|---|
| Skip-to-content link | Required for keyboard navigation. A hidden link at the top of the page that becomes visible on focus. |
| `aria-label` on icon-only buttons | Navbar (Search, Cart, Wishlist, Account, Menu), Pagination (prev/next), ProductCard (wishlist), ProductInfo (wishlist, color swatches), CartItem (remove), Wishlist (remove), QuantitySelector (+/-) — all missing accessible names. |
| `aria-pressed` on toggle buttons | Wishlist heart buttons and color swatches need `aria-pressed` to communicate toggle state to screen readers. |
| `aria-label` on `<nav>` elements | Breadcrumb component needs `aria-label="Breadcrumb"` for screen reader navigation. |
| Screen-reader-only rating text | The `Rating` component renders visual stars only. A `<span className="sr-only">` is needed to announce the numeric value. |
| Descriptive `alt` text on images | Generic `alt="Hero"` and `alt="Promo"` on banner images became specific descriptions. |

---

## 3. Loading & Error States

| Item | Reason |
|---|---|
| `app/loading.tsx` (root) | The plan mentions skeleton loaders but no `loading.tsx` files were specified. Next.js automatically shows `loading.tsx` during navigation. |
| `app/shop/loading.tsx` | Product listing skeleton with 6 placeholder cards matching the 3-column grid. |
| `app/shop/[slug]/loading.tsx` | Product detail skeleton with image placeholder + text lines. |
| `app/category/[slug]/loading.tsx` | Category page skeleton with hero placeholder + product grid. |
| `app/error.tsx` (global error boundary) | No error boundary was planned. Client-side JS errors would otherwise crash the entire page. Includes reset + go-home actions. |

---

## 4. Authentication & Authorization

| Item | Reason |
|---|---|
| Centralized `AuthGuard` component | The plan had each protected page implementing its own auth check, leading to duplicated logic across 3 account pages. Extracted into a single `AuthGuard` wrapper used in `app/account/layout.tsx`. |
| `app/account/layout.tsx` | A shared layout for account pages that applies the `AuthGuard` and sets `noindex` metadata. |
| Login/Register redirect if already logged in | The plan only mentioned redirecting from account → login. Missing: redirect from login/register → account if already authenticated. |
| Login routes marked `noindex` | Auth pages should never appear in search results. |

---

## 5. Typed Redux Layer

| Item | Reason |
|---|---|
| `hooks/useRedux.ts` | The plan used bare `useDispatch()` and `useSelector()` from `react-redux`. Without typed wrappers (`useAppDispatch`, `useAppSelector`), selectors are untyped and prone to referencing invalid state paths. |
| Updated `useCart` and `useWishlist` | Both hooks switched from `useDispatch`/`useSelector` to the typed versions. |

---

## 6. Dark Mode

| Item | Reason |
|---|---|
| Theme toggle button in Navbar | The plan had a "d" keyboard shortcut via the ThemeProvider but no visible toggle. Added Sun/Moon icon button. |
| Theme toggle in MobileMenu | Mobile users had no way to toggle theme. Added a "Theme" row with Light/Dark button in the mobile drawer. |
| Dark mode override for `--color-brand-surface` | The brand surface color (`#f5f5f0`) was defined in `@theme inline` with no `.dark` variant, causing bright backgrounds in dark mode on HeroBanner and PromoBlock. Added `oklch(0.23 0.01 95)` override. |

---

## 7. Image Optimization

| Item | Reason |
|---|---|
| Removed `unoptimized` from all `next/Image` | The plan suggested `unoptimized` for external URLs, but `next.config.ts` already had `remotePatterns` for Unsplash. Keeping `unoptimized` forfeits Next.js image optimization (resizing, WebP/AVIF conversion, lazy loading). Removed from all 12 files using `next/Image`. |
| Added `sizes` prop to `fill` images | All `fill` images were missing the `sizes` attribute. Without it, Next.js assumes `100vw`, downloading unnecessarily large images on mobile. Added appropriate `sizes` values per component. |

---

## 8. UI/UX Polish

| Item | Reason |
|---|---|
| Label-to-Input vertical gap | The shadcn `Label` component had no `mb-*` class, so form labels sat flush against inputs across all forms (checkout, login, register, profile). Added `mb-1.5`. |
| Active nav link highlighting | Navbar links had no visual indicator for the current page. Added `usePathname()` with `bg-accent` styling. |
| Search icon links to `/shop` | The search icon in the Navbar had no `onClick` or link. Wired it to `/shop`. |
| Nav category links use `/category/[slug]` | The plan showed `/shop?category=electronics` for nav links but actual category pages exist at `/category/[slug]` with proper hero banners. |
| NewsletterBanner toast feedback | The subscribe form had `onSubmit={(e) => e.preventDefault()}` with no user feedback. Added a sonner toast on submit. |
| Checkout "Back to Cart" separator | The back button sat too close to "Place Order". Added a `<Separator>` between them. |
| Consistent CTA button padding | Primary CTA buttons were inconsistent — some used `px-8`, some relied on default padding. Standardized empty-state buttons with `px-6`. |
| HeroBanner desktop padding | `lg:py-0` removed all vertical padding on desktop, making content touch section edges. Changed to `lg:py-12`. |
| RelatedProducts container padding | Missing `px-4` on the container, causing content to touch viewport edges on small screens. |
| CartDrawer empty state double-spacing | The "Continue Shopping" button had both `gap-3` (from parent) and `mt-4` (on button), creating double the intended spacing. |
| SectionHeading subtitle gap | `space-y-1` (4px) between title and subtitle was too tight. Changed to `space-y-1.5` (6px). |
| ProductFilters slider extra margin | The Slider had `mt-2` on top of the accordion's `space-y-4`, causing uneven spacing. |
| ProductCard price margin | Price-to-rating gap jumped from `mt-1` (4px) to `mt-2` (8px). Smoothed to `mt-1.5`. |
| Product detail tabs margin | Fixed `mt-12` (48px) on mobile was excessive. Changed to responsive `mt-8 md:mt-12`. |
| Account orders back button margin | `mb-4` felt cramped. Increased to `mb-6`. |
| Error icon size | `h-16 w-16` was inconsistent with other empty states (e.g., cart uses `h-16`, 404 uses `h-24 w-24`). Standardized to `h-20 w-20`. |

---

## 9. React / Code Quality

| Item | Reason |
|---|---|
| `eslint-disable` for `set-state-in-effect` | The theme toggle components use `useEffect(() => { setMounted(true) }, [])` to prevent hydration mismatch — a standard pattern with `next-themes` that requires inline suppression. |
| Removed unused `selectIsWishlisted` import | The factory selector was exported but never used — components computed `isWishlisted` with `.some()` instead. |
| Fixed `i` variable bug in ProductInfo | Color swatch `aria-label` referenced `i` but the `.map()` callback had no index parameter. |

---

## Summary

| Category | Items Added |
|---|---|
| SEO | 6 files (sitemap, robots, metadata on 4+ layouts, 2 generateMetadata) |
| Accessibility | 14+ files with aria-labels, alt text, skip link, sr-only text |
| Loading/Error | 5 files (4 loading.tsx + 1 error.tsx) |
| Auth | 3 files (AuthGuard, account layout, redirects on login/register) |
| Redux | 1 file (typed hooks) + 2 updated |
| Dark Mode | 3 files (theme toggle in Navbar + MobileMenu, CSS override) |
| Images | 12 files (remove unoptimized, add sizes) |
| UI Polish | 14+ spacing/layout fixes |
| Code Quality | 3 fixes (lint, unused imports, bug) |
| **Total** | **~50 changes across ~30 files** |
