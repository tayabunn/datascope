import React from "react";
import {
  DashboardPageSkeleton,
  PageHeaderSkeleton,
  CardSkeleton,
  Skeleton,
} from "@/components/common/LoadingSkeleton";

export default function OverviewLoading() {
  return (
    <DashboardPageSkeleton>
      <div className="space-y-6 w-full animate-in fade-in duration-200">
        <PageHeaderSkeleton />

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>

        {/* Grid panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-lg bg-[#0f131f] border border-[#1d2538] space-y-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="p-5 rounded-lg bg-[#0f131f] border border-[#1d2538] space-y-4">
            <Skeleton className="h-4 w-36" />
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </DashboardPageSkeleton>
  );
}
