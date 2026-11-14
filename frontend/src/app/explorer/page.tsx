"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import FilterBuilder from "@/components/filters/FilterBuilder";
import DataTable from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetRecordsQuery } from "@/store/api/recordsApi";
import { setTelemetry } from "@/store/slices/uiPreferenceSlice";
import { Database, Filter, RefreshCw, Layers } from "lucide-react";

function ExplorerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Redux state
  const {
    globalQuery,
    statusFilter,
    categoryFilter,
    countryFilter,
    minRevenue,
    maxRevenue,
    startDate,
    endDate,
  } = useAppSelector((state) => state.searchConfig);

  const { pageSize } = useAppSelector((state) => state.uiPreference);

  // Pagination & Sorting state
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // RTK Query: Caching, deduplication, background refetching
  const queryParams = {
    page,
    pageSize,
    q: globalQuery,
    status: statusFilter,
    category: categoryFilter,
    country: countryFilter,
    minRevenue: minRevenue ?? undefined,
    maxRevenue: maxRevenue ?? undefined,
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
    sortField,
    sortOrder,
  };

  const { data, isLoading, isFetching, refetch } =
    useGetRecordsQuery(queryParams);

  // Synchronize telemetry with Redux for the Header badge
  useEffect(() => {
    if (data?.meta?.executionTimeMs != null) {
      dispatch(
        setTelemetry({
          lastQueryTimeMs: data.meta.executionTimeMs,
          cacheHit: !isFetching && !isLoading,
        })
      );
    }
  }, [data, isFetching, isLoading, dispatch]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [
    globalQuery,
    statusFilter,
    categoryFilter,
    countryFilter,
    minRevenue,
    maxRevenue,
  ]);

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const records = data?.data || [];
  const pagination = data?.pagination || {
    page: 1,
    pageSize,
    totalCount: 100000,
    totalPages: Math.ceil(100000 / pageSize),
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-5 max-w-7xl mx-auto w-full">
          {/* Page Title & Quick Refresh */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Data Explorer
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  100k+ Records
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Execute multi-condition searches, apply composite filters, and inspect record schemas with sub-20ms latency.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white text-xs font-medium transition-all"
                title="Force background cache invalidation & refetch"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-zinc-400 ${
                    isFetching ? "animate-spin text-cyan-400" : ""
                  }`}
                />
                <span>{isFetching ? "Syncing..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* Filter Builder Component */}
          <FilterBuilder />

          {/* Enterprise Data Table */}
          <DataTable
            records={records}
            isLoading={isLoading}
            isFetching={isFetching}
            page={pagination.page}
            pageSize={pageSize}
            totalCount={pagination.totalCount}
            totalPages={pagination.totalPages}
            onPageChange={(p) => setPage(p)}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        </main>
      </div>
    </div>
  );
}

export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#090b10] flex items-center justify-center text-zinc-400 font-mono text-xs">
          Loading Data Explorer...
        </div>
      }
    >
      <ExplorerContent />
    </Suspense>
  );
}

