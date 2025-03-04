import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-24 mb-6" />

      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square rounded-lg" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/4" />

          <div className="mt-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="mt-8">
            <Skeleton className="h-10 w-32 mb-4" />
            <Skeleton className="h-12 w-full md:w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

