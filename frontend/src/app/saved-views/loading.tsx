import React from "react";
import {
  DashboardPageSkeleton,
  CardGridSkeleton,
} from "@/components/common/LoadingSkeleton";

export default function SavedViewsLoading() {
  return (
    <DashboardPageSkeleton>
      <CardGridSkeleton count={6} />
    </DashboardPageSkeleton>
  );
}
