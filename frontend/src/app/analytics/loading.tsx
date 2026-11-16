import React from "react";
import {
  DashboardPageSkeleton,
  AnalyticsSkeleton,
} from "@/components/common/LoadingSkeleton";

export default function AnalyticsLoading() {
  return (
    <DashboardPageSkeleton>
      <AnalyticsSkeleton />
    </DashboardPageSkeleton>
  );
}
