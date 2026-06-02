import Image from "next/image"
import { Rating } from "@/components/shared/Rating"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { testimonials } from "@/constants/testimonials"

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real reviews from real people"
          className="mb-8"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.slice(0, 4).map((t) => (
            <div key={t.id} className="rounded-xl border bg-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={`${t.author}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                   sizes="40px"

                />
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <Rating value={t.rating} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{t.body}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
