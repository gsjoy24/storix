import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { promos } from "@/constants/promos"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-surface">
      <div className="container mx-auto grid min-h-[70vh] items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:py-0">
        <div className="space-y-6">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {promos.hero.headline}
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            {promos.hero.subheadline}
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-brand-primary px-8 text-white hover:bg-brand-primary/90"
          >
            <Link href={promos.hero.link}>{promos.hero.cta}</Link>
          </Button>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted lg:aspect-auto lg:h-full">
          <Image
            src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80"
            alt="Featured product — modern tech accessories on a clean background"
            fill
            className="object-cover"
            priority
             sizes="(max-width: 1024px) 100vw, 50vw"

          />
        </div>
      </div>
    </section>
  )
}
