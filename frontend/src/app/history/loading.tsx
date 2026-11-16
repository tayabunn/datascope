import React from "react";
import {
  DashboardPageSkeleton,
  PageHeaderSkeleton,
  Skeleton,
} from "@/components/common/LoadingSkeleton";

export default function HistoryLoading() {
  return (
    <DashboardPageSkeleton>
      <div className="space-y-6 w-full animate-in fade-in duration-200">
        <PageHeaderSkeleton />
        <div className="rounded-lg bg-[#0e121c] border border-[#1b2234] divide-y divide-[#171d2e] overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4 animate-shimmer">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </DashboardPageSkeleton>
  );
}
