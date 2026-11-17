"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToast } from "@/store/slices/toastSlice";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Layers,
  Database,
  Search,
  Zap,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  BarChart3,
  BookmarkCheck,
  Server,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
  Settings,
  RefreshCw,
  Cpu,
  Lock,
  HardDrive,
  AlertTriangle,
  Terminal,
} from "lucide-react";
import OverviewLoading from "./loading";

export default function OverviewDashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = user?.role === "Administrator";

  const [isFlushingCache, setIsFlushingCache] = useState(false);
  const [isVacuuming, setIsVacuuming] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);

  if (!mounted) {
    return <OverviewLoading />;
  }

  const handleFlushCache = () => {
    setIsFlushingCache(true);
    setTimeout(() => {
      setIsFlushingCache(false);
      dispatch(
        addToast({
          type: "success",
          title: "Redis Cache Flushed",
          message: "All 418 in-memory PostgreSQL query caches invalidated.",
        })
      );
    }, 600);
  };

  const handleVacuumAnalyze = () => {
    setIsVacuuming(true);
    setTimeout(() => {
      setIsVacuuming(false);
      dispatch(
        addToast({
          type: "success",
          title: "VACUUM ANALYZE Completed",
          message: "Database storage pages compacted & statistics refreshed.",
        })
      );
    }, 700);
  };

  const handleReindex = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      dispatch(
        addToast({
          type: "success",
          title: "GIN Trigram Reindexed",
          message: "GIN inverted indexes synchronized across 100,000 records.",
        })
      );
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 w-full">
          {/* ========================================================================= */}
          {/* 1. ADMINISTRATOR DASHBOARD VIEW (Root Access & Infrastructure Telemetry)   */}
          {/* ========================================================================= */}
          {isAdmin ? (
            <>
              {/* Header Banner - Administrator Mission Control */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight flex items-center gap-2">
                      <ShieldCheck className="w-7 h-7 text-[#968dfa]" />
                      Administrator Mission Control
                    </h1>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#6c35f5]/20 text-[#b193e0] border border-[#968dfa]/30 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#968dfa] animate-pulse" />
                      Root Authority
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold flex items-center gap-1.5">
                      Cluster Operational
                    </span>
                  </div>
                  <p className="text-sm text-[#a1a1aa] mt-1">
                    Centralized platform governance, database connection pooling, security audit stream, and cluster maintenance.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/settings"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-xs font-semibold shadow-md group"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#b193e0] group-hover:rotate-45 transition-transform" />
                    <span>System Settings</span>
                  </Link>

                  <Link
                    href="/explorer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-secondary text-xs font-semibold shadow-md group"
                  >
                    <Database className="w-3.5 h-3.5 text-[#968dfa]" />
                    <span>Inspect Records</span>
                  </Link>
                </div>
              </div>

              {/* 4 Core Administrator KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>SECURITY & RBAC POSTURE</span>
                    <Lock className="w-4 h-4 text-[#968dfa]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#fafaf4]">
                    Enforced
                  </div>
                  <div className="text-[11px] text-[#0b7d55] flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>3 Roles, 0 Security Anomalies</span>
                  </div>
                </div>

                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>POSTGRES CONNECTION POOL</span>
                    <Cpu className="w-4 h-4 text-[#0b7d55]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#0b7d55]">
                    18 / 20 Active
                  </div>
                  <div className="text-[11px] text-[#a1a1aa] font-mono">
                    PGBouncer 90% Pool Saturation
                  </div>
                </div>

                <div className="p-5 rounded-none mistral-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>QUERY EXECUTION LATENCY</span>
                    <Zap className="w-4 h-4 text-[#ff8204]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#ffa033]">
                    14.2ms P95
                  </div>
                  <div className="text-[11px] text-[#0b7d55] font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>GIN Trigram Indexed</span>
                  </div>
                </div>

                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>CACHE HIT RATIO (REDIS)</span>
                    <HardDrive className="w-4 h-4 text-[#968dfa]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#b193e0]">
                    98.4% Hit
                  </div>
                  <div className="text-[11px] text-[#a1a1aa] font-mono">
                    Sub-2ms In-Memory Serving
                  </div>
                </div>
              </div>

              {/* Administrator Quick Maintenance Command Bar */}
              <div className="p-4 rounded-none render-card space-y-3">
                <div className="flex items-center justify-between border-b border-[#1a2030] pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#968dfa]" />
                    <span className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                      Administrator Quick Operations Console
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a1a1aa]">
                    Execution mode: Direct Cluster Hooks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={handleFlushCache}
                    disabled={isFlushingCache}
                    className="p-3 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] hover:border-[#968dfa]/40 text-left transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                        <RefreshCw className={`w-3.5 h-3.5 text-[#968dfa] ${isFlushingCache ? "animate-spin" : ""}`} />
                        Flush Redis L2 Cache
                      </span>
                      <span className="text-[9px] font-mono text-[#0b7d55] bg-[#0b7d55]/10 px-1 rounded-none">Safe</span>
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Evict in-memory compiled AST queries and force fresh PostgreSQL execution.
                    </p>
                  </button>

                  <button
                    onClick={handleVacuumAnalyze}
                    disabled={isVacuuming}
                    className="p-3 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] hover:border-[#0b7d55]/40 text-left transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                        <Activity className={`w-3.5 h-3.5 text-[#0b7d55] ${isVacuuming ? "animate-spin" : ""}`} />
                        Run VACUUM ANALYZE
                      </span>
                      <span className="text-[9px] font-mono text-[#0b7d55] bg-[#0b7d55]/10 px-1 rounded-none">Optimize</span>
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Reclaim database dead tuples and update PostgreSQL query planner statistics.
                    </p>
                  </button>

                  <button
                    onClick={handleReindex}
                    disabled={isReindexing}
                    className="p-3 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] hover:border-[#ff8204]/40 text-left transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                        <Zap className={`w-3.5 h-3.5 text-[#ff8204] ${isReindexing ? "animate-pulse" : ""}`} />
                        Re-index GIN Trigrams
                      </span>
                      <span className="text-[9px] font-mono text-[#ffa033] bg-[#ff8204]/10 px-1 rounded-none">Sub-20ms</span>
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Synchronize fuzzy text index trees across deal titles and SKU codes.
                    </p>
                  </button>
                </div>
              </div>

              {/* Subsystem Health Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-none bg-[#121622] border border-[#1d2436] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-300">PostgreSQL 16 Primary</span>
                    <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Port: 5432 · TLS 1.3 Active
                  </div>
                  <div className="text-[10px] text-[#0b7d55] font-mono">
                    Latency: 1.2ms (Zero Packet Loss)
                  </div>
                </div>

                <div className="p-4 rounded-none bg-[#121622] border border-[#1d2436] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-300">Redis Query Cache</span>
                    <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Port: 6379 · In-Memory LRU
                  </div>
                  <div className="text-[10px] text-[#0b7d55] font-mono">
                    Hit Ratio: 98.4% (Healthy)
                  </div>
                </div>

                <div className="p-4 rounded-none bg-[#121622] border border-[#1d2436] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-300">Fastify API Gateway</span>
                    <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Port: 5000 · JWT Verified
                  </div>
                  <div className="text-[10px] text-[#0b7d55] font-mono">
                    P95: 14.2ms · 0 Active Alerts
                  </div>
                </div>

                <div className="p-4 rounded-none bg-[#121622] border border-[#1d2436] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-300">Search Inverted Index</span>
                    <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    GIN Trigram 3-Gram Hash
                  </div>
                  <div className="text-[10px] text-[#0b7d55] font-mono">
                    100k Records Synchronized
                  </div>
                </div>
              </div>

              {/* Security & RBAC Audit Stream Table */}
              <div className="rounded-none render-card p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1a2030] pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#968dfa]" />
                    <h2 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                      Live Platform Security & Mutation Audit Trail
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-[#0b7d55]">
                    ● Real-Time Streaming Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-[#a1a1aa] uppercase text-[10px] border-b border-[#1a2030]">
                      <tr>
                        <th className="pb-2.5">Timestamp</th>
                        <th className="pb-2.5">Actor Identity</th>
                        <th className="pb-2.5">Session Role</th>
                        <th className="pb-2.5">Event Type</th>
                        <th className="pb-2.5">Target Resource</th>
                        <th className="pb-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a2030] text-zinc-300">
                      <tr className="table-row-hover transition-colors">
                        <td className="py-2.5 text-zinc-400">Just now</td>
                        <td className="py-2.5 text-[#b193e0] font-semibold">alex.rivera (CDO)</td>
                        <td className="py-2.5 text-zinc-300">Administrator</td>
                        <td className="py-2.5 text-[#ffa033]">ADMIN_OVERVIEW_INSPECT</td>
                        <td className="py-2.5 text-zinc-400">cluster://telemetry</td>
                        <td className="py-2.5 text-[#0b7d55] font-semibold">AUTHORIZED</td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-2.5 text-zinc-400">2m ago</td>
                        <td className="py-2.5 text-zinc-300">sarah.connor</td>
                        <td className="py-2.5 text-zinc-300">Data Analyst</td>
                        <td className="py-2.5 text-[#968dfa]">EXPORT_CSV_DATASET</td>
                        <td className="py-2.5 text-zinc-400">dataset://revenue_contracts</td>
                        <td className="py-2.5 text-[#0b7d55] font-semibold">AUTHORIZED</td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-2.5 text-zinc-400">7m ago</td>
                        <td className="py-2.5 text-zinc-300">system-cron-worker</td>
                        <td className="py-2.5 text-zinc-300">Service Daemon</td>
                        <td className="py-2.5 text-zinc-300">SYNC_DATA_LAKE_02</td>
                        <td className="py-2.5 text-zinc-400">lake://singapore_logistics</td>
                        <td className="py-2.5 text-[#0b7d55] font-semibold">COMPLETED</td>
                      </tr>
                      <tr className="table-row-hover transition-colors">
                        <td className="py-2.5 text-zinc-400">18m ago</td>
                        <td className="py-2.5 text-zinc-400">marcus.vance</td>
                        <td className="py-2.5 text-zinc-400">Viewer</td>
                        <td className="py-2.5 text-rose-400">ATTEMPT_ELEVATION</td>
                        <td className="py-2.5 text-zinc-400">role://administrator</td>
                        <td className="py-2.5 text-rose-400 font-semibold">BLOCKED (DENIED)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* ========================================================================= */
            /* 2. DATA ANALYST & VIEWER DISCOVERY OVERVIEW DASHBOARD                     */
            /* ========================================================================= */
            <>
              {/* Header Banner - Standard Overview */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
                      Data Overview Dashboard
                    </h1>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b7d55] animate-pulse" />
                      Cluster Operational
                    </span>
                  </div>
                  <p className="text-sm text-[#a1a1aa] mt-1">
                    Centralized discovery metrics, query latency benchmarks, and dataset synchronizations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/explorer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-xs font-semibold shadow-md group"
                  >
                    <Database className="w-3.5 h-3.5 text-[#b193e0]" />
                    <span>Launch Data Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* 4 Standard Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>TOTAL INDEXED RECORDS</span>
                    <Database className="w-4 h-4 text-[#968dfa]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#fafaf4]">
                    100,000+
                  </div>
                  <div className="text-[11px] text-[#0b7d55] flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>B-Tree & GIN Trigram Indexed</span>
                  </div>
                </div>

                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>PORTFOLIO REVENUE</span>
                    <TrendingUp className="w-4 h-4 text-[#0b7d55]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#0b7d55]">
                    $18.4M
                  </div>
                  <div className="text-[11px] text-[#a1a1aa] font-mono">
                    Aggregated SQL Summation
                  </div>
                </div>

                <div className="p-5 rounded-none mistral-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>QUERY EXECUTION P95</span>
                    <Zap className="w-4 h-4 text-[#ff8204]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#ffa033]">
                    14.2ms
                  </div>
                  <div className="text-[11px] text-[#0b7d55] font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>99.8% Sub-20ms Response</span>
                  </div>
                </div>

                <div className="p-5 rounded-none render-card space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
                    <span>CONNECTED LAKES</span>
                    <Layers className="w-4 h-4 text-[#968dfa]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#b193e0]">
                    3 Sources
                  </div>
                  <div className="text-[11px] text-[#a1a1aa] font-mono">
                    Active Replication & Ingestion
                  </div>
                </div>
              </div>

              {/* Quick Module Launchpad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/explorer"
                  className="p-5 rounded-none render-card space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-none bg-[#6c35f5]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa] group-hover:scale-105 transition-transform">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#fafaf4] group-hover:text-[#b193e0] transition-colors">
                      Data Explorer (Primary Focus)
                    </h3>
                    <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
                      Sort, filter, search, and navigate across 100k records with dynamic column visibility and drawer inspection.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/search"
                  className="p-5 rounded-none mistral-card space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-none bg-[#ff8204]/15 border border-[#ff8204]/35 flex items-center justify-center text-[#ffa033] group-hover:scale-105 transition-transform">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#fafaf4] group-hover:text-[#ffa033] transition-colors">
                      Advanced Query Builder
                    </h3>
                    <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
                      Construct multi-predicate SQL filters and preview live PostgreSQL execution query ASTs.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/analytics"
                  className="p-5 rounded-none render-card space-y-3 group"
                >
                  <div className="w-9 h-9 rounded-none bg-[#0b7d55]/15 border border-[#0b7d55]/30 flex items-center justify-center text-[#0b7d55] group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#fafaf4] group-hover:text-[#968dfa] transition-colors">
                      Portfolio Analytics
                    </h3>
                    <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
                      Interactive Recharts visualizations covering sector revenue, status ratios, and monthly trends.
                    </p>
                  </div>
                </Link>
              </div>
            </>
          )}

          {/* Connected Data Lakes & Health Status Table (Visible to All) */}
          <div className="rounded-none render-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a2030] pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#968dfa]" />
                <h2 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                  Enterprise Data Lake Ingestion Feeds
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#a1a1aa]">
                Pool Size: 20 Max Connections
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[#a1a1aa] uppercase text-[10px] border-b border-[#1a2030]">
                  <tr>
                    <th className="pb-2.5">Lake Source</th>
                    <th className="pb-2.5">Ingestion Method</th>
                    <th className="pb-2.5">Record Volume</th>
                    <th className="pb-2.5">Sync Frequency</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2030] text-zinc-300">
                  <tr className="table-row-hover transition-colors">
                    <td className="py-2.5 text-[#fafaf4] font-medium">US East Primary Warehouse</td>
                    <td className="py-2.5 text-[#a1a1aa]">CDC Streaming (WAL)</td>
                    <td className="py-2.5 text-[#0b7d55] font-semibold">100,000 Rows</td>
                    <td className="py-2.5 text-zinc-400">Sub-10s Micro-batch</td>
                    <td className="py-2.5">
                      <span className="text-[10px] text-[#0b7d55] bg-[#0b7d55]/15 border border-[#0b7d55]/30 px-2 py-0.5 rounded font-semibold">
                        Operational
                      </span>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors">
                    <td className="py-2.5 text-[#fafaf4] font-medium">EU Frankfurt Analytics Lake</td>
                    <td className="py-2.5 text-[#a1a1aa]">PostgreSQL FDW Replicate</td>
                    <td className="py-2.5 text-[#b193e0]">38,420 Rows</td>
                    <td className="py-2.5 text-zinc-400">Hourly Delta</td>
                    <td className="py-2.5">
                      <span className="text-[10px] text-[#0b7d55] bg-[#0b7d55]/15 border border-[#0b7d55]/30 px-2 py-0.5 rounded font-semibold">
                        Synced
                      </span>
                    </td>
                  </tr>
                  <tr className="table-row-hover transition-colors">
                    <td className="py-2.5 text-[#fafaf4] font-medium">APAC Tokyo Event Gateway</td>
                    <td className="py-2.5 text-[#a1a1aa]">Kafka Realtime Ingest</td>
                    <td className="py-2.5 text-[#ffa033]">12,190 Rows</td>
                    <td className="py-2.5 text-zinc-400">Continuous</td>
                    <td className="py-2.5">
                      <span className="text-[10px] text-[#0b7d55] bg-[#0b7d55]/15 border border-[#0b7d55]/30 px-2 py-0.5 rounded font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
