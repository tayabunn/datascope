"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#161c2c]/70 border border-[#1f283d]/40",
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}

export function TableSkeletonRows({ rows = 10, cols = 8 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-[#171d2e] w-full">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3 animate-pulse">
          <Skeleton className="w-4 h-4 rounded" />
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className="h-3.5 flex-1"
              style={{ maxWidth: `${80 + ((c * 23) % 40)}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Skeleton;

