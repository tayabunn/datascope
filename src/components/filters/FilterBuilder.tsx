"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStatusFilter,
  setCategoryFilter,
  setCountryFilter,
  setRevenueRange,
  clearAllFilters,
  toggleAdvancedBuilder,
} from "@/store/slices/searchConfigSlice";
import { openSaveModal } from "@/store/slices/savedViewsSlice";
import {
  Filter,
  RotateCcw,
  BookmarkPlus,
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

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (categoryFilter !== "all" ? 1 : 0) +
    (countryFilter !== "all" ? 1 : 0) +
    (minRevenue != null ? 1 : 0) +
    (maxRevenue != null ? 1 : 0);

  return (
    <div className="bg-[#0e121c] border border-[#1b2234] rounded-xl p-4 space-y-3 shadow-sm">
      {/* Top Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              aria-label="Filter records by status"
              className="appearance-none pl-7 pr-8 py-1.5 rounded-lg bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 font-medium hover:border-zinc-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st} className="bg-[#141926]">
                  Status: {st === "all" ? "All Statuses" : st}
                </option>
              ))}
            </select>
            <Activity className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
              aria-label="Filter records by sector category"
              className="appearance-none pl-7 pr-8 py-1.5 rounded-lg bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 font-medium hover:border-zinc-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} className="bg-[#141926]">
                  Category: {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="relative">
            <select
              value={countryFilter}
              onChange={(e) => dispatch(setCountryFilter(e.target.value))}
              aria-label="Filter records by country"
              className="appearance-none pl-7 pr-8 py-1.5 rounded-lg bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 font-medium hover:border-zinc-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {COUNTRY_OPTIONS.map((ct) => (
                <option key={ct} value={ct} className="bg-[#141926]">
                  Country: {ct === "all" ? "All Countries" : ct}
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Toggle Advanced Ranges */}
          <button
            onClick={() => dispatch(toggleAdvancedBuilder())}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isAdvancedBuilderOpen
                ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40"
                : "bg-[#141926] text-zinc-300 border-[#222a3d] hover:border-zinc-600"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Range Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-500 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls: Reset & Save View */}
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={() => dispatch(clearAllFilters())}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => dispatch(openSaveModal())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/20 transition-all"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
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
