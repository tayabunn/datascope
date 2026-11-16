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
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
                  Overview Dashboard
                </h1>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#0b7d55]/15 text-[#0b7d55] border border-[#0b7d55]/30 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b7d55] animate-pulse" />
                  Cluster Operational
                </span>
              </div>
              <p className="text-sm text-[#a1a1aa] mt-1">
                Centralized discovery metrics, cluster telemetry, and high-volume data lake synchronizations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/explorer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg btn-render-primary text-xs font-semibold shadow-md group"
              >
                <Database className="w-3.5 h-3.5 text-[#b193e0]" />
                <span>Launch Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Core KPI Metrics (Render & Mistral Inset Elevation Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-lg render-card space-y-2">
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

            <div className="p-5 rounded-lg render-card space-y-2">
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

            <div className="p-5 rounded-lg mistral-card space-y-2">
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

            <div className="p-5 rounded-lg render-card space-y-2">
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
              className="p-5 rounded-lg render-card space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#6c35f5]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa] group-hover:scale-105 transition-transform">
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
              className="p-5 rounded-lg mistral-card space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ff8204]/15 border border-[#ff8204]/35 flex items-center justify-center text-[#ffa033] group-hover:scale-105 transition-transform">
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
              className="p-5 rounded-lg render-card space-y-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0b7d55]/15 border border-[#0b7d55]/30 flex items-center justify-center text-[#0b7d55] group-hover:scale-105 transition-transform">
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

          {/* Connected Data Lakes & Health Status Table */}
          <div className="rounded-lg render-card p-5 space-y-4">
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
                    <td className="py-3 font-semibold text-[#fafaf4] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                      SAP S/4HANA & Salesforce
                    </td>
                    <td className="py-3 text-[#a1a1aa]">Streaming Batch Pool</td>
                    <td className="py-3 text-[#968dfa]">100,000 Records</td>
                    <td className="py-3 text-[#a1a1aa]">Real-time / Instant</td>
                    <td className="py-3 text-[#0b7d55] font-semibold">Active</td>
                  </tr>
                  <tr className="table-row-hover transition-colors">
                    <td className="py-3 font-semibold text-[#fafaf4] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0b7d55]" />
                      AWS CloudWatch & Datadog
                    </td>
                    <td className="py-3 text-[#a1a1aa]">Telemetry Streamer</td>
                    <td className="py-3 text-[#968dfa]">245,000 Records</td>
                    <td className="py-3 text-[#a1a1aa]">Every 60 seconds</td>
                    <td className="py-3 text-[#0b7d55] font-semibold">Active</td>
                  </tr>
                  <tr className="table-row-hover transition-colors">
                    <td className="py-3 font-semibold text-[#fafaf4] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffa033]" />
                      Bloomberg Order Book & FIX
                    </td>
                    <td className="py-3 text-[#a1a1aa]">FIX Protocol Gateway</td>
                    <td className="py-3 text-[#ffa033]">500,000 Records</td>
                    <td className="py-3 text-[#a1a1aa]">Micro-batch / 500ms</td>
                    <td className="py-3 text-[#ffa033] font-semibold">Standby</td>
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

