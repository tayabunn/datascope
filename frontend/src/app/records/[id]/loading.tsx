import React from "react";
import {
  DashboardPageSkeleton,
  PageHeaderSkeleton,
  Skeleton,
} from "@/components/common/LoadingSkeleton";

export default function RecordDetailLoading() {
  return (
    <DashboardPageSkeleton>
      <div className="space-y-6 w-full animate-in fade-in duration-200">
        <PageHeaderSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-lg bg-[#0f131f] border border-[#1d2538] space-y-4">
            <Skeleton className="h-6 w-56" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-36" />
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-lg bg-[#0f131f] border border-[#1d2538] space-y-4">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-3 pt-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </DashboardPageSkeleton>
  );
}
