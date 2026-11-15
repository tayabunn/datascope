"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  useGetSavedViewsQuery,
  useDeleteViewMutation,
  useToggleShareSavedViewMutation,
  SavedViewItem,
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
  openSaveModal,
  openEditModal,
} from "@/store/slices/savedViewsSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  BookmarkCheck,
  BookmarkPlus,
  Share2,
  Trash2,
  Edit2,
  ArrowRight,
  Filter,
  Calendar,
  Layers,
  Database,
  ArrowUpDown,
  Eye,
  Lock,
  Globe,
  Sparkles,
  Users,
} from "lucide-react";

export default function SavedViewsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetSavedViewsQuery();
  const [deleteView] = useDeleteViewMutation();
  const [toggleShareView] = useToggleShareSavedViewMutation();

  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "shared" | "private">("all");

  const views: SavedViewItem[] = data?.data || [];

  const filteredViews = views.filter((v) => {
    if (activeFilterTab === "shared") return v.isShared;
    if (activeFilterTab === "private") return !v.isShared;
    return true;
  });

  const handleApplyView = (view: SavedViewItem) => {
    const f = view.filters || {};
    if (f.status) dispatch(setStatusFilter(f.status));
    if (f.category) dispatch(setCategoryFilter(f.category));
    if (f.country) dispatch(setCountryFilter(f.country));
    if (f.minRevenue != null || f.maxRevenue != null) {
      dispatch(
        setRevenueRange({
          min: f.minRevenue ?? null,
          max: f.maxRevenue ?? null,
        })
      );
    }
    if (view.searchConditions?.q != null) {
      dispatch(setGlobalQuery(view.searchConditions.q));
    }
    if (view.visibleColumns && view.visibleColumns.length > 0) {
      dispatch(setVisibleColumns(view.visibleColumns));
    }

    dispatch(
      addToast({
        type: "success",
        title: "Configuration Applied",
        message: `Applied "${view.viewName}" to Data Explorer.`,
      })
    );

    router.push("/explorer");
  };

  const handleToggleShare = async (view: SavedViewItem) => {
    try {
      const res = await toggleShareView({
        id: view.id,
        isShared: !view.isShared,
      }).unwrap();

      dispatch(
        addToast({
          type: "info",
          title: view.isShared ? "View Made Private" : "View Shared with Team",
          message: res.message || "Team sharing permissions updated.",
        })
      );
    } catch (err) {
      dispatch(
        addToast({
          type: "error",
          title: "Share Update Failed",
          message: "Could not update sharing permissions.",
        })
      );
    }
  };

  const handleDeleteView = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteView(id).unwrap();
        dispatch(
          addToast({
            type: "info",
            title: "View Deleted",
            message: `Saved view "${name}" was permanently removed.`,
          })
        );
      } catch (err) {
        dispatch(
          addToast({
            type: "error",
            title: "Delete Failed",
            message: "Unable to delete view.",
          })
        );
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Bar with Title and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Saved Views & Analytical Presets
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  {views.length} Presets
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Save, manage, reuse, and share high-frequency search criteria, column layouts, and multi-filter rules.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter Tabs */}
              <div className="flex items-center bg-[#141926] border border-[#222a3d] rounded-lg p-0.5 text-xs font-medium">
                <button
                  onClick={() => setActiveFilterTab("all")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeFilterTab === "all"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  All ({views.length})
                </button>
                <button
                  onClick={() => setActiveFilterTab("shared")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeFilterTab === "shared"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Team Shared ({views.filter((v) => v.isShared).length})
                </button>
                <button
                  onClick={() => setActiveFilterTab("private")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeFilterTab === "private"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Private ({views.filter((v) => !v.isShared).length})
                </button>
              </div>

              {/* Create View Button */}
              <button
                onClick={() => dispatch(openSaveModal())}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/20 transition-all"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save Current View</span>
              </button>
            </div>
          </div>

          {/* Saved Views Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 bg-[#0f131f] rounded-xl animate-pulse border border-[#1b2234]" />
              ))
            ) : filteredViews.length === 0 ? (
              <div className="col-span-full text-center py-20 text-zinc-500 rounded-xl bg-[#0c0f18] border border-[#1b2234]">
                <BookmarkCheck className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-zinc-300">No Saved Views Found</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  {activeFilterTab !== "all"
                    ? `No views match the "${activeFilterTab}" filter tab.`
                    : "Configure filters and search queries in Data Explorer, then click 'Save View'."}
                </p>
              </div>
            ) : (
              filteredViews.map((v) => (
                <div
                  key={v.id}
                  className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-md"
                >
                  {/* Top: Header & Sharing Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleToggleShare(v)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                          v.isShared
                            ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/25 hover:bg-cyan-500/20"
                            : "bg-zinc-800/80 text-zinc-400 border-zinc-700/60 hover:bg-zinc-700"
                        }`}
                        title="Click to toggle team sharing"
                      >
                        {v.isShared ? (
                          <>
                            <Globe className="w-3 h-3 text-cyan-400" />
                            <span>Team Shared</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-zinc-500" />
                            <span>Private</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] font-mono text-zinc-500">
                        {v.createdAt?.slice(0, 10)}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {v.viewName}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {v.description || "No description provided."}
                    </p>

                    {/* Dataset Name */}
                    <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                      <Database className="w-3 h-3 text-indigo-400" />
                      <span className="truncate">{v.datasetName || "Global Enterprise (100k)"}</span>
                    </div>
                  </div>

                  {/* Filter chips & configuration details */}
                  <div className="space-y-3 pt-3 border-t border-[#1a2133]">
                    <div className="flex flex-wrap gap-1">
                      {/* Search condition if any */}
                      {v.searchConditions?.q && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          q: "{v.searchConditions.q}"
                        </span>
                      )}

                      {/* Filter key-values */}
                      {Object.entries(v.filters || {}).map(([key, val]: any) => {
                        if (!val || val === "all") return null;
                        return (
                          <span
                            key={key}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161c2c] text-zinc-300 border border-[#242d44]"
                          >
                            {key}: {key.includes("Revenue") ? `$${Number(val).toLocaleString()}` : String(val)}
                          </span>
                        );
                      })}

                      {/* Sorting configuration */}
                      {v.sortingConfig && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/25 flex items-center gap-0.5">
                          <ArrowUpDown className="w-2.5 h-2.5" />
                          {v.sortingConfig.field} ({v.sortingConfig.order})
                        </span>
                      )}

                      {/* Columns count */}
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {v.visibleColumns?.length || 11} cols
                      </span>
                    </div>

                    {/* Card Actions: Edit, Delete, Apply */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => dispatch(openEditModal(v))}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1a2236] rounded-lg transition-colors"
                          title="Edit view details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteView(v.id, v.viewName)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete view"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

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
