import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-6 h-4 w-48" />
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
