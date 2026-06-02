import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <PackageOpen className="h-24 w-24 text-muted-foreground/30" />
      <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        This page seems to have wandered off.
      </p>
      <Button
        asChild
        size="lg"
        className="mt-6 rounded-full bg-brand-primary px-8 text-white hover:bg-brand-primary/90"
      >
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
