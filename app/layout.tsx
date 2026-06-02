import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ReduxProvider } from "@/components/layout/ReduxProvider"
import { Navbar } from "@/components/layout/Navbar"
import { CartDrawer } from "@/components/layout/CartDrawer"
import { Footer } from "@/components/layout/Footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://storix.com"),
  title: {
    default: "Storix — Everything you need. Nothing you don't.",
    template: "%s | Storix",
  },
  description:
    "Modern lifestyle & tech accessories store. Premium headphones, wearables, bags, desk setups & more — curated for the modern you.",
  keywords: ["Storix", "ecommerce", "tech accessories", "lifestyle", "headphones", "wearables"],
  authors: [{ name: "Storix" }],
  creator: "Storix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://storix.com",
    siteName: "Storix",
    title: "Storix — Everything you need. Nothing you don't.",
    description:
      "Modern lifestyle & tech accessories store. Premium headphones, wearables, bags, desk setups & more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Storix — Modern lifestyle & tech accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storix — Everything you need. Nothing you don't.",
    description:
      "Modern lifestyle & tech accessories store. Premium headphones, wearables, bags, desk setups & more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <ReduxProvider>
            <TooltipProvider>
              <Navbar />
              <CartDrawer />
              <main id="main-content" className="min-h-[calc(100vh-4rem)]">
                {children}
              </main>
              <Footer />
            </TooltipProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
