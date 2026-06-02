"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductImagesProps {
  images: string[]
  name: string
}

export function ProductImages({ images, name }: ProductImagesProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover"
           priority
           sizes="(max-width: 1024px) 100vw, 50vw"

        />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square w-20 overflow-hidden rounded-lg border-2 bg-muted transition-colors",
              i === active ? "border-brand-primary" : "border-transparent hover:border-muted-foreground/30",
            )}
          >
             <Image src={img} alt={`${name} — view ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  )
}
