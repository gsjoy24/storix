import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { promos } from "@/constants/promos"

export function PromoBlock() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid overflow-hidden rounded-2xl bg-brand-surface lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              {promos.promoBlock.headline}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {promos.promoBlock.body}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 w-fit rounded-full bg-brand-primary px-8 text-white hover:bg-brand-primary/90"
            >
              <Link href={promos.promoBlock.link}>{promos.promoBlock.cta}</Link>
            </Button>
          </div>
          <div className="relative min-h-[300px] overflow-hidden">
            <Image
              src={promos.promoBlock.image}
              alt="New season collection — premium accessories and lifestyle products"
              fill
              className="object-cover"
               sizes="(max-width: 1024px) 100vw, 50vw"

            />
          </div>
        </div>
      </div>
    </section>
  )
}
