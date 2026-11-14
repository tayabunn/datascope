"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { AnalyticsApiResponse } from "@/store/api/recordsApi";
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  BarChart2,
  Calendar,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface AnalyticsChartsProps {
  data?: AnalyticsApiResponse["data"];
  isLoading: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  Active: "#10b981", // Emerald
  Pending: "#f59e0b", // Amber
  Inactive: "#f43f5e", // Rose
  Archived: "#64748b", // Slate
};

const CATEGORY_COLORS = ["#6366f1", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function AnalyticsCharts({
  data,
  isLoading,
}: AnalyticsChartsProps) {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-[#121624] rounded-xl" />
        ))}
      </div>
    );
  }

  const { summary, byCategory, byStatus, growthTrends } = data;

  return (
    <div className="space-y-6">
      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records */}
        <div className="p-4 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>TOTAL RECORDS</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {summary.totalRecords.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Indexed & Verified</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-4 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>TOTAL REVENUE (AGGREGATED)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ${(summary.totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">
            Server-side SQL Summation
          </div>
        </div>

        {/* Average Profit Margin */}
        <div className="p-4 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>AVG PROFIT MARGIN</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300">
            {summary.avgProfitMargin}%
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">
            Derived across portfolio
          </div>
        </div>

        {/* Active Accounts */}
        <div className="p-4 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>ACTIVE ACCOUNTS</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {summary.activeCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">
            {(
              (summary.activeCount / summary.totalRecords) *
              100
            ).toFixed(1)}
            % of total dataset
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Revenue by Category (Bar Chart) */}
        <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                Records & Revenue by Sector Category
              </h3>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2538" />
                <XAxis
                  dataKey="category"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121624",
                    borderColor: "#232c42",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} records`, "Count"]}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Status Breakdown (Donut Pie Chart) */}
        <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                Records by Operational Status
              </h3>
            </div>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121624",
                    borderColor: "#232c42",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} records`, "Status"]}
                />
                <Pie
                  data={byStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {byStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.status] || CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Historical Growth Trends (Area Chart) */}
        <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                Monthly Ingestion Volume & Historical Growth
              </h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              Past 12 Months
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthTrends}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d2538" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121624",
                    borderColor: "#232c42",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} records`, "Volume"]}
                />
                <Area
                  type="monotone"
                  dataKey="recordCount"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#growthGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
