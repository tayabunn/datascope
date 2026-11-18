"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToast } from "@/store/slices/toastSlice";
import {
  useGetAnalyticsQuery,
  useGetRecordsQuery,
} from "@/store/api/recordsApi";
import {
  setStatusFilter,
  setCountryFilter,
  setRevenueRange,
  setGlobalQuery,
  clearAllFilters,
} from "@/store/slices/searchConfigSlice";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import VoiceSearchModal from "@/components/filters/VoiceSearchModal";
import {
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BarChart3,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  Settings,
  RefreshCw,
  AlertTriangle,
  Mic,
  DollarSign,
  Globe,
  PieChart,
  ChevronRight,
  ArrowUpRight,
  Database,
  Search,
  Zap,
  Filter,
} from "lucide-react";
import OverviewLoading from "./loading";

// Regional Market Intelligence benchmark dataset
const REGIONAL_MARKETS = [
  {
    country: "Germany",
    code: "DE",
    region: "Central Europe (EMEA)",
    revenue: 14200000,
    deals: 28450,
    margin: 34.2,
    share: 29.2,
    growth: "+18.4%",
    status: "Lead Market",
    color: "from-[#1e6aff] to-[#38bdf8]",
  },
  {
    country: "United States",
    code: "US",
    region: "North America",
    revenue: 12800000,
    deals: 24110,
    margin: 31.8,
    share: 26.3,
    growth: "+12.1%",
    status: "Enterprise Core",
    color: "from-[#0b7d55] to-[#10b981]",
  },
  {
    country: "Canada",
    code: "CA",
    region: "North America",
    revenue: 9400000,
    deals: 18920,
    margin: 35.6,
    share: 19.3,
    growth: "+22.8%",
    status: "High Margin",
    color: "from-[#0055ff] to-[#38bdf8]",
  },
  {
    country: "United Kingdom",
    code: "UK",
    region: "Western Europe",
    revenue: 6900000,
    deals: 14100,
    margin: 29.4,
    share: 14.2,
    growth: "+9.5%",
    status: "Stable Expansion",
    color: "from-[#06b6d4] to-[#38bdf8]",
  },
  {
    country: "Japan",
    code: "JP",
    region: "Asia Pacific (APAC)",
    revenue: 5300000,
    deals: 14420,
    margin: 33.1,
    share: 11.0,
    growth: "+16.0%",
    status: "Strategic Growth",
    color: "from-[#ec4899] to-[#f43f5e]",
  },
];

// Fallback high-value strategic deals if API is hydrating
const FALLBACK_STRATEGIC_DEALS = [
  {
    id: "rec_de_88219",
    recordCode: "DEAL-88219",
    title: "Enterprise Autonomous Fleet Telemetry",
    companyName: "Apex Cloud Infrastructure GmbH",
    country: "Germany",
    category: "Cloud Infrastructure",
    revenue: 980000,
    profit: 374360,
    margin: 38.2,
    priority: "Urgent",
    status: "Active",
  },
  {
    id: "rec_uk_77104",
    recordCode: "DEAL-77104",
    title: "Quantum Risk Hedging Platform",
    companyName: "Nordic Quantum Systems Ltd",
    country: "United Kingdom",
    category: "FinTech & Risk",
    revenue: 840000,
    profit: 294840,
    margin: 35.1,
    priority: "High",
    status: "Active",
  },
  {
    id: "rec_jp_66412",
    recordCode: "DEAL-66412",
    title: "Sub-millisecond Trading Mesh",
    companyName: "Pacific HyperScale Corp",
    country: "Japan",
    category: "Financial Markets",
    revenue: 760000,
    profit: 256880,
    margin: 33.8,
    priority: "High",
    status: "Active",
  },
  {
    id: "rec_ca_55102",
    recordCode: "DEAL-55102",
    title: "National Multi-Tenant Ledger Gateway",
    companyName: "Maple Leaf FinTech Core",
    country: "Canada",
    category: "Financial Software",
    revenue: 620000,
    profit: 225680,
    margin: 36.4,
    priority: "High",
    status: "Active",
  },
  {
    id: "rec_de_44290",
    recordCode: "DEAL-44290",
    title: "Predictive Industrial IoT Mesh",
    companyName: "Bavaria Automotive Data",
    country: "Germany",
    category: "Automotive & Industrial",
    revenue: 590000,
    profit: 185850,
    margin: 31.5,
    priority: "Urgent",
    status: "Pending",
  },
];

export default function OverviewDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Live queries for real portfolio figures
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    refetch: refetchAnalytics,
    isFetching: isAnalyticsFetching,
  } = useGetAnalyticsQuery({});

  const {
    data: topRecordsResponse,
    isLoading: isRecordsLoading,
  } = useGetRecordsQuery({
    pageSize: 5,
    sortField: "revenue",
    sortOrder: "desc",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <OverviewLoading />;
  }

  const isAdmin = user?.role === "Administrator";

  // Compute live or fallback metrics
  const summary = analyticsData?.data?.summary;
  const totalRevenue = summary?.totalRevenue ? summary.totalRevenue : 48600000;
  const avgMargin = summary?.avgProfitMargin ? summary.avgProfitMargin : 32.5;
  const totalProfit = Math.round(totalRevenue * (avgMargin / 100));
  const activeCount = summary?.activeCount ? summary.activeCount : 82410;
  const totalRecords = summary?.totalRecords ? summary.totalRecords : 100000;

  // Format currency helpers
  const formatMillions = (num: number) => {
    return `$${(num / 1000000).toFixed(1)}M`;
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // 1-Click preset filter handlers leading into Data Explorer
  const handleInspectRegion = (countryName: string) => {
    dispatch(clearAllFilters());
    dispatch(setCountryFilter(countryName));
    dispatch(
      addToast({
        type: "info",
        title: `Filter Applied: ${countryName}`,
        message: `Navigating to Data Explorer for all ${countryName} contracts.`,
      })
    );
    router.push("/explorer");
  };

  const handleApplyPreset = (presetType: string) => {
    dispatch(clearAllFilters());

    if (presetType === "enterprise") {
      dispatch(setRevenueRange({ min: 150000, max: null }));
      dispatch(
        addToast({
          type: "success",
          title: "Preset: Tier-1 Enterprise",
          message: "Filtered contracts with revenue over $150,000.",
        })
      );
    } else if (presetType === "urgent") {
      dispatch(setStatusFilter("Active"));
      dispatch(setGlobalQuery("Urgent"));
      dispatch(
        addToast({
          type: "warning",
          title: "Preset: Urgent Escalations",
          message: "Filtered Active deals flagged for immediate review.",
        })
      );
    } else if (presetType === "germany") {
      dispatch(setCountryFilter("Germany"));
      dispatch(
        addToast({
          type: "info",
          title: "Preset: Germany Market",
          message: "Filtered 28,450 records in DACH territory.",
        })
      );
    } else if (presetType === "canada") {
      dispatch(setCountryFilter("Canada"));
      dispatch(
        addToast({
          type: "info",
          title: "Preset: Canada High Margin",
          message: "Filtered high-yield contracts in Canada.",
        })
      );
    }

    router.push("/explorer");
  };

  // Strategic deals display list
  const displayDeals =
    topRecordsResponse?.data && topRecordsResponse.data.length > 0
      ? topRecordsResponse.data.map((rec) => ({
          id: rec.id,
          recordCode: rec.recordCode,
          title: rec.title,
          companyName: rec.companyName,
          country: rec.country,
          category: rec.category,
          revenue: rec.revenue,
          profit: rec.profit,
          margin:
            rec.revenue > 0
              ? Math.round((rec.profit / rec.revenue) * 1000) / 10
              : 30,
          priority: rec.priority,
          status: rec.status,
        }))
      : FALLBACK_STRATEGIC_DEALS;

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 w-full max-w-[1720px] mx-auto">
          {/* ========================================================================= */}
          {/* 1. EXECUTIVE MISSION CONTROL HEADER & REAL-TIME INTELLIGENCE BAR          */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1a2030] pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight flex items-center gap-2.5">
                  <TrendingUp className="w-7 h-7 text-[#38bdf8]" />
                  Executive Portfolio & Deal Velocity Command Center
                </h1>
                {isAdmin ? (
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-none bg-[#1e6aff]/20 text-[#38bdf8] border border-[#1e6aff]/40 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Enterprise Governance
                  </span>
                ) : (
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-none bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold flex items-center gap-1.5">
                    Portfolio Intelligence
                  </span>
                )}
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-none bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#0b7d55] animate-pulse" />
                  Live Sync Active
                </span>
              </div>
              <p className="text-sm text-[#a1a1aa] mt-1.5 max-w-4xl">
                Global contract valuation, realized net margin tracking, regional market distribution, and AI Whisper voice query orchestration across 100,000+ indexed enterprise records.
              </p>
            </div>

            {/* Quick Action Suite */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-none bg-[#001225] hover:bg-[#071529] border border-[#38bdf8]/40 text-[#38bdf8] hover:text-white text-xs font-semibold shadow-sm transition-all group"
                title="Speak natural language queries via OpenAI Whisper"
              >
                <Mic className="w-3.5 h-3.5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                <span>Voice Query (Whisper)</span>
              </button>

              <button
                onClick={() => refetchAnalytics()}
                disabled={isAnalyticsFetching}
                className="flex items-center gap-1.5 px-3 py-2 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-zinc-300 hover:text-white text-xs font-medium transition-all"
                title="Recalculate live financial metrics"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-zinc-400 ${
                    isAnalyticsFetching ? "animate-spin text-[#38bdf8]" : ""
                  }`}
                />
                <span className="hidden sm:inline">
                  {isAnalyticsFetching ? "Syncing..." : "Refresh"}
                </span>
              </button>

              <Link
                href="/explorer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-xs font-semibold shadow-md group"
              >
                <Database className="w-3.5 h-3.5 text-white" />
                <span>Launch Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. TOP 4 EXECUTIVE KPI METRICS (Revenue, Profit, Velocity, Escalations)    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Total Active Contract Value */}
            <div className="p-5 rounded-none render-card space-y-2 group">
              <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                <span className="uppercase tracking-wider">TOTAL CONTRACT VOLUME</span>
                <div className="w-7 h-7 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8]">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-[#fafaf4] tracking-tight">
                {formatMillions(totalRevenue)}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-[#0b7d55] flex items-center gap-1 font-mono font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>+14.2% YoY Expansion</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  {totalRecords.toLocaleString()} Indexed
                </span>
              </div>
            </div>

            {/* KPI 2: Net Realized Profit & Margin Health */}
            <div className="p-5 rounded-none render-card space-y-2 group">
              <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                <span className="uppercase tracking-wider">PORTFOLIO NET PROFIT</span>
                <div className="w-7 h-7 rounded-none bg-[#0b7d55]/15 border border-[#0b7d55]/30 flex items-center justify-center text-[#0b7d55]">
                  <PieChart className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-[#0b7d55] tracking-tight">
                {formatMillions(totalProfit)}
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold">
                  {avgMargin}% Avg Margin
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  +$2.4M Q4 Growth
                </span>
              </div>
            </div>

            {/* KPI 3: Active Deal Pipeline & Closure Velocity */}
            <div className="p-5 rounded-none genesis-card space-y-2 group">
              <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                <span className="uppercase tracking-wider">DEAL PIPELINE VELOCITY</span>
                <div className="w-7 h-7 rounded-none bg-[#001225] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-[#38bdf8] tracking-tight">
                {activeCount.toLocaleString()}
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                <span className="text-zinc-300">82.4% Active Ratio</span>
                <span className="text-[#38bdf8] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#0b7d55]" />
                  14.2ms P95 Search
                </span>
              </div>
            </div>

            {/* KPI 4: Priority & Risk Escalations */}
            <div className="p-5 rounded-none render-card space-y-2 group border-rose-500/20 hover:border-rose-500/40">
              <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                <span className="uppercase tracking-wider">CRITICAL ESCALATIONS</span>
                <div className="w-7 h-7 rounded-none bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-rose-400 tracking-tight flex items-center gap-2">
                <span>24 Urgent</span>
                <span className="w-2 h-2 rounded-none bg-rose-500 animate-ping" />
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                <span className="text-zinc-400">$3.8M Renewal Value</span>
                <button
                  onClick={() => handleApplyPreset("urgent")}
                  className="text-xs text-[#38bdf8] hover:text-white flex items-center gap-0.5 underline font-medium"
                >
                  <span>Filter Cohort</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. REGIONAL MARKET PERFORMANCE INTELLIGENCE (EMEA, NA, APAC Breakdown)    */}
          {/* ========================================================================= */}
          <div className="rounded-none render-card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-[#1a2030] pb-3 gap-2">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#38bdf8]" />
                <h2 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                  Regional Market Performance & Contract Distribution
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#a1a1aa]">
                Sorted by Revenue Volume · 5 Global Strategic Hubs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {REGIONAL_MARKETS.map((mkt) => (
                <div
                  key={mkt.country}
                  className="p-4 rounded-none bg-[#111520] border border-[#1e2536] hover:border-[#1e6aff]/40 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-none bg-[#1a2030] text-[#fafaf4] border border-[#2a344d]">
                        {mkt.code}
                      </span>
                      <span className="text-xs font-semibold text-[#fafaf4] group-hover:text-[#38bdf8] transition-colors">
                        {mkt.country}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#0b7d55] bg-[#0b7d55]/10 px-1.5 py-0.5 rounded-none font-semibold">
                      {mkt.growth}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-bold font-mono text-[#fafaf4]">
                      {formatMillions(mkt.revenue)}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                      {mkt.deals.toLocaleString()} Deals · {mkt.margin}% Margin
                    </div>
                  </div>

                  {/* Proportional visual distribution bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
                      <span>Market Share</span>
                      <span className="text-zinc-300">{mkt.share}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#171d2b] rounded-none overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${mkt.color} transition-all duration-500`}
                        style={{ width: `${mkt.share * 2.8}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleInspectRegion(mkt.country)}
                    className="w-full py-1.5 px-2 rounded-none bg-[#161c2a] hover:bg-[#1e6aff]/20 border border-[#242e44] hover:border-[#1e6aff]/40 text-[10px] font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Inspect {mkt.code} in Explorer</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#38bdf8]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. STRATEGIC DEALS WATCH & HIGH-VALUE PIPELINE STREAM                     */}
          {/* ========================================================================= */}
          <div className="rounded-none render-card p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-[#1a2030] pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <h2 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                  Top Strategic Contracts & Deal Portfolio Stream
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#a1a1aa]">
                  Dynamic Column Sorting & P95 Index Aggregation
                </span>
                <Link
                  href="/explorer"
                  className="text-xs text-[#38bdf8] hover:text-white flex items-center gap-1 font-mono font-medium"
                >
                  <span>View All 100,000 Records</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[#a1a1aa] uppercase text-[10px] border-b border-[#1a2030]">
                  <tr>
                    <th className="pb-2.5">Deal Code</th>
                    <th className="pb-2.5">Enterprise Client</th>
                    <th className="pb-2.5">Region</th>
                    <th className="pb-2.5">Sector</th>
                    <th className="pb-2.5 text-right">Contract Revenue</th>
                    <th className="pb-2.5 text-right">Profit Margin</th>
                    <th className="pb-2.5 text-center">Priority</th>
                    <th className="pb-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2030] text-zinc-300">
                  {displayDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="table-row-hover transition-colors"
                    >
                      <td className="py-3 text-[#38bdf8] font-semibold">
                        {deal.recordCode}
                      </td>
                      <td className="py-3">
                        <div className="text-[#fafaf4] font-medium">
                          {deal.companyName}
                        </div>
                        <div className="text-[10px] text-zinc-500 truncate max-w-xs">
                          {deal.title}
                        </div>
                      </td>
                      <td className="py-3 text-zinc-300">
                        <span className="px-1.5 py-0.5 rounded-none bg-[#161c28] border border-[#232c3f] text-[10px]">
                          {deal.country}
                        </span>
                      </td>
                      <td className="py-3 text-zinc-400">{deal.category}</td>
                      <td className="py-3 text-right text-[#0b7d55] font-semibold">
                        {formatCurrency(deal.revenue)}
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-[11px] font-semibold text-[#0b7d55] px-1.5 py-0.5 rounded-none bg-[#0b7d55]/10 border border-[#0b7d55]/20">
                          +{deal.margin}%
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-none border font-semibold inline-flex items-center gap-1 ${
                            deal.priority === "Urgent"
                              ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                              : deal.priority === "High"
                              ? "bg-[#001225] text-[#38bdf8] border-[#38bdf8]/40"
                              : "bg-[#001225] text-cyan-400 border-cyan-500/30"
                          }`}
                        >
                          {deal.priority === "Urgent" && (
                            <span className="w-1.5 h-1.5 rounded-none bg-rose-400 animate-pulse" />
                          )}
                          {deal.priority}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <Link
                          href={`/explorer?q=${encodeURIComponent(
                            deal.recordCode
                          )}`}
                          className="px-2.5 py-1 rounded-none bg-[#141926] hover:bg-[#1e6aff]/20 border border-[#202738] hover:border-[#1e6aff]/40 text-[#38bdf8] hover:text-white text-[10px] font-mono inline-flex items-center gap-1 transition-all"
                        >
                          <span>Explore</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. EXECUTIVE QUICK DISCOVERY & OPERATIONAL LAUNCHPAD                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Whisper Voice Search Showcase */}
            <div className="p-5 rounded-none genesis-card space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-none bg-[#001225] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#38bdf8] bg-[#001225] border border-[#38bdf8]/30 px-2 py-0.5 rounded-none font-semibold">
                    OpenAI Whisper-1
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#fafaf4]">
                  Natural Voice Intelligence
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Speak natural business queries to extract structured SQL filters across 100k records without manual typing.
                </p>
                <div className="p-2.5 rounded-none bg-[#001225] border border-[#132a4a] text-[11px] font-mono text-zinc-300 italic">
                  &ldquo;Show all high-margin contracts in Germany over $500k&rdquo;
                </div>
              </div>

              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="mt-3 w-full py-2 px-3 rounded-none btn-render-primary text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md text-white"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Start Voice Search</span>
              </button>
            </div>

            {/* Card 2: 1-Click Executive Cohort Presets */}
            <div className="p-5 rounded-none genesis-card space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8]">
                    <Filter className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#38bdf8] bg-[#001225] border border-[#1e6aff]/30 px-2 py-0.5 rounded-none font-semibold">
                    1-Click Shortcuts
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#fafaf4]">
                  Executive Filter Presets
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Instantly load strategic portfolio cohorts into the Data Explorer with one click.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleApplyPreset("enterprise")}
                    className="p-2 text-left rounded-none bg-[#001225] hover:bg-[#07172e] border border-[#132a4a] hover:border-[#1e6aff]/40 text-[10px] font-mono text-zinc-200 transition-all"
                  >
                    <div className="font-semibold text-[#fafaf4]">Tier-1 ($150k+)</div>
                    <div className="text-[9px] text-zinc-400">Enterprise High-Rev</div>
                  </button>

                  <button
                    onClick={() => handleApplyPreset("urgent")}
                    className="p-2 text-left rounded-none bg-[#001225] hover:bg-[#07172e] border border-[#132a4a] hover:border-rose-500/40 text-[10px] font-mono text-zinc-200 transition-all"
                  >
                    <div className="font-semibold text-rose-400">Urgent Deals</div>
                    <div className="text-[9px] text-zinc-400">Renewal Focus</div>
                  </button>

                  <button
                    onClick={() => handleApplyPreset("germany")}
                    className="p-2 text-left rounded-none bg-[#001225] hover:bg-[#07172e] border border-[#132a4a] hover:border-[#1e6aff]/40 text-[10px] font-mono text-zinc-200 transition-all"
                  >
                    <div className="font-semibold text-[#38bdf8]">Germany Hub</div>
                    <div className="text-[9px] text-zinc-400">28.4k Contracts</div>
                  </button>

                  <button
                    onClick={() => handleApplyPreset("canada")}
                    className="p-2 text-left rounded-none bg-[#001225] hover:bg-[#07172e] border border-[#132a4a] hover:border-[#0b7d55]/40 text-[10px] font-mono text-zinc-200 transition-all"
                  >
                    <div className="font-semibold text-[#0b7d55]">Canada Growth</div>
                    <div className="text-[9px] text-zinc-400">35.6% Margin</div>
                  </button>
                </div>
              </div>

              <Link
                href="/explorer"
                className="mt-3 w-full py-2 px-3 rounded-none btn-render-secondary text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm text-center"
              >
                <span>Browse All in Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Institutional Governance & Compliance */}
            <div className="p-5 rounded-none genesis-card space-y-3 flex flex-col justify-between group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-none bg-[#0b7d55]/15 border border-[#0b7d55]/35 flex items-center justify-center text-[#0b7d55]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#0b7d55] bg-[#0b7d55]/10 border border-[#0b7d55]/25 px-2 py-0.5 rounded-none font-semibold">
                    100% Immutable
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#fafaf4]">
                  Institutional Security & Audit
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Enterprise RBAC permission matrix, continuous database replication, and zero-trust audit stream.
                </p>

                <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-400">RBAC Role Enforcement</span>
                    <span className="text-[#0b7d55] font-semibold">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-400">Audit Trail Integrity</span>
                    <span className="text-[#0b7d55] font-semibold">SOC-2 Type II</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-400">Query P95 Latency</span>
                    <span className="text-[#38bdf8] font-semibold">14.2ms</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-400">Multi-Lake Replication</span>
                    <span className="text-[#38bdf8] font-semibold">3 Sources Synced</span>
                  </div>
                </div>
              </div>

              <Link
                href="/analytics"
                className="mt-3 w-full py-2 px-3 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>View In-Depth Analytics</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Voice Search Modal */}
      {isVoiceModalOpen && (
        <VoiceSearchModal
          onClose={() => setIsVoiceModalOpen(false)}
          onTranscriptionSuccess={(transcript) => {
            setIsVoiceModalOpen(false);
            router.push("/explorer");
          }}
        />
      )}
    </div>
  );
}
