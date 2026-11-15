"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  useGetSearchHistoryQuery,
  useClearSearchHistoryMutation,
  useDeleteSearchHistoryItemMutation,
  SearchHistoryItem,
} from "@/store/api/recordsApi";
import { useAppDispatch } from "@/store/hooks";
import {
  setGlobalQuery,
  setStatusFilter,
  setCategoryFilter,
  setCountryFilter,
  setRevenueRange,
} from "@/store/slices/searchConfigSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  History,
  Clock,
  ArrowRight,
  Zap,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Database,
} from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSearchHistoryQuery();
  const [clearHistory, { isLoading: isClearing }] = useClearSearchHistoryMutation();
  const [deleteItem] = useDeleteSearchHistoryItemMutation();

  const historyEntries: SearchHistoryItem[] = data?.data || [];

  const handleRerun = (item: SearchHistoryItem) => {
    // 1. Dispatch search query
    dispatch(setGlobalQuery(item.queryString || ""));

    // 2. Dispatch filters if present
    const f = item.filterConfig || {};
    dispatch(setStatusFilter(f.status || "all"));
    dispatch(setCategoryFilter(f.category || "all"));
    dispatch(setCountryFilter(f.country || "all"));
    dispatch(
      setRevenueRange({
        min: f.minRevenue ?? null,
        max: f.maxRevenue ?? null,
      })
    );

    dispatch(
      addToast({
        type: "info",
        title: "Search Re-executed",
        message: item.queryString
          ? `Searching for "${item.queryString}" in Data Explorer.`
          : "Filters reapplied to Data Explorer.",
      })
    );

    router.push("/explorer");
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear your entire search history?")) {
      try {
        await clearHistory().unwrap();
        dispatch(
          addToast({
            type: "info",
            title: "History Cleared",
            message: "Your recent search history has been wiped.",
          })
        );
      } catch (err) {
        dispatch(
          addToast({
            type: "error",
            title: "Operation Failed",
            message: "Unable to clear search history.",
          })
        );
      }
    }
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteItem(id).unwrap();
    } catch (err) {
      console.error("Delete history item error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-5xl mx-auto w-full">
          {/* Header & Clear History Button */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Search & Query Execution History
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  {historyEntries.length} Recorded Queries
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Automatically maintained audit trail of recently executed queries, filter combinations, and query execution times.
              </p>
            </div>

            {historyEntries.length > 0 && (
              <button
                onClick={handleClearAll}
                disabled={isClearing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-white text-xs font-medium transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {/* History List Container */}
          <div className="rounded-xl bg-[#0f131f] border border-[#1d2538] overflow-hidden shadow-lg">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-14 bg-[#141a29] rounded-lg animate-pulse" />
                ))}
              </div>
            ) : historyEntries.length === 0 ? (
              <div className="p-16 text-center text-zinc-500 space-y-2">
                <History className="w-10 h-10 text-zinc-600 mx-auto" />
                <h4 className="text-sm font-semibold text-zinc-300">No Query History Recorded</h4>
                <p className="text-xs text-zinc-500">
                  Searches executed in the Data Explorer or Advanced Search will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#171d2e]">
                {historyEntries.map((item) => {
                  const filterEntries = Object.entries(item.filterConfig || {}).filter(
                    ([_, val]) => val && val !== "all"
                  );

                  return (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-[#121724] transition-colors flex flex-wrap items-center justify-between gap-4 text-xs font-mono group"
                    >
                      {/* Left: Query & Filters */}
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-zinc-100 font-semibold text-xs">
                            {item.queryString ? `"${item.queryString}"` : "Multi-Predicate Filter Search"}
                          </span>
                        </div>

                        {/* Filter chips summary */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-sans">
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.executedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            ({new Date(item.executedAt).toLocaleDateString()})
                          </span>

                          {filterEntries.length > 0 && (
                            <>
                              <span className="text-zinc-600">•</span>
                              <div className="flex flex-wrap gap-1">
                                {filterEntries.map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="px-1.5 py-0.2 rounded bg-[#161c2c] text-zinc-300 border border-[#242d44] text-[10px] font-mono"
                                  >
                                    {k}: {String(v)}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right: Matches, Latency & Rerun Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-zinc-200 font-semibold text-xs">
                            {item.totalMatches.toLocaleString()} matches
                          </div>
                          <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1">
                            <Zap className="w-3 h-3" />
                            <span>{item.executionTimeMs} ms</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleRerun(item)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#161c2c] hover:bg-indigo-600 border border-[#232c42] hover:border-indigo-500 text-zinc-300 hover:text-white transition-all shadow-sm"
                          title="Load this search configuration into Data Explorer"
                        >
                          <span>Rerun</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
