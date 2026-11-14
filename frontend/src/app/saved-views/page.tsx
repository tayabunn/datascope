"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  useGetSavedViewsQuery,
  useDeleteViewMutation,
} from "@/store/api/recordsApi";
import { useAppDispatch } from "@/store/hooks";
import {
  setStatusFilter,
  setCategoryFilter,
  setCountryFilter,
  setRevenueRange,
  setGlobalQuery,
} from "@/store/slices/searchConfigSlice";
import { setVisibleColumns } from "@/store/slices/uiPreferenceSlice";
import {
  BookmarkCheck,
  Share2,
  Trash2,
  ArrowRight,
  Filter,
  Calendar,
  Layers,
} from "lucide-react";

export default function SavedViewsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSavedViewsQuery({});
  const [deleteView] = useDeleteViewMutation();

  const handleApplyView = (view: any) => {
    const f = view.filters || {};
    if (f.status) dispatch(setStatusFilter(f.status));
    if (f.category) dispatch(setCategoryFilter(f.category));
    if (f.country) dispatch(setCountryFilter(f.country));
    if (f.minRevenue != null) {
      dispatch(setRevenueRange({ min: f.minRevenue, max: f.maxRevenue ?? null }));
    }
    if (view.searchConditions?.q) {
      dispatch(setGlobalQuery(view.searchConditions.q));
    }
    if (view.visibleColumns && view.visibleColumns.length > 0) {
      dispatch(setVisibleColumns(view.visibleColumns));
    }

    router.push("/explorer");
  };

  const views = data?.data || [];

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Saved Views & Query Presets
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                {views.length} Presets
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Access frequently used search configurations, multi-filter conditions, and share analytical views with your team.
            </p>
          </div>

          {/* Saved Views Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-44 bg-[#0f131f] rounded-xl animate-pulse" />
              ))
            ) : views.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-zinc-500">
                <BookmarkCheck className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm">No saved views found.</p>
              </div>
            ) : (
              views.map((v: any) => (
                <div
                  key={v.id}
                  className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-cyan-400" />
                        {v.isShared ? "Team Shared" : "Private"}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {v.createdAt?.slice(0, 10)}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {v.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {v.description || "No description provided."}
                    </p>
                  </div>

                  {/* Filter chips summary */}
                  <div className="space-y-3 pt-2 border-t border-[#1a2133]">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(v.filters || {}).map(([key, val]: any) => {
                        if (!val || val === "all") return null;
                        return (
                          <span
                            key={key}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161c2c] text-zinc-300 border border-[#242d44]"
                          >
                            {key}: {String(val)}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => deleteView(v.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                        title="Delete view"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleApplyView(v)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/20"
                      >
                        <span>Open in Explorer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

