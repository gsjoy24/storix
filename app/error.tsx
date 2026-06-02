"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <AlertTriangle className="h-16 w-16 text-amber-500" />
      <h1 className="mt-4 font-heading text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        We encountered an unexpected error. Please try again.
      </p>
      <div className="mt-6 flex gap-4">
        <Button onClick={reset} className="rounded-full">
          Try Again
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
