import { cn } from "@/lib/utils"

interface BadgeProps {
  variant?: "New" | "Sale" | "Hot" | "Limited"
  className?: string
}

const variantStyles: Record<string, string> = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Sale: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Hot: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Limited: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export function Badge({ variant = "New", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {variant}
    </span>
  )
}
