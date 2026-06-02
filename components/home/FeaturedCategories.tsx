import Link from "next/link"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { categories } from "@/constants/categories"

export function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Shop by Category"
          subtitle="Find exactly what you're looking for"
          linkLabel="View All"
          linkHref="/shop"
          className="mb-8"
        />
        <ScrollArea>
          <div className="flex gap-4 pb-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group shrink-0 w-[180px]"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                     sizes="180px"

                  />
                </div>
                <h3 className="text-sm font-medium">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.productCount} products</p>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}
