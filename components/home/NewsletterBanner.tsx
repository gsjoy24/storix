"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterBanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-brand-primary p-8 text-center text-white md:p-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Stay in the loop</h2>
          <p className="mt-2 text-white/70">
            Subscribe for exclusive drops, early access, and 10% off your first order.
          </p>
          <form
            className="mt-6 mx-auto flex max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button
              type="submit"
              className="rounded-full bg-brand-accent text-brand-primary hover:bg-brand-accent/90"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
