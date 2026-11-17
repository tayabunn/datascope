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
  Sparkles,
} from "lucide-react";

interface BusinessPreset {
  id: string;
  label: string;
  icon: string;
  description: string;
  filters: {
    status?: string;
    category?: string;
    country?: string;
    minRevenue?: number | null;
    maxRevenue?: number | null;
  };
}

const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: "tier1-enterprise",
    label: "Tier-1 Enterprise ($500k+)",
    icon: "🌟",
    description: "Enterprise tier contracts with minimum revenue $500,000",
    filters: { category: "Enterprise", minRevenue: 500000, maxRevenue: null },
  },
  {
    id: "active-high-value",
    label: "Active High-Value ($100k+)",
    icon: "⚡",
    description: "Active contracts generating over $100,000",
    filters: { status: "Active", minRevenue: 100000, maxRevenue: null },
  },
  {
    id: "pending-review",
    label: "Pending Review",
    icon: "⏳",
    description: "Pipeline deals pending legal or stakeholder review",
    filters: { status: "Pending" },
  },
  {
    id: "na-canada",
    label: "North America (Canada)",
    icon: "🍁",
    description: "Canadian market accounts and contracts",
    filters: { country: "Canada" },
  },
  {
    id: "emea-germany",
    label: "EMEA (Germany)",
    icon: "🇩🇪",
    description: "German market enterprise operations",
    filters: { country: "Germany" },
  },
];

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

  const isPresetActive = (p: BusinessPreset) => {
    if (p.filters.status && statusFilter !== p.filters.status) return false;
    if (p.filters.category && categoryFilter !== p.filters.category) return false;
    if (p.filters.country && countryFilter !== p.filters.country) return false;
    if (p.filters.minRevenue !== undefined && minRevenue !== p.filters.minRevenue) return false;
    if (p.filters.maxRevenue !== undefined && maxRevenue !== p.filters.maxRevenue) return false;
    return true;
  };

  const handleApplyPreset = (preset: BusinessPreset) => {
    if (isPresetActive(preset)) {
      dispatch(clearAllFilters());
      dispatch(
        addToast({
          type: "info",
          title: "Preset Cleared",
          message: "Filters have been reset to default.",
        })
      );
      return;
    }

    if (preset.filters.status !== undefined) {
      dispatch(setStatusFilter(preset.filters.status));
    }
    if (preset.filters.category !== undefined) {
      dispatch(setCategoryFilter(preset.filters.category));
    }
    if (preset.filters.country !== undefined) {
      dispatch(setCountryFilter(preset.filters.country));
    }
    if (preset.filters.minRevenue !== undefined || preset.filters.maxRevenue !== undefined) {
      dispatch(
        setRevenueRange({
          min: preset.filters.minRevenue ?? null,
          max: preset.filters.maxRevenue ?? null,
        })
      );
    }

    dispatch(
      addToast({
        type: "success",
        title: `Preset Applied: ${preset.label}`,
        message: preset.description,
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
    <div className="render-card rounded-none p-5 space-y-4 shadow-md">
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
              className="appearance-none pl-9 pr-9 py-2 rounded-none bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
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
              className="appearance-none pl-9 pr-9 py-2 rounded-none bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
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
              className="appearance-none pl-9 pr-9 py-2 rounded-none bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-zinc-500 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
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
            className={`flex items-center gap-2 px-4 py-2 rounded-none text-xs font-semibold border transition-all shadow-sm ${
              isAdvancedBuilderOpen
                ? "bg-[#6c35f5]/20 text-[#b193e0] border-[#968dfa]/40"
                : "btn-render-secondary"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#968dfa]" />
            <span>Range Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-none bg-[#6c35f5] text-white font-mono text-[10px] flex items-center justify-center font-bold">
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
                className="appearance-none pl-9 pr-9 py-2 rounded-none bg-[#141926] hover:bg-[#182032] border border-[#202738] text-xs text-[#fafaf4] font-semibold hover:border-[#968dfa]/50 focus:outline-none focus:border-[#968dfa] cursor-pointer shadow-sm transition-all"
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-none btn-render-secondary text-xs font-semibold shadow-sm"
            title="View recent search query history"
          >
            <History className="w-4 h-4 text-[#968dfa]" />
            <span className="hidden sm:inline">History</span>
          </Link>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => dispatch(clearAllFilters())}
              className="flex items-center gap-1.5 px-3 py-2 rounded-none text-xs font-medium text-[#a1a1aa] hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => dispatch(openSaveModal())}
            className="flex items-center gap-2 px-4 py-2 rounded-none btn-render-primary text-xs font-semibold shadow-md"
          >
            <BookmarkPlus className="w-4 h-4 text-[#b193e0]" />
            <span>Save View</span>
          </button>
        </div>
      </div>

      {/* 1-Click Business Preset Chips */}
      <div className="pt-3 border-t border-[#1b2234] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5 mr-1 select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#ffa033]" />
            <span>Quick Presets:</span>
          </span>
          {BUSINESS_PRESETS.map((preset) => {
            const isActive = isPresetActive(preset);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                title={preset.description}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all border rounded-none shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-[#6c35f5]/25 text-[#fafaf4] border-[#968dfa] shadow-[0_0_12px_rgba(108,53,245,0.25)] font-semibold"
                    : "bg-[#141926] hover:bg-[#182032] text-zinc-300 hover:text-white border-[#202738] hover:border-zinc-500"
                }`}
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
                {isActive && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-none bg-[#968dfa]" />
                )}
              </button>
            );
          })}
        </div>

        {BUSINESS_PRESETS.some((p) => isPresetActive(p)) && (
          <button
            type="button"
            onClick={() => dispatch(clearAllFilters())}
            className="text-[11px] font-mono text-zinc-400 hover:text-rose-400 underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear Preset
          </button>
        )}
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
                className="w-full px-3 py-1.5 rounded-none bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
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
                className="w-full px-3 py-1.5 rounded-none bg-[#141926] border border-[#222a3d] text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
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
                  className="px-2.5 py-1 rounded-none bg-[#161c2b] border border-[#222b40] text-[11px] font-mono text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-all"
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

