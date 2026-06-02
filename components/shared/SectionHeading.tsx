import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  linkLabel?: string
  linkHref?: string
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  linkLabel,
  linkHref,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
