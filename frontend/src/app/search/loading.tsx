import React from "react";
import {
  DashboardPageSkeleton,
  QueryBuilderSkeleton,
} from "@/components/common/LoadingSkeleton";

export default function SearchLoading() {
  return (
    <DashboardPageSkeleton>
      <QueryBuilderSkeleton />
    </DashboardPageSkeleton>
  );
}
