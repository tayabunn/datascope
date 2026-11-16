import React from "react";
import {
  DashboardPageSkeleton,
  PageHeaderSkeleton,
  FilterBarSkeleton,
  TableSkeleton,
} from "@/components/common/LoadingSkeleton";

export default function ExplorerLoading() {
  return (
    <DashboardPageSkeleton>
      <div className="space-y-6 w-full animate-in fade-in duration-200">
        <PageHeaderSkeleton />
        <FilterBarSkeleton />
        <TableSkeleton rows={12} />
      </div>
    </DashboardPageSkeleton>
  );
}
