"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-10 text-center text-sm font-medium tabular-nums">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
