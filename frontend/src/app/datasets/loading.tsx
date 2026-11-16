import React from "react";
import {
  DashboardPageSkeleton,
  CardGridSkeleton,
} from "@/components/common/LoadingSkeleton";

export default function DatasetsLoading() {
  return (
    <DashboardPageSkeleton>
      <CardGridSkeleton count={4} />
    </DashboardPageSkeleton>
  );
}
