"use client";

import React from "react";
import { RecordItem } from "@/store/api/recordsApi";
import {
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface ExplorerSummaryBarProps {
  records: RecordItem[];
  totalCount: number;
  isLoading?: boolean;
}

export default function ExplorerSummaryBar({
  records,
  totalCount,
  isLoading = false,
}: ExplorerSummaryBarProps) {
  // Aggregate page-level metrics
  const totalPageRevenue = records.reduce((acc, r) => acc + (r.revenue || 0), 0);
  const totalPageProfit = records.reduce((acc, r) => acc + (r.profit || 0), 0);
  const avgProfitMargin =
    totalPageRevenue > 0
      ? ((totalPageProfit / totalPageRevenue) * 100).toFixed(1)
      : "0.0";

  const activeCount = records.filter((r) => r.status === "Active").length;
  const pendingCount = records.filter((r) => r.status === "Pending").length;
  const urgentCount = records.filter((r) => r.priority === "Urgent").length;
  const highCount = records.filter((r) => r.priority === "High").length;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-3.5 rounded-none bg-[#0c0f18] border border-[#1a2030] space-y-2 animate-pulse"
          >
            <div className="h-3 w-24 bg-[#141926]" />
            <div className="h-6 w-32 bg-[#141926]" />
            <div className="h-2 w-20 bg-[#141926]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. Page Revenue Volume */}
      <div className="p-3.5 rounded-none render-card space-y-1">
        <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-indigo-400" />
            <span>Revenue in View</span>
          </span>
          <span className="text-zinc-500">{records.length} records</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-[#fafaf4]">
          ${totalPageRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <div className="text-[10px] text-zinc-400 font-mono">
          Avg: $
          {records.length > 0
            ? Math.round(totalPageRevenue / records.length).toLocaleString()
            : 0}
          /deal
        </div>
      </div>

      {/* 2. Net Profit & Margin % */}
      <div className="p-3.5 rounded-none render-card space-y-1">
        <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Net Profit (Margin)</span>
          </span>
          <span className="text-emerald-400 font-semibold">{avgProfitMargin}%</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
          ${totalPageProfit.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <div className="text-[10px] text-zinc-400 font-mono">
          Portfolio margin rate: {avgProfitMargin}%
        </div>
      </div>

      {/* 3. Operational Ratio (Active vs Pending) */}
      <div className="p-3.5 rounded-none render-card space-y-1">
        <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#968dfa]" />
            <span>Active vs Pending</span>
          </span>
          <span className="text-indigo-400 font-semibold">
            {records.length > 0 ? Math.round((activeCount / records.length) * 100) : 0}% Active
          </span>
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-white">
          {activeCount}{" "}
          <span className="text-xs font-normal text-zinc-500 font-sans">Active</span> /{" "}
          <span className="text-amber-400">{pendingCount}</span>{" "}
          <span className="text-xs font-normal text-zinc-500 font-sans">Pending</span>
        </div>
        <div className="w-full bg-[#161c2a] h-1.5 rounded-none overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full"
            style={{
              width: `${records.length > 0 ? (activeCount / records.length) * 100 : 0}%`,
            }}
          />
          <div
            className="bg-amber-500 h-full"
            style={{
              width: `${records.length > 0 ? (pendingCount / records.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 4. Actionable Priority Alert */}
      <div className="p-3.5 rounded-none mistral-card space-y-1">
        <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-[#ff8204]" />
            <span>Priority Deals</span>
          </span>
          <span className="text-[#ffa033] font-semibold">{urgentCount} Urgent</span>
        </div>
        <div className="text-xl sm:text-2xl font-bold font-mono text-[#ffa033]">
          {urgentCount + highCount}{" "}
          <span className="text-xs font-normal text-zinc-400 font-sans">require focus</span>
        </div>
        <div className="text-[10px] text-zinc-400 font-mono">
          {urgentCount} critical escalations flagged
        </div>
      </div>
    </div>
  );
}
