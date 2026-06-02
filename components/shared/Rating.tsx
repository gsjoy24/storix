import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  showValue?: boolean
  className?: string
}

export function Rating({ value, max = 5, showValue = false, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = value - i
        if (filled >= 1) {
          return <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        }
        if (filled > 0) {
          return <StarHalf key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        }
        return <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-muted-foreground">{value}</span>
      )}
    </div>
  )
}
