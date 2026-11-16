"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStatusFilter,
  setCategoryFilter,
  setCountryFilter,
  setRevenueRange,
  setGlobalQuery,
  clearAllFilters,
  toggleAdvancedBuilder,
} from "@/store/slices/searchConfigSlice";
import { openSaveModal } from "@/store/slices/savedViewsSlice";
import { setVisibleColumns } from "@/store/slices/uiPreferenceSlice";
import { addToast } from "@/store/slices/toastSlice";
import { useGetSavedViewsQuery, SavedViewItem } from "@/store/api/recordsApi";
import {
  Filter,
  RotateCcw,
  BookmarkPlus,
  BookmarkCheck,
  History,
  SlidersHorizontal,
  ChevronDown,
  DollarSign,
  Globe,
  Tag,
  Activity,
} from "lucide-react";

const STATUS_OPTIONS = ["all", "Active", "Pending", "Inactive", "Archived"];
const CATEGORY_OPTIONS = [
  "all",
  "Enterprise",
  "Mid-Market",
  "SMB",
  "Public Sector",
  "Financial Services",
];
const COUNTRY_OPTIONS = [
  "all",
  "Germany",
  "United States",
  "United Kingdom",
  "France",
  "Japan",
  "Canada",
  "Australia",
  "Singapore",
  "Netherlands",
  "Switzerland",
];

export default function FilterBuilder() {
  const dispatch = useAppDispatch();
  const {
    statusFilter,
    categoryFilter,
    countryFilter,
    minRevenue,
    maxRevenue,
    isAdvancedBuilderOpen,
  } = useAppSelector((state) => state.searchConfig);

  const { data: savedViewsData } = useGetSavedViewsQuery();
  const savedViews: SavedViewItem[] = savedViewsData?.data || [];

  const handleApplySavedView = (view: SavedViewItem) => {
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
        title: "Preset Applied",
        message: `Loaded saved configuration "${view.viewName}".`,
      })
    );
  };

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (categoryFilter !== "all" ? 1 : 0) +
    (countryFilter !== "all" ? 1 : 0) +
    (minRevenue != null ? 1 : 0) +
    (maxRevenue != null ? 1 : 0);

  return (
    <div className="render-card rounded-lg p-5 space-y-4 shadow-md">
      {/* Top Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-3.5">
          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              aria-label="Filter records by status"
              className="appearance-none pl-9 pr-9 py-2 rounded-lg bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st} className="bg-[#141926]">
                  Status: {st === "all" ? "All Statuses" : st}
                </option>
              ))}
            </select>
            <Activity className="w-4 h-4 text-[#968dfa] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
              aria-label="Filter records by sector category"
              className="appearance-none pl-9 pr-9 py-2 rounded-lg bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} className="bg-[#141926]">
                  Category: {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <Tag className="w-4 h-4 text-[#ffa033] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <select
              value={countryFilter}
              onChange={(e) => dispatch(setCountryFilter(e.target.value))}
              aria-label="Filter records by country"
              className="appearance-none pl-9 pr-9 py-2 rounded-lg bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
            >
              {COUNTRY_OPTIONS.map((ct) => (
                <option key={ct} value={ct} className="bg-[#141926]">
                  Country: {ct === "all" ? "All Countries" : ct}
                </option>
              ))}
            </select>
            <Globe className="w-4 h-4 text-[#38bdf8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Toggle Advanced Ranges */}
          <button
            onClick={() => dispatch(toggleAdvancedBuilder())}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all shadow-sm ${
              isAdvancedBuilderOpen
                ? "bg-[#6c35f5]/20 text-[#b193e0] border-[#968dfa]/40"
                : "btn-render-secondary"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#968dfa]" />
            <span>Range Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#6c35f5] text-white font-mono text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls: Saved Views, History, Reset & Save View */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Saved Views Dropdown */}
          {savedViews.length > 0 && (
            <div className="relative">
              <select
                onChange={(e) => {
                  const selected = savedViews.find((v) => v.id === e.target.value);
                  if (selected) handleApplySavedView(selected);
                  e.target.value = "";
                }}
                defaultValue=""
                aria-label="Load a saved search view"
                className="appearance-none pl-9 pr-9 py-2 rounded-lg bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-[#968dfa]/50 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
                title="Select and apply a saved search configuration"
              >
                <option value="" disabled>
                  Saved Views ({savedViews.length})
                </option>
                {savedViews.map((sv) => (
                  <option key={sv.id} value={sv.id} className="bg-[#141926] text-white">
                    {sv.isShared ? "🌐 " : "🔒 "} {sv.viewName}
                  </option>
                ))}
              </select>
              <BookmarkCheck className="w-4 h-4 text-[#968dfa] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Quick Link to Search History */}
          <Link
            href="/history"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg btn-render-secondary text-xs font-semibold shadow-sm"
            title="View recent search query history"
          >
            <History className="w-4 h-4 text-[#968dfa]" />
            <span className="hidden sm:inline">History</span>
          </Link>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => dispatch(clearAllFilters())}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#a1a1aa] hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => dispatch(openSaveModal())}
            className="flex items-center gap-2 px-4 py-2 rounded-lg btn-render-primary text-xs font-semibold shadow-md"
          >
            <BookmarkPlus className="w-4 h-4 text-[#b193e0]" />
            <span>Save View</span>
          </button>
        </div>
      </div>

      {/* Advanced Range Drawer (Collapsible) */}
      {isAdvancedBuilderOpen && (
        <div className="pt-3 border-t border-[#1b2234] grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
          {/* Revenue Range Inputs */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              Revenue Range (USD)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min ($10,000)"
                value={minRevenue ?? ""}
                onChange={(e) =>
                  dispatch(
                    setRevenueRange({
                      min: e.target.value ? Number(e.target.value) : null,
                      max: maxRevenue,
                    })
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
              />
              <span className="text-zinc-600 text-xs">to</span>
              <input
                type="number"
                placeholder="Max ($1,000,000)"
                value={maxRevenue ?? ""}
                onChange={(e) =>
                  dispatch(
                    setRevenueRange({
                      min: minRevenue,
                      max: e.target.value ? Number(e.target.value) : null,
                    })
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-zinc-400">
              Quick Revenue Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "> $50k", min: 50000, max: null },
                { label: "> $100k", min: 100000, max: null },
                { label: "> $500k (Tier-1)", min: 500000, max: null },
                { label: "$10k - $100k", min: 10000, max: 100000 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    dispatch(
                      setRevenueRange({ min: preset.min, max: preset.max })
                    )
                  }
                  className="px-2.5 py-1 rounded bg-[#161c2b] border border-[#222b40] text-[11px] font-mono text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

