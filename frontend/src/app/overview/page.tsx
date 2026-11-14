"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function OverviewDashboardPage() {
  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Overview Dashboard
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Cluster Operational
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Centralized discovery metrics, cluster telemetry, and high-volume data lake synchronizations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/explorer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all group"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Launch Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Core KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>TOTAL INDEXED RECORDS</span>
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                100,000+
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>B-Tree & GIN Trigram Indexed</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>PORTFOLIO REVENUE</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                $18.4M
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                Aggregated SQL Summation
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>QUERY EXECUTION P95</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-300">
                14.2ms
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">
                99.8% Sub-20ms Response
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>CONNECTED LAKES</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-indigo-300">
                3 Sources
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                Active Replication & Ingestion
              </div>
            </div>
          </div>

          {/* Quick Module Launchpad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/explorer"
              className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  Data Explorer (Primary Focus)
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Sort, filter, search, and navigate across 100k records with dynamic column visibility and drawer inspection.
                </p>
              </div>
            </Link>

            <Link
              href="/search"
              className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Advanced Query Builder
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Construct multi-predicate SQL filters and preview live PostgreSQL execution query ASTs.
                </p>
              </div>
            </Link>

            <Link
              href="/analytics"
              className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Portfolio Analytics
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Interactive Recharts visualizations covering sector revenue, status ratios, and monthly trends.
                </p>
              </div>
            </Link>
          </div>

          {/* Connected Data Lakes & Health Status Table */}
          <div className="rounded-xl bg-[#0f131f] border border-[#1d2538] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2234] pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                <h2 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                  Enterprise Data Lake Ingestion Feeds
                </h2>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Pool Size: 20 Max Connections
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                  <tr>
                    <th className="pb-2.5">Lake Source</th>
                    <th className="pb-2.5">Ingestion Method</th>
                    <th className="pb-2.5">Record Volume</th>
                    <th className="pb-2.5">Sync Frequency</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  <tr>
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      SAP S/4HANA & Salesforce
                    </td>
                    <td className="py-3 text-zinc-400">Streaming Batch Pool</td>
                    <td className="py-3 text-cyan-400">100,000 Records</td>
                    <td className="py-3 text-zinc-400">Real-time / Instant</td>
                    <td className="py-3 text-emerald-400 font-semibold">Active</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      AWS CloudWatch & Datadog
                    </td>
                    <td className="py-3 text-zinc-400">Telemetry Streamer</td>
                    <td className="py-3 text-cyan-400">245,000 Records</td>
                    <td className="py-3 text-zinc-400">Every 60 seconds</td>
                    <td className="py-3 text-emerald-400 font-semibold">Active</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Bloomberg Order Book & FIX
                    </td>
                    <td className="py-3 text-zinc-400">FIX Protocol Gateway</td>
                    <td className="py-3 text-cyan-400">500,000 Records</td>
                    <td className="py-3 text-zinc-400">Micro-batch / 500ms</td>
                    <td className="py-3 text-cyan-400 font-semibold">Standby</td>
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

