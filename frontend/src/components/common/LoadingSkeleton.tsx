"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { Database, Zap, Sparkles } from "lucide-react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * High-performance animated shimmer skeleton box
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-none bg-[#141926]/80 border border-[#1f283d]/40",
        className
      )}
      {...props}
    />
  );
}

/**
 * DataScope Branded Glowing Pulse Spinner
 */
export function DataScopeSpinner({ size = "md", label }: { size?: "sm" | "md" | "lg"; label?: string }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-2",
    lg: "w-16 h-16 border-3",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing orb */}
        <div
          className={cn(
            "absolute rounded-full bg-gradient-to-tr from-[#6c35f5]/30 to-[#ff8204]/20 blur-md animate-pulse",
            size === "sm" ? "w-8 h-8" : size === "md" ? "w-14 h-14" : "w-24 h-24"
          )}
        />
        {/* Spinning gradient border ring */}
        <div
          className={cn(
            "rounded-full border-t-[#968dfa] border-r-[#ff8204] border-b-transparent border-l-transparent animate-spin",
            sizeClasses[size]
          )}
        />
        {/* Center Icon */}
        <div className="absolute flex items-center justify-center">
          <Database
            className={cn(
              "text-[#968dfa] animate-pulse",
              size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-7 h-7"
            )}
          />
        </div>
      </div>
      {label && (
        <span className="text-xs font-mono text-zinc-400 tracking-wider animate-pulse uppercase">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Single KPI Stat Card Skeleton
 */
export function CardSkeleton() {
  return (
    <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-3 animate-shimmer">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-3 w-48" />
    </div>
  );
}

/**
 * Page Header Skeleton with Title, Badge, Subtitle & Action Button
 */
export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-48 sm:w-64" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-3.5 w-72 sm:w-96" />
      </div>
      <Skeleton className="h-9 w-32 rounded-none" />
    </div>
  );
}

/**
 * Filter Bar Skeleton matching the newly spaced Data Explorer header
 */
export function FilterBarSkeleton() {
  return (
    <div className="render-card rounded-none p-3.5 sm:p-4 shadow-md space-y-3.5">
      <div className="flex flex-wrap items-center gap-3.5">
        <Skeleton className="h-9 w-36 sm:w-40 rounded-none" />
        <Skeleton className="h-9 w-36 sm:w-44 rounded-none" />
        <Skeleton className="h-9 w-36 sm:w-44 rounded-none" />
        <Skeleton className="h-9 w-28 sm:w-32 rounded-none" />
      </div>
      <div className="flex flex-wrap items-center gap-3.5 pt-1 border-t border-[#1a2133]">
        <Skeleton className="h-8 w-36 rounded-none" />
        <Skeleton className="h-8 w-24 rounded-none" />
        <Skeleton className="h-8 w-24 rounded-none" />
      </div>
    </div>
  );
}

/**
 * Table Skeleton Rows
 */
export function TableSkeletonRows({ rows = 10, cols = 8 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-[#171d2e] w-full">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3.5 animate-shimmer">
          <Skeleton className="w-4 h-4 rounded-none" />
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

/**
 * Complete Data Table Skeleton with toolbar, headers, rows and pagination
 */
export function TableSkeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div className="rounded-none bg-[#0e121c] border border-[#1b2234] overflow-hidden shadow-lg space-y-0">
      {/* Table Toolbar */}
      <div className="p-3.5 bg-[#0b0e17] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-44 rounded-full hidden sm:block" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-32 rounded-none" />
          <Skeleton className="h-7 w-20 rounded-none" />
          <Skeleton className="h-7 w-24 rounded-none" />
        </div>
      </div>

      {/* Table Header Row */}
      <div className="bg-[#0f1320] border-b border-[#1b2234] px-4 py-3 flex items-center gap-4">
        <Skeleton className="w-4 h-4 rounded-none" />
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3.5 w-48 flex-1" />
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3.5 w-24" />
      </div>

      {/* Table Body Rows */}
      <TableSkeletonRows rows={rows} cols={7} />

      {/* Table Pagination Footer */}
      <div className="p-3 bg-[#0b0e17] border-t border-[#1b2234] flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-4 w-36" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-24 rounded-none" />
          <Skeleton className="h-7 w-8 rounded-none" />
          <Skeleton className="h-7 w-8 rounded-none" />
          <Skeleton className="h-7 w-8 rounded-none" />
          <Skeleton className="h-7 w-20 rounded-none" />
        </div>
      </div>
    </div>
  );
}

/**
 * Analytics Page Skeleton
 */
export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <PageHeaderSkeleton />

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* 2 Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="h-64 flex items-end gap-3 pt-6 px-2">
            {[45, 60, 75, 50, 85, 65].map((h, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-none"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border-8 border-[#1f283d]/40 animate-pulse flex items-center justify-center">
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area Trend Chart */}
      <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-48 w-full rounded-none" />
      </div>

      {/* Database Index Telemetry Cards */}
      <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-4">
        <Skeleton className="h-4 w-60" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-none" />
          <Skeleton className="h-24 rounded-none" />
          <Skeleton className="h-24 rounded-none" />
        </div>
      </div>
    </div>
  );
}

/**
 * Visual Query Builder Skeleton
 */
export function QueryBuilderSkeleton() {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <PageHeaderSkeleton />

      {/* Active Predicate Builder Box */}
      <div className="render-card rounded-none p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-[#1d2538] pb-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-32 rounded-none" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-none" />
          <Skeleton className="h-12 w-full rounded-none" />
          <Skeleton className="h-12 w-full rounded-none" />
        </div>
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-44 rounded-none" />
        </div>
      </div>

      {/* Compiled AST Box */}
      <div className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-3">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-36 w-full rounded-none" />
      </div>
    </div>
  );
}

/**
 * Card Grid Skeleton (for Saved Views, Datasets, etc.)
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-none bg-[#0f131f] border border-[#1d2538] space-y-4 animate-shimmer"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-3.5 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-6 w-16 rounded-none" />
              <Skeleton className="h-6 w-20 rounded-none" />
              <Skeleton className="h-6 w-16 rounded-none" />
            </div>
            <div className="pt-3 border-t border-[#1a2133] flex justify-end">
              <Skeleton className="h-8 w-28 rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Full Page Dashboard Lazy Loader Layout Skeleton
 * Used by loading.tsx files
 */
export function DashboardPageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-[#0c0f18] border-r border-[#1a2030] p-4 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="w-8 h-8 rounded-none" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>
          <div className="space-y-2 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-none" />
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-[#1a2030]">
          <Skeleton className="h-12 w-full rounded-none" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Placeholder */}
        <header className="h-18 bg-[#0c0f17]/90 border-b border-[#1a2030] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-64 rounded-none" />
            <Skeleton className="h-9 w-44 rounded-none hidden lg:block" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-48 sm:w-64 rounded-none" />
            <Skeleton className="h-9 w-24 rounded-none hidden sm:block" />
            <Skeleton className="h-9 w-28 rounded-none" />
          </div>
        </header>

        {/* Dynamic Page Skeleton */}
        <main className="p-6 space-y-6 w-full">{children}</main>
      </div>
    </div>
  );
}

/**
 * DataScope Full-Screen Centered Lazy Loading State
 */
export function FullScreenLoader({ message = "Loading DataScope..." }: { message?: string }) {
  return (
    <div className="h-screen w-screen bg-[#080a10] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <DataScopeSpinner size="lg" />
      <div className="space-y-2 max-w-sm">
        <h3 className="text-base font-bold text-white tracking-tight">{message}</h3>
        <p className="text-xs text-zinc-400 font-sans">
          Syncing PostgreSQL indexes, streaming cache records, and warming client state.
        </p>
      </div>
      {/* Progress Bar Shimmer */}
      <div className="w-56 h-1 bg-[#141926] rounded-full overflow-hidden relative border border-[#1f283d]">
        <div className="animate-progress-fast rounded-full" />
      </div>
    </div>
  );
}

export default Skeleton;
