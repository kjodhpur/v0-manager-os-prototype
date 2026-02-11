import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`kpi-${i}`} className="border-border">
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="mb-2 h-10 w-16" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`row-${i}`} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions and Insights Skeleton */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-52" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`action-${i}`} className="rounded-lg border border-border p-3">
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-2 h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`flag-${i}`} className="flex items-start gap-2">
                  <Skeleton className="h-4 w-4 shrink-0 rounded" />
                  <div className="flex-1">
                    <Skeleton className="mb-1 h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
