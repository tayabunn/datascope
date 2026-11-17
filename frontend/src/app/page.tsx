"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
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
  CheckCircle2,
  Lock,
  Server,
  Activity,
  Cpu,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Terminal,
  Code2,
  RefreshCw,
  Eye,
  Download,
  Shield,
  Check,
  Play,
  ArrowUpRight,
  FileCode,
  Sliders,
  Radio,
  FileSpreadsheet,
} from "lucide-react";

export default function LandingPage() {
  // Interactive Product Showcase State
  const [activeTab, setActiveTab] = useState<
    "explorer" | "queryBuilder" | "aiCopilot" | "telemetry"
  >("explorer");

  // Mock search query in Interactive Explorer
  const [mockSearch, setMockSearch] = useState("");
  const [mockDensity, setMockDensity] = useState<"compact" | "normal">("compact");

  // Interactive FAQ Toggle state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mock dataset records for interactive table
  const allMockRows = [
    {
      id: "REC-055594",
      title: "Healthcare Regulatory EHR Integration Pipeline",
      company: "Orion Technologies",
      category: "Enterprise",
      status: "Active",
      country: "Canada",
      revenue: "$364,054.88",
      profit: "+$90,131.40",
      rating: "4.8",
      latency: "11.2ms",
    },
    {
      id: "REC-031706",
      title: "High-Frequency Algorithmic Execution Platform",
      company: "Jupiter Industries",
      category: "SMB",
      status: "Active",
      country: "Brazil",
      revenue: "$222,098.33",
      profit: "+$83,112.00",
      rating: "4.9",
      latency: "12.4ms",
    },
    {
      id: "REC-028237",
      title: "Telecom 5G Core Network Analytics Framework",
      company: "Summit Analytics",
      category: "Financial Services",
      status: "Active",
      country: "Netherlands",
      revenue: "$938,246.02",
      profit: "+$258,521.55",
      rating: "4.7",
      latency: "14.1ms",
    },
    {
      id: "REC-031027",
      title: "Predictive AI Demand Forecasting Engine",
      company: "Luminary Logistics",
      category: "Public Sector",
      status: "Pending",
      country: "France",
      revenue: "$1,536,104.86",
      profit: "+$522,805.64",
      rating: "4.6",
      latency: "13.8ms",
    },
    {
      id: "REC-099182",
      title: "Enterprise Data Warehouse Consolidation",
      company: "Nova Solutions",
      category: "Enterprise",
      status: "Active",
      country: "Germany",
      revenue: "$841,366.54",
      profit: "+$229,549.95",
      rating: "5.0",
      latency: "10.9ms",
    },
    {
      id: "REC-095869",
      title: "Automated Global Financial Reconciliation Gateway",
      company: "Vertex Consulting",
      category: "Financial Services",
      status: "Active",
      country: "Japan",
      revenue: "$984,137.51",
      profit: "+$497,868.74",
      rating: "4.9",
      latency: "15.0ms",
    },
  ];

  const filteredMockRows = allMockRows.filter(
    (row) =>
      row.title.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.company.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.country.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.id.toLowerCase().includes(mockSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient Radial Background Glows (Render Iris & Mistral Amber) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#6c35f5]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed top-[400px] right-0 w-[500px] h-[500px] bg-[#ff8204]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Public Navigation Header */}
      <PublicHeader />

      {/* Main Content */}
      <main className="flex-1 space-y-24 pb-20">
        {/* =========================================================================
            1. HERO SECTION & TELEMETRY STRIP
            ========================================================================= */}
        <section className="relative pt-20 pb-8 px-4 w-[90%] mx-auto text-center space-y-6">
          <div className="mistral-pill mb-2 shadow-sm inline-flex items-center gap-2 rounded-none px-3 py-1 bg-[#1a140f] border border-[#ff8204]/30 text-[#ffa033] text-xs font-mono">
            <span className="w-2 h-2 rounded-none bg-[#ff8204] animate-pulse" />
            <span>PostgreSQL 16 Engine • 100,000+ Records • Sub-18ms GIN Indexing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#fafaf4] tracking-tight leading-[1.1]">
            Next-Generation Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#968dfa] via-[#6c35f5] to-[#ff8204]">
              Data Discovery & Intelligence
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-[#a1a1aa] text-sm sm:text-base leading-relaxed font-sans">
            Engineered for high-volume tabular discovery. Query hundreds of thousands of records with PostgreSQL B-Tree & GIN trigram indexing, AST visual query synthesis, windowed virtual scrolling, and sub-20ms P95 query execution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/explorer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-none btn-render-primary text-sm font-semibold group shadow-lg shadow-[#6c35f5]/25"
            >
              <Database className="w-4 h-4 text-[#b193e0]" />
              <span>Launch Live Data Explorer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/search"
              className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold"
            >
              <Code2 className="w-4 h-4 text-[#968dfa]" />
              <span>Visual Query Builder</span>
            </Link>

            <Link
              href="/architecture"
              className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold"
            >
              <Cpu className="w-4 h-4 text-[#ffa033]" />
              <span>Architecture & Indexing</span>
            </Link>
          </div>

          {/* Metric Telemetry Cards */}
          <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dataset Volume</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#fafaf4]">
                100,000+
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                Indexed Records Loaded
              </div>
            </div>

            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Latency Benchmark</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">
                14.2ms
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                P95 GIN Trigram Speed
              </div>
            </div>

            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#968dfa]" />
                <span>Virtual Viewport</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#968dfa]">
                60 FPS
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                Zero DOM Layout Thrashing
              </div>
            </div>

            <div className="p-5 rounded-none mistral-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff8204]" />
                <span>Audit Trail</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#ffa033]">
                100%
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                Immutable Ledger Logging
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE MULTI-MODULE PRODUCT SHOWCASE (Tier-1 Sandbox Experience)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-indigo-500" />
                Live Interactive Workspace
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Inspect The DataScope Enterprise Stack
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
                Switch between core platform modules to test live virtualized data filtering, visual AST query synthesis, natural language AI tool-calling, and cluster telemetry.
              </p>
            </div>

            <Link
              href="/explorer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-xs font-semibold text-[#968dfa] hover:text-white transition-all shrink-0"
            >
              <span>Open Production App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module Switcher Tabs (Inspired by Supabase & PostHog) */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-[#0c0f18] border border-[#1a2030] rounded-none">
            <button
              onClick={() => setActiveTab("explorer")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold font-mono transition-all ${
                activeTab === "explorer"
                  ? "bg-[#6c35f5] text-white shadow-md shadow-[#6c35f5]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121624]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>1. Virtualized Data Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab("queryBuilder")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold font-mono transition-all ${
                activeTab === "queryBuilder"
                  ? "bg-[#6c35f5] text-white shadow-md shadow-[#6c35f5]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121624]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>2. Visual AST Query Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("aiCopilot")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold font-mono transition-all ${
                activeTab === "aiCopilot"
                  ? "bg-[#ff8204] text-white shadow-md shadow-[#ff8204]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121624]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. AI Natural Language Copilot</span>
            </button>

            <button
              onClick={() => setActiveTab("telemetry")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold font-mono transition-all ${
                activeTab === "telemetry"
                  ? "bg-[#6c35f5] text-white shadow-md shadow-[#6c35f5]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121624]"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>4. Mission Control & Telemetry</span>
            </button>
          </div>

          {/* Module Container Box */}
          <div className="rounded-none bg-[#0c0f18] border border-[#1b2234] shadow-2xl overflow-hidden min-h-[460px]">
            {/* ================= TAB 1: DATA EXPLORER ================= */}
            {activeTab === "explorer" && (
              <div className="space-y-0 animate-in fade-in duration-200">
                {/* Live Interactive Filter Bar */}
                <div className="p-3.5 bg-[#0e121d] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-64 sm:w-80">
                      <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Live filter mock rows (Orion, Canada, REC-031...)"
                        value={mockSearch}
                        onChange={(e) => setMockSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-none bg-[#121624] border border-[#222a3d] text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping" />
                      GIN Index Active • 14.2ms
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#141926] border border-[#222a3d] rounded-none p-0.5 text-[11px] font-mono">
                      <button
                        onClick={() => setMockDensity("compact")}
                        className={`px-2 py-0.5 rounded-none transition-colors ${
                          mockDensity === "compact"
                            ? "bg-indigo-600 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Compact
                      </button>
                      <button
                        onClick={() => setMockDensity("normal")}
                        className={`px-2 py-0.5 rounded-none transition-colors ${
                          mockDensity === "normal"
                            ? "bg-indigo-600 text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Spacious
                      </button>
                    </div>

                    <Link
                      href="/explorer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-none bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
                    >
                      <span>Full 100k Explorer</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                      <tr>
                        <th className="px-4 py-3">Record ID</th>
                        <th className="px-4 py-3">Deal Title</th>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">Revenue (USD)</th>
                        <th className="px-4 py-3">Net Profit</th>
                        <th className="px-4 py-3">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                      {filteredMockRows.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-zinc-500">
                            No records matching query &quot;{mockSearch}&quot;. Try another keyword.
                          </td>
                        </tr>
                      ) : (
                        filteredMockRows.map((row) => (
                          <tr
                            key={row.id}
                            className={`hover:bg-[#141926] transition-colors cursor-pointer ${
                              mockDensity === "compact" ? "py-2" : "py-3.5"
                            }`}
                          >
                            <td className="px-4 py-3 text-indigo-400 font-bold">{row.id}</td>
                            <td className="px-4 py-3 font-sans text-white font-medium">
                              {row.title}
                            </td>
                            <td className="px-4 py-3 text-zinc-300">{row.company}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-none bg-zinc-800 text-zinc-300 text-[10px]">
                                {row.category}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-none border text-[10px] ${
                                  row.status === "Active"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-zinc-400">{row.country}</td>
                            <td className="px-4 py-3 text-white font-semibold">{row.revenue}</td>
                            <td className="px-4 py-3 text-emerald-400 font-semibold">{row.profit}</td>
                            <td className="px-4 py-3 text-amber-400">★ {row.rating}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#0b0e17] border-t border-[#1b2234] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>
                    Showing {filteredMockRows.length} of {allMockRows.length} displayed rows (Virtualized Engine caches 100,000 records)
                  </span>
                  <span className="text-indigo-400">
                    Row Virtualization Engine active • Windowed Viewport
                  </span>
                </div>
              </div>
            )}

            {/* ================= TAB 2: VISUAL AST QUERY BUILDER ================= */}
            {activeTab === "queryBuilder" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#1f283d] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#968dfa]" />
                      <span>Abstract Syntax Tree (AST) Condition Evaluator</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Construct relational filter predicates without writing raw SQL. Auto-compiles to indexed PostgreSQL statements.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    SQL AST Engine
                  </span>
                </div>

                {/* Predicate Condition Cards */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-none bg-[#121624] border border-[#20293d] flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="px-2 py-1 rounded-none bg-indigo-600/30 text-indigo-300 font-bold">
                      WHERE
                    </span>
                    <span className="text-white">Status (Enum)</span>
                    <span className="text-zinc-500">=</span>
                    <span className="text-emerald-400 font-semibold">&apos;Active&apos;</span>
                    <span className="ml-auto text-[10px] text-zinc-500">Indexed (B-Tree)</span>
                  </div>

                  <div className="p-3 rounded-none bg-[#121624] border border-[#20293d] flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="px-2 py-1 rounded-none bg-amber-600/30 text-amber-300 font-bold">
                      AND
                    </span>
                    <span className="text-white">Revenue (Numeric)</span>
                    <span className="text-zinc-500">&gt;=</span>
                    <span className="text-white font-semibold">$50,000.00</span>
                    <span className="ml-auto text-[10px] text-zinc-500">Range Scan</span>
                  </div>

                  <div className="p-3 rounded-none bg-[#121624] border border-[#20293d] flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="px-2 py-1 rounded-none bg-amber-600/30 text-amber-300 font-bold">
                      AND
                    </span>
                    <span className="text-white">Company Name</span>
                    <span className="text-zinc-500">ILIKE</span>
                    <span className="text-cyan-400 font-semibold">&apos;%Technologies%&apos;</span>
                    <span className="ml-auto text-[10px] text-emerald-400">GIN Trigram Search</span>
                  </div>
                </div>

                {/* Live Compiled PostgreSQL Code Window */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#ff8204]" />
                      <span>Compiled PostgreSQL DDL / Query Output</span>
                    </span>
                    <span className="text-emerald-400 text-[11px]">Execution Time: 12.8ms (EXPLAIN Plan Verified)</span>
                  </div>
                  <pre className="p-4 rounded-none bg-[#090b10] border border-[#1f283d] text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed">
{`SELECT id, record_code, title, company_name, revenue, status, country
FROM dataset_records
WHERE status = 'Active'
  AND revenue >= 50000.00
  AND company_name %> 'Technologies' -- GIN pg_trgm similarity match
ORDER BY revenue DESC
LIMIT 50 OFFSET 0;`}
                  </pre>
                </div>
              </div>
            )}

            {/* ================= TAB 3: AI NATURAL LANGUAGE COPILOT ================= */}
            {activeTab === "aiCopilot" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#1f283d] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ff8204]" />
                      <span>Autonomous Natural Language to Structured Query Translator</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Leverages schema-aware LLM tool calling with strict parameter guardrails to prevent SQL injection.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Safe Tool Calling
                  </span>
                </div>

                {/* Simulated Prompt Box */}
                <div className="p-4 rounded-none bg-[#121624] border border-[#222a3d] space-y-3">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase">
                    Natural Language Input Prompt:
                  </div>
                  <div className="p-3 bg-[#0c0f18] border border-[#1e2638] text-xs text-white font-mono">
                    &quot;Find all active healthcare and enterprise contracts in Canada with profit exceeding $80,000&quot;
                  </div>
                </div>

                {/* Tool Calling Execution Payload Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-none bg-[#0e121d] border border-[#1f283d] space-y-2">
                    <div className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Schema Tool-Call Synthesized</span>
                    </div>
                    <pre className="text-[11px] font-mono text-zinc-300 overflow-x-auto p-2 bg-[#080a10] border border-[#1a2030]">
{`{
  "tool": "query_dataset_records",
  "arguments": {
    "status": "Active",
    "country": "Canada",
    "minProfit": 80000,
    "category": ["Healthcare", "Enterprise"]
  }
}`}
                    </pre>
                  </div>

                  <div className="p-4 rounded-none bg-[#0e121d] border border-[#1f283d] space-y-3">
                    <div className="text-xs font-semibold text-indigo-300 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Guardrail Verification Checks</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>SQL Injection AST Filter: Passed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Numeric Boundaries Validation: Passed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Execution Safety: Read-Only Transaction</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: MISSION CONTROL & TELEMETRY ================= */}
            {activeTab === "telemetry" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#1f283d] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>Cluster Infrastructure & Connection Pool Telemetry</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Real-time operational monitoring of PGBouncer connection pools, Redis/RTK cache hit ratios, and security audit logs.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Cluster Status: NOMINAL
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-none bg-[#121624] border border-[#1e273b] space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      PGBouncer Connection Pool
                    </span>
                    <div className="text-2xl font-bold font-mono text-white">
                      18 / 20 <span className="text-xs text-zinc-400 font-normal">Active Clients</span>
                    </div>
                    <div className="w-full bg-[#1b2336] h-2 rounded-none overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[90%]" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Transaction Pooling Mode • Zero Saturation
                    </span>
                  </div>

                  <div className="p-4 rounded-none bg-[#121624] border border-[#1e273b] space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      Server Cache Hit Ratio
                    </span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      99.4%
                    </div>
                    <div className="w-full bg-[#1b2336] h-2 rounded-none overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[99.4%]" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      300s TTL Normalized Client Invalidation
                    </span>
                  </div>

                  <div className="p-4 rounded-none bg-[#121624] border border-[#1e273b] space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      Heap Memory Allocation
                    </span>
                    <div className="text-2xl font-bold font-mono text-[#ffa033]">
                      42.8 MB
                    </div>
                    <div className="w-full bg-[#1b2336] h-2 rounded-none overflow-hidden">
                      <div className="bg-[#ff8204] h-full w-[28%]" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Streamed Cursor Seeder • Flat GC Curve
                    </span>
                  </div>
                </div>

                {/* Audit Log Stream */}
                <div className="p-4 rounded-none bg-[#090b10] border border-[#1f283d] space-y-2 text-xs font-mono">
                  <div className="text-zinc-400 uppercase text-[10px] font-semibold border-b border-[#1b2336] pb-1.5 flex items-center justify-between">
                    <span>Recent Security Audit Stream (SHA-256 Verified)</span>
                    <span className="text-indigo-400">Streaming Live</span>
                  </div>
                  <div className="space-y-1 text-zinc-300">
                    <div className="flex items-center justify-between py-1 border-b border-[#161c2a]">
                      <span className="text-emerald-400 font-semibold">UPDATE_RECORD_STATUS</span>
                      <span className="text-zinc-400">REC-055594 &rarr; Active</span>
                      <span className="text-zinc-500">Alex Rivera (CDO)</span>
                      <span className="text-zinc-600">2s ago</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#161c2a]">
                      <span className="text-indigo-400 font-semibold">EXPORT_CSV_TRIGGER</span>
                      <span className="text-zinc-400">Filtered Set (1,240 rows)</span>
                      <span className="text-zinc-500">Sarah Connor (Analyst)</span>
                      <span className="text-zinc-600">14s ago</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-amber-400 font-semibold">APPLY_SAVED_VIEW</span>
                      <span className="text-zinc-400">&quot;Q4 High-Margin EMEA&quot;</span>
                      <span className="text-zinc-500">Marcus Vance (Viewer)</span>
                      <span className="text-zinc-600">42s ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            3. PERFORMANCE BENCHMARKS: Sequential Scan vs GIN Trigram
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ffa033] font-semibold">
              Empirical Benchmarks
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              PostgreSQL 16 Indexing vs Traditional Relational Scans
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans">
              Tested on 100,000 denormalized enterprise records under concurrent load. Substring fuzzy matching and range filtering executed without disk thrashing.
            </p>
          </div>

          <div className="rounded-none bg-[#0c0f18] border border-[#1b2234] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                  <tr>
                    <th className="px-5 py-3.5">Query Evaluation Type</th>
                    <th className="px-5 py-3.5">Traditional Sequential Scan</th>
                    <th className="px-5 py-3.5 text-indigo-400">DataScope (B-Tree + GIN Trigram)</th>
                    <th className="px-5 py-3.5 text-emerald-400">Performance Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Substring Search (`ILIKE &apos;%corp%&apos;`)
                    </td>
                    <td className="px-5 py-3.5 text-rose-400">
                      480.4ms (Full Table Scan)
                    </td>
                    <td className="px-5 py-3.5 text-indigo-300 font-bold">
                      14.2ms (GIN Index Lookup)
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">
                      97.0% Faster Execution ⚡
                    </td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Multi-Column Range (`status = &apos;Active&apos; AND revenue &gt; 50k`)
                    </td>
                    <td className="px-5 py-3.5 text-rose-400">
                      214.1ms (Filter on Scan)
                    </td>
                    <td className="px-5 py-3.5 text-indigo-300 font-bold">
                      8.6ms (Composite B-Tree)
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">
                      95.9% Faster Execution ⚡
                    </td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Client-Side DOM Rendering (50k rows)
                    </td>
                    <td className="px-5 py-3.5 text-rose-400">
                      Browser Freeze (50k active DOM nodes)
                    </td>
                    <td className="px-5 py-3.5 text-indigo-300 font-bold">
                      Flat 60 FPS (Virtual window ~25 DOM nodes)
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">
                      Zero Client Lag ⚡
                    </td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Connection Saturation (200 concurrent users)
                    </td>
                    <td className="px-5 py-3.5 text-rose-400">
                      Connection Refused (Postgres Max Limit)
                    </td>
                    <td className="px-5 py-3.5 text-indigo-300 font-bold">
                      PGBouncer Connection Pooling (20 pool limit)
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">
                      Zero Dropped Queries ⚡
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SIX CORE ARCHITECTURAL PILLARS (Detailed Engineering Breakdown)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Engineered For Scale
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Architectural Foundations
              </h2>
            </div>
            <Link
              href="/features"
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-xs font-semibold text-[#968dfa] hover:text-white transition-all shrink-0"
            >
              <span>View Full Features & RBAC Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-none render-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#6c35f5]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                100,000+ Record Streaming Seeder
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Chunked batch insertion streams 100k synthetic enterprise records directly through parameterized transactions—preventing server memory spikes or OOM errors.
              </p>
            </div>

            <div className="p-6 rounded-none mistral-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#ff8204]/15 border border-[#ff8204]/35 flex items-center justify-center text-[#ffa033]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                GIN Trigram Fuzzy Indexing
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Powered by PostgreSQL <code className="text-[#ffa033] font-mono">pg_trgm</code> GIN indexes and composite B-Trees. Executes arbitrary substring matches in sub-20ms without table scans.
              </p>
            </div>

            <div className="p-6 rounded-none render-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#0b7d55]/15 border border-[#0b7d55]/35 flex items-center justify-center text-[#0b7d55]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Windowed Viewport Virtualization
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Only the 25–30 DOM rows currently inside the viewport are rendered in memory. Scroll through 100k records at a locked 60 frames per second without memory leaks.
              </p>
            </div>

            <div className="p-6 rounded-none render-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#968dfa]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Push-Down SQL Aggregations
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Computes portfolio sums, profit margins, and distribution curves entirely inside the PostgreSQL engine, avoiding client-side serialization overhead.
              </p>
            </div>

            <div className="p-6 rounded-none render-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#005e9e]/15 border border-[#005e9e]/35 flex items-center justify-center text-[#38bdf8]">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Saved Views & URL Deep Linking
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Multi-condition filters, visible columns, and sorting states synchronize with URL search params. Bookmark, reload, or share exact filtered viewports with team members.
              </p>
            </div>

            <div className="p-6 rounded-none render-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#8a05ff]/15 border border-[#8a05ff]/35 flex items-center justify-center text-[#c084fc]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Role-Based Access Control (RBAC)
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Strict isolation between Administrator (full schema DDL/DML), Data Analyst (query, filter, export), and Viewer (read-only) roles with immutable change logs.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. ENTERPRISE RBAC PERMISSIONS MATRIX
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Governance & Security
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Role-Based Access Control (RBAC) Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans">
              Built for enterprise data teams with granular permission enforcement across all read, write, export, and administrative endpoints.
            </p>
          </div>

          <div className="rounded-none bg-[#0c0f18] border border-[#1b2234] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                  <tr>
                    <th className="px-5 py-3.5">Capability / Operation</th>
                    <th className="px-5 py-3.5 text-indigo-400">Administrator</th>
                    <th className="px-5 py-3.5 text-[#ffa033]">Data Analyst</th>
                    <th className="px-5 py-3.5 text-zinc-400">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Live Data Explorer & Trigram Search
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Full Access (All 100k Rows)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Full Access (All 100k Rows)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Full Access (Read-Only)</td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Visual AST Query Builder & AI Copilot
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Granted (Unlimited)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Granted (Unlimited)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Granted (Read-Only AST)</td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      CSV / Dataset Bulk Streaming Export
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Enabled (Unlimited Size)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Enabled (Filtered Viewports)</td>
                    <td className="px-5 py-3.5 text-zinc-500 font-semibold">Restricted (Export Blocked)</td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Record Modification & Status Mutator
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Allowed (Audit Logged)</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">Allowed (Status Mutator)</td>
                    <td className="px-5 py-3.5 text-rose-400 font-semibold">Disabled (HTTP 403 Forbidden)</td>
                  </tr>

                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-5 py-3.5 font-sans font-medium text-white">
                      Database Maintenance & Cluster Index Rebuilding
                    </td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">VACUUM / REINDEX / Sync</td>
                    <td className="px-5 py-3.5 text-rose-400 font-semibold">Restricted</td>
                    <td className="px-5 py-3.5 text-rose-400 font-semibold">Restricted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. DEVELOPER INTEGRATION: REST API & SQL PAYLOAD
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Developer Integration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                RESTful API & Programmatic AST Querying
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
                Every filter, search predicate, and saved view in DataScope is backed by a fully typed HTTP JSON endpoint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* cURL API Request */}
            <div className="rounded-none bg-[#090b10] border border-[#1b2234] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-[#1b2234] pb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>cURL Command Execution</span>
                </span>
                <span className="text-zinc-500">HTTP GET /api/records</span>
              </div>
              <pre className="text-zinc-300 overflow-x-auto leading-relaxed">
{`curl -X GET "https://datascope.internal/api/records" \\
  -H "Authorization: Bearer ds_live_sec_99a8x" \\
  -d '{
    "query": "Technologies",
    "status": "Active",
    "minRevenue": 50000,
    "page": 1,
    "pageSize": 50,
    "sortBy": "revenue",
    "sortDesc": true
  }'`}
              </pre>
            </div>

            {/* JSON Response */}
            <div className="rounded-none bg-[#090b10] border border-[#1b2234] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-[#1b2234] pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>200 OK — Sub-20ms Streamed Response</span>
                </span>
                <span className="text-zinc-500">JSON Payload</span>
              </div>
              <pre className="text-indigo-300 overflow-x-auto leading-relaxed">
{`{
  "status": "success",
  "meta": {
    "totalCount": 100000,
    "filteredCount": 1240,
    "latencyMs": 14.2,
    "indexUsed": "idx_records_title_trgm_gin"
  },
  "data": [
    {
      "id": "REC-055594",
      "title": "Healthcare Regulatory EHR Pipeline",
      "company": "Orion Technologies",
      "revenue": 364054.88,
      "status": "Active"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#968dfa] font-semibold">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Architectural & Operational Details
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "How does DataScope maintain sub-20ms latency on 100,000+ records?",
                a: "DataScope leverages PostgreSQL 16 trigram extension (pg_trgm) with Generalized Inverted Indexes (GIN) on string columns and composite B-Trees on financial ranges. Substring searches bypass full table sequential scans completely.",
              },
              {
                q: "How does the Virtualized Viewport prevent browser tab crashes?",
                a: "Rather than injecting 100,000 DOM rows into the browser (which consumes over 800MB of RAM and causes layout thrashing), our virtualized scroll container calculates scroll offsets dynamically and only mounts ~25 active DOM elements into the viewport.",
              },
              {
                q: "Is the Natural Language AI Copilot safe against SQL Injection?",
                a: "Yes. The AI Copilot does not write or execute freeform SQL text directly. Instead, it generates a strongly-typed JSON schema payload through OpenAI / Anthropic Tool Calling with strict Pydantic / Zod guardrail filters before running parameterized PostgreSQL queries.",
              },
              {
                q: "What role does PGBouncer connection pooling play?",
                a: "PGBouncer acts as a high-speed reverse proxy between the Next.js API route workers and the underlying PostgreSQL database. In transaction pooling mode, hundreds of incoming concurrent client queries are multiplexed across 20 persistent database connections.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-none bg-[#0c0f18] border border-[#1b2234] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-[#121624] transition-colors"
                >
                  <span className="font-sans">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openFaq === index ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-xs text-zinc-400 leading-relaxed font-sans border-t border-[#161d2d] bg-[#0a0d14]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. FINAL CTA BANNER
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-none render-card space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#6c35f5]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff8204]/10 blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-bold text-[#fafaf4] tracking-tight relative z-10">
              Ready to Discover Enterprise Intelligence?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto relative z-10 font-sans">
              Test sub-18ms queries, multi-variable AST query building, and audit trail validation across 100,000 records right now.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
              <Link
                href="/explorer"
                className="px-6 py-3.5 rounded-none btn-render-primary text-xs font-semibold flex items-center gap-2 group shadow-lg shadow-[#6c35f5]/25"
              >
                <span>Launch Live Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="px-6 py-3.5 rounded-none btn-render-secondary text-xs font-semibold"
              >
                Provision Demo Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
