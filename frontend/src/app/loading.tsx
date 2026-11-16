import React from "react";
import { FullScreenLoader } from "@/components/common/LoadingSkeleton";

export default function RootLoading() {
  return <FullScreenLoader message="Initializing DataScope..." />;
}
