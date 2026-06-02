"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
