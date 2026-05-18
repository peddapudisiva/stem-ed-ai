import { Skeleton } from "@/components/ui/skeleton"

export default function CalendarLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-8 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-8 rounded-full" />
      </div>
      <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
        <div className="grid grid-cols-7 border-b border-[#F4F4F2] p-2 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-6 rounded" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px p-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="min-h-[80px] rounded p-1 space-y-1">
              <Skeleton className="h-5 w-5 rounded-full" />
              {i % 5 === 0 && <Skeleton className="h-4 w-full rounded" />}
              {i % 7 === 0 && <Skeleton className="h-4 w-4/5 rounded" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
