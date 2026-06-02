import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div>
      <Skeleton className="h-48 w-full md:h-64" />
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-4 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
