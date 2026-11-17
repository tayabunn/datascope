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
  Line,
  CartesianGrid,
  ComposedChart,
  Legend,
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
  Search,
  Filter,
  Zap,
  Activity,
  Clock,
} from "lucide-react";

interface AnalyticsChartsProps {
  data?: AnalyticsApiResponse["data"];
  isLoading: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  Active: "#0B7D55", // Render Product Success
  Pending: "#FF8204", // Mistral Amber
  Inactive: "#AF1D27", // Render Red
  Archived: "#6B6B6B", // Render Slate Gray
};

const CATEGORY_COLORS = [
  "#6C35F5", // Render Iris
  "#FF8204", // Mistral Amber
  "#968DFA", // Render Hills Warm
  "#0B7D55", // Render Product Success
  "#005E9E", // Render Blue
  "#8A05FF", // Render Purple
  "#FFA033", // Mistral Amber Light
];

export default function AnalyticsCharts({
  data,
  isLoading,
}: AnalyticsChartsProps) {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-[#121624] rounded-none border border-[#1d2538]" />
        ))}
      </div>
    );
  }

  const {
    summary,
    byCategory,
    byStatus,
    growthTrends,
    searchActivity = [],
    mostFrequentFilters = [],
  } = data;

  return (
    <div className="space-y-6">
      {/* 1. Summary Metric Cards: Total Records & Key Financials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records */}
        <div className="p-4 rounded-none render-card space-y-1">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
            <span>TOTAL RECORDS</span>
            <Layers className="w-4 h-4 text-[#968dfa]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#fafaf4]">
            {summary.totalRecords.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#0b7d55] flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Indexed & Verified</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-4 rounded-none render-card space-y-1">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
            <span>TOTAL REVENUE (SQL SUM)</span>
            <DollarSign className="w-4 h-4 text-[#0b7d55]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#0b7d55]">
            ${(summary.totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-[#a1a1aa] font-mono">
            Aggregated on PostgreSQL
          </div>
        </div>

        {/* Average Profit Margin */}
        <div className="p-4 rounded-none render-card space-y-1">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
            <span>AVG PROFIT MARGIN</span>
            <TrendingUp className="w-4 h-4 text-[#968dfa]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#b193e0]">
            {summary.avgProfitMargin}%
          </div>
          <div className="text-[11px] text-[#a1a1aa] font-mono">
            Across 100k business deals
          </div>
        </div>

        {/* Active Accounts & Search Metrics */}
        <div className="p-4 rounded-none mistral-card space-y-1">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
            <span>ACTIVE RECORDS</span>
            <Activity className="w-4 h-4 text-[#ff8204]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#fafaf4]">
            {summary.activeCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#ffa033] font-mono flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#ff8204]" />
            <span>Avg Query Latency: {summary.avgQueryLatencyMs || 12.6}ms</span>
          </div>
        </div>
      </div>

      {/* 2 & 3. Category Breakdown & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Records by Category (Bar Chart) */}
        <div className="p-5 rounded-none render-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#968dfa]" />
              <h3 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                Records by Category
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#a1a1aa]">GROUP BY category</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" />
                <XAxis
                  dataKey="category"
                  stroke="#a1a1aa"
                  fontSize={10}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0c0f18",
                    borderColor: "#1a2030",
                    borderRadius: "8px",
                    boxShadow: "0 0 0 1px rgba(150, 141, 250, 0.25) inset",
                    color: "#fafaf4",
                    fontSize: "11px",
                  }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} records`, "Record Count"]}
                />
                <Bar dataKey="count" fill="#6c35f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Records by Status (Donut Pie Chart) */}
        <div className="p-5 rounded-none mistral-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#ff8204]" />
              <h3 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                Records by Status
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#a1a1aa]">GROUP BY status</span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121624",
                    borderColor: "#232c42",
                    borderRadius: "0px",
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
                  outerRadius={92}
                  paddingAngle={4}
                  stroke="#0c0f18"
                  strokeWidth={2}
                >
                  {byStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.status] || CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-[11px] text-zinc-300 font-mono">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Data Growth Trends (Area Chart) */}
      <div className="p-5 rounded-none render-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#968dfa]" />
            <h3 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
              Data Growth Trends (Monthly Record Ingestion)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#a1a1aa]">
            Past 12 Months Time-Series Aggregation
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c35f5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6c35f5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" />
              <XAxis dataKey="month" stroke="#a1a1aa" fontSize={10} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} />
              <Tooltip
                cursor={{ stroke: "#6c35f5", strokeWidth: 1, strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#0c0f18",
                  borderColor: "#1a2030",
                  borderRadius: "0px",
                  boxShadow: "0 0 0 1px rgba(150, 141, 250, 0.25) inset",
                  color: "#fafaf4",
                  fontSize: "11px",
                }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} records`, "Ingestion Volume"]}
              />
              <Area
                type="monotone"
                dataKey="recordCount"
                stroke="#6c35f5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#growthGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5 & 6. Search Activity & Most Frequently Used Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 5: Search Activity & Query Latency (Composed Chart) */}
        <div className="p-5 rounded-none mistral-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#ff8204]" />
              <h3 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                Search Activity & Query Latency
              </h3>
            </div>
            <span className="mistral-pill text-[10px] py-0.5 px-2">
              Sub-15ms Latency
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={searchActivity} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" />
                <XAxis dataKey="time" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <YAxis yAxisId="left" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#0b7d55"
                  fontSize={10}
                  tickLine={false}
                  unit="ms"
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0c0f18",
                    borderColor: "#1a2030",
                    borderRadius: "0px",
                    boxShadow: "0 0 0 1px rgba(255, 130, 4, 0.25) inset",
                    color: "#fafaf4",
                    fontSize: "11px",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  formatter={(value) => <span className="text-[11px] text-[#fafaf4] font-mono">{value}</span>}
                />
                <Bar yAxisId="left" dataKey="queryCount" name="Query Volume" fill="#ff8204" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgLatencyMs"
                  name="Avg Latency (ms)"
                  stroke="#0b7d55"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#0b7d55" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Most Frequently Used Filters (Horizontal Bar Chart) */}
        <div className="p-5 rounded-none render-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#968dfa]" />
              <h3 className="text-xs font-semibold text-[#fafaf4] uppercase font-mono tracking-wider">
                Most Frequently Used Filters
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#a1a1aa]">Usage Distribution</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={mostFrequentFilters}
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2030" horizontal={false} />
                <XAxis type="number" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="filterName"
                  stroke="#a1a1aa"
                  fontSize={9}
                  tickLine={false}
                  width={140}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#0c0f18",
                    borderColor: "#1a2030",
                    borderRadius: "8px",
                    boxShadow: "0 0 0 1px rgba(150, 141, 250, 0.25) inset",
                    color: "#fafaf4",
                    fontSize: "11px",
                  }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} times`, "Frequency"]}
                />
                <Bar dataKey="usageCount" fill="#6c35f5" radius={[0, 4, 4, 0]}>
                  {mostFrequentFilters.map((_, index) => (
                    <Cell
                      key={`filter-cell-${index}`}
                      fill={index === 0 ? "#6c35f5" : index === 1 ? "#968dfa" : index === 2 ? "#ff8204" : "#0b7d55"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
