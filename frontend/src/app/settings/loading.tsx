import React from "react";
import {
  DashboardPageSkeleton,
  PageHeaderSkeleton,
  Skeleton,
} from "@/components/common/LoadingSkeleton";

export default function SettingsLoading() {
  return (
    <DashboardPageSkeleton>
      <div className="space-y-6 w-full animate-in fade-in duration-200">
        <PageHeaderSkeleton />
        <div className="p-6 rounded-lg bg-[#0f131f] border border-[#1d2538] space-y-5">
          <Skeleton className="h-5 w-44" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="pt-2 flex justify-end">
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
        </div>
      </div>
    </DashboardPageSkeleton>
  );
}
