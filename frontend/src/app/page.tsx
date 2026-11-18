"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import MotionHeroShowcase from "@/components/home/MotionHeroShowcase";
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
  Activity,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  FileSpreadsheet,
  Users,
  Briefcase,
  Share2,
  Download,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  Check,
  HelpCircle,
} from "lucide-react";

export default function LandingPage() {
  // Interactive Product Showcase State (Focused on User Workflows)
  const [activeTab, setActiveTab] = useState<
    "explorer" | "queryBuilder" | "aiCopilot" | "collaboration"
  >("explorer");

  // Mock search query in Interactive Explorer
  const [mockSearch, setMockSearch] = useState("");
  const [mockDensity, setMockDensity] = useState<"compact" | "normal">("compact");

  // Interactive FAQ Toggle state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Realistic Business Records for the Interactive Explorer
  const allMockRows = [
    {
      id: "REC-055594",
      title: "Healthcare Regulatory EHR Integration Pipeline",
      company: "Orion Technologies",
      category: "Healthcare",
      status: "Active",
      country: "Canada",
      revenue: "$364,054.88",
      profit: "+$90,131.40",
      rating: "4.8",
      priority: "Urgent",
    },
    {
      id: "REC-031706",
      title: "High-Frequency Algorithmic Execution Platform",
      company: "Jupiter Industries",
      category: "Fintech",
      status: "Active",
      country: "Brazil",
      revenue: "$222,098.33",
      profit: "+$83,112.00",
      rating: "4.9",
      priority: "High",
    },
    {
      id: "REC-028237",
      title: "Telecom 5G Core Network Analytics Framework",
      company: "Summit Analytics",
      category: "Telecommunications",
      status: "Active",
      country: "Netherlands",
      revenue: "$938,246.02",
      profit: "+$258,521.55",
      rating: "4.7",
      priority: "Urgent",
    },
    {
      id: "REC-031027",
      title: "Predictive AI Demand Forecasting Engine",
      company: "Luminary Logistics",
      category: "Supply Chain",
      status: "Pending",
      country: "France",
      revenue: "$1,536,104.86",
      profit: "+$522,805.64",
      rating: "4.6",
      priority: "Low",
    },
    {
      id: "REC-099182",
      title: "Enterprise Data Warehouse Consolidation",
      company: "Nova Solutions",
      category: "Cloud Infrastructure",
      status: "Active",
      country: "Germany",
      revenue: "$841,366.54",
      profit: "+$229,549.95",
      rating: "5.0",
      priority: "Urgent",
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
      priority: "High",
    },
  ];

  const filteredMockRows = allMockRows.filter(
    (row) =>
      row.title.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.company.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.country.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.category.toLowerCase().includes(mockSearch.toLowerCase()) ||
      row.id.toLowerCase().includes(mockSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#001225] text-[#ffffff] flex flex-col selection:bg-[#1e6aff]/30 selection:text-[#38bdf8]">
      {/* Ambient Radial Background Glows (GENESIS Architectural Electric Blue & Deep Midnight) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#1e6aff]/10 blur-[170px] pointer-events-none" />
      <div className="fixed top-[400px] right-0 w-[500px] h-[500px] bg-[#002b5c]/25 blur-[180px] pointer-events-none" />

      {/* Public Navigation Header */}
      <PublicHeader />

      {/* Main Content */}
      <main className="flex-1 space-y-24 pb-20">
        {/* =========================================================================
            1. HERO SECTION: PURPOSE & CORE BUSINESS VALUE
            ========================================================================= */}
        <section className="relative pt-20 pb-8 px-4 w-[90%] mx-auto text-center space-y-6">
          <div className="genesis-badge mb-2 shadow-sm inline-flex items-center gap-2 rounded-none px-3.5 py-1.5 bg-[#001225] border border-[#1e6aff]/40 text-[#38bdf8] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>The Enterprise Hub for High-Volume Revenue, Contracts & Deal Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#ffffff] tracking-tight leading-[1.1]">
            Instant Data Discovery. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#38bdf8] to-[#1e6aff]">
              Zero Spreadsheets Crashing.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-[#878787] text-sm sm:text-base leading-relaxed font-sans">
            Give your revenue, finance, and operations teams the power to search, filter, and analyze <strong>100,000+ business contracts</strong> in milliseconds. Eliminate slow exports, engineering query bottlenecks, and outdated files with one centralized, audit-ready data platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/explorer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-none btn-render-primary text-sm font-semibold group shadow-lg shadow-[#1e6aff]/25 text-white"
            >
              <Database className="w-4 h-4 text-[#38bdf8]" />
              <span>Explore Live Demo (100k Contracts)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/search"
              className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
              <span>Try Visual Query Builder</span>
            </Link>

            <Link
              href="/features"
              className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-sm font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
              <span>Security & Governance</span>
            </Link>
          </div>

          {/* Business Impact Metrics */}
          <div className="pt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Search Latency</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">
                &lt; 20ms
              </div>
              <div className="text-[11px] text-[#878787] font-mono">
                Instant Sub-Second Lookups
              </div>
            </div>

            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Data Capacity</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#ffffff]">
                100,000+
              </div>
              <div className="text-[11px] text-[#878787] font-mono">
                Records Handled Smoothly
              </div>
            </div>

            <div className="p-5 rounded-none render-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Self-Serve Access</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#38bdf8]">
                0 Code
              </div>
              <div className="text-[11px] text-[#878787] font-mono">
                No SQL or Engineers Needed
              </div>
            </div>

            <div className="p-5 rounded-none mistral-card text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Audit Trail</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#38bdf8]">
                100%
              </div>
              <div className="text-[11px] text-[#878787] font-mono">
                Tracked & Immutable Logs
              </div>
            </div>
          </div>

          {/* Interactive Motion Choreography Showcase (Derived from motion.md) */}
          <div className="pt-6 w-full mx-auto text-left">
            <MotionHeroShowcase />
          </div>
        </section>

        {/* =========================================================================
            2. THE PROBLEM WE SOLVE: SPREADSHEET CHAOS VS DATASCOPE
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Why Enterprise Teams Replace Spreadsheets</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Traditional Spreadsheets Weren&apos;t Built for Modern Data Scale
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans">
              See how DataScope transforms painful data bottlenecks into instant, self-serve business answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-none bg-[#120e11] border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold font-mono">
                <ShieldAlert className="w-4 h-4" />
                <span>The Traditional Problem (Excel & Clunky CSVs)</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Browser & App Crashes:</strong> Excel or Google Sheets freezes and crashes whenever your dataset reaches 50,000+ customer records or invoices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Engineering Bottlenecks:</strong> Business users have to wait days for data engineers to write SQL queries just to answer a simple quarterly question.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Outdated Versions:</strong> Team members circulate conflicting CSV files over email and Slack, resulting in decision-making based on stale data.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Zero Compliance or Audit Log:</strong> Anyone can accidentally overwrite a multi-million-dollar figure with no record of who changed what or when.</span>
                </li>
              </ul>
            </div>

            {/* The DataScope Way */}
            <div className="p-6 rounded-none bg-[#0c1318] border border-emerald-500/25 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>The DataScope Solution (Modern Data Intelligence)</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Zero-Lag Virtualized Tables:</strong> Smoothly scroll through 100,000+ records at a locked 60 FPS without your browser using more than a few megabytes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Self-Serve Point-and-Click:</strong> Non-technical business users can filter, slice, and cross-reference data in seconds without writing a line of SQL.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>One Shared Source of Truth:</strong> Save custom views, share bookmarked URLs, and ensure everyone looks at identical live database records.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>100% Immutable Audit History:</strong> Every status update, approval, and modification is permanently logged with user ID, timestamp, and previous state.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTERACTIVE PRODUCT SHOWCASE (Workflow-Driven)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#1e6aff]" />
                Interactive Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                How Your Team Uses DataScope Every Day
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
                Experience the 4 primary workflows that make revenue discovery, custom filtering, and decision-making effortless.
              </p>
            </div>

            <Link
              href="/explorer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#091b36] hover:bg-[#0f2a52] border border-[#142b4d] text-xs font-semibold text-[#38bdf8] hover:text-white transition-all shrink-0"
            >
              <span>Open Full Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module Switcher Tabs (Focused on User Goals) */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-[#051329] border border-[#132a4a] rounded-none">
            <button
              onClick={() => setActiveTab("explorer")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold transition-all ${
                activeTab === "explorer"
                  ? "bg-[#1e6aff] text-white shadow-md shadow-[#1e6aff]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#091b36]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>1. Instant Search & Data Discovery</span>
            </button>

            <button
              onClick={() => setActiveTab("queryBuilder")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold transition-all ${
                activeTab === "queryBuilder"
                  ? "bg-[#1e6aff] text-white shadow-md shadow-[#1e6aff]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#091b36]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>2. Visual Query Builder (No SQL)</span>
            </button>

            <button
              onClick={() => setActiveTab("aiCopilot")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold transition-all ${
                activeTab === "aiCopilot"
                  ? "bg-[#1e6aff] text-white shadow-md shadow-[#1e6aff]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#091b36]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. Ask Questions in Plain English (AI)</span>
            </button>

            <button
              onClick={() => setActiveTab("collaboration")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold transition-all ${
                activeTab === "collaboration"
                  ? "bg-[#1e6aff] text-white shadow-md shadow-[#1e6aff]/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#091b36]"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>4. Saved Views & Team Collaboration</span>
            </button>
          </div>

          {/* Module Container Box */}
          <div className="rounded-none bg-[#051329] border border-[#132a4a] shadow-2xl overflow-hidden min-h-[460px]">
            {/* ================= TAB 1: INSTANT SEARCH & EXPLORER ================= */}
            {activeTab === "explorer" && (
              <div className="space-y-0 animate-in fade-in duration-200">
                {/* Live Interactive Filter Bar */}
                <div className="p-3.5 bg-[#001225] border-b border-[#132a4a] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-64 sm:w-80">
                      <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Type to filter contracts (e.g. Healthcare, Canada, Orion)..."
                        value={mockSearch}
                        onChange={(e) => setMockSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-none bg-[#051329] border border-[#132a4a] text-xs text-white placeholder-zinc-500 font-sans focus:outline-none focus:border-[#1e6aff]"
                      />
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping" />
                      14.2ms Instant Response
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#091b36] border border-[#142b4d] rounded-none p-0.5 text-[11px] font-mono">
                      <button
                        onClick={() => setMockDensity("compact")}
                        className={`px-2 py-0.5 rounded-none transition-colors ${
                          mockDensity === "compact"
                            ? "bg-[#1e6aff] text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Compact
                      </button>
                      <button
                        onClick={() => setMockDensity("normal")}
                        className={`px-2 py-0.5 rounded-none transition-colors ${
                          mockDensity === "normal"
                            ? "bg-[#1e6aff] text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Spacious
                      </button>
                    </div>

                    <Link
                      href="/explorer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-none btn-render-primary text-white text-xs font-medium transition-colors"
                    >
                      <span>Open 100k Dataset</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                      <tr>
                        <th className="px-4 py-3">Contract Code</th>
                        <th className="px-4 py-3 font-sans">Deal Title</th>
                        <th className="px-4 py-3 font-sans">Client Company</th>
                        <th className="px-4 py-3 font-sans">Industry</th>
                        <th className="px-4 py-3 font-sans">Status</th>
                        <th className="px-4 py-3 font-sans">Region</th>
                        <th className="px-4 py-3">Revenue (USD)</th>
                        <th className="px-4 py-3">Net Profit</th>
                        <th className="px-4 py-3 font-sans">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                      {filteredMockRows.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-zinc-500 font-sans">
                            No deals match &quot;{mockSearch}&quot;. Try typing &quot;Healthcare&quot;, &quot;Canada&quot;, or &quot;Orion&quot;.
                          </td>
                        </tr>
                      ) : (
                        filteredMockRows.map((row) => (
                          <tr
                            key={row.id}
                            className={`hover:bg-[#071529] transition-colors cursor-pointer ${
                              mockDensity === "compact" ? "py-2" : "py-3.5"
                            }`}
                          >
                            <td className="px-4 py-3 text-[#38bdf8] font-bold">{row.id}</td>
                            <td className="px-4 py-3 font-sans text-white font-medium">
                              {row.title}
                            </td>
                            <td className="px-4 py-3 font-sans text-zinc-300">{row.company}</td>
                            <td className="px-4 py-3 font-sans">
                              <span className="px-2 py-0.5 rounded-none bg-zinc-800 text-zinc-300 text-[10px]">
                                {row.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-sans">
                              <span
                                className={`px-2 py-0.5 rounded-none border text-[10px] ${
                                  row.status === "Active"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                                    : "bg-sky-500/10 text-sky-400 border-sky-500/25"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-sans text-zinc-400">{row.country}</td>
                            <td className="px-4 py-3 text-white font-semibold">{row.revenue}</td>
                            <td className="px-4 py-3 text-emerald-400 font-semibold">{row.profit}</td>
                            <td className="px-4 py-3 font-sans">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-none ${
                                row.priority === "Urgent" ? "text-rose-400 bg-rose-500/10" : "text-[#38bdf8] bg-[#1e6aff]/15"
                              }`}>
                                {row.priority}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 bg-[#001225] border-t border-[#132a4a] flex flex-wrap items-center justify-between text-xs text-zinc-400 font-sans">
                  <span>
                    💡 <strong>Pro Tip:</strong> Click any record in the live app to slide open its full audit drawer, company background, and deal timeline.
                  </span>
                  <Link href="/explorer" className="text-[#38bdf8] hover:text-white font-medium">
                    Try it with 100,000 real rows &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* ================= TAB 2: VISUAL QUERY BUILDER ================= */}
            {activeTab === "queryBuilder" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#132a4a] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#38bdf8]" />
                      <span>Visual Predicate Query Builder</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                      Build sophisticated multi-condition business logic with simple point-and-click dropdowns. Zero SQL required.
                    </p>
                  </div>
                  <span className="genesis-badge">
                    Business Friendly
                  </span>
                </div>

                {/* Point and click filter visual rows */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-none bg-[#071529] border border-[#132a4a] flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-none bg-[#1e6aff]/25 text-[#38bdf8] font-bold font-mono">
                      WHERE
                    </span>
                    <span className="text-white font-medium">Deal Status</span>
                    <span className="text-zinc-500">is exactly</span>
                    <span className="px-2 py-0.5 rounded-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#071529] border border-[#132a4a] flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-none bg-[#091b36] text-[#38bdf8] font-bold font-mono border border-[#142b4d]">
                      AND
                    </span>
                    <span className="text-white font-medium">Contract Revenue</span>
                    <span className="text-zinc-500">is greater than or equal to</span>
                    <span className="px-2 py-0.5 rounded-none bg-zinc-800 text-white font-mono font-semibold">
                      $50,000.00
                    </span>
                  </div>

                  <div className="p-3.5 rounded-none bg-[#071529] border border-[#132a4a] flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-none bg-[#091b36] text-[#38bdf8] font-bold font-mono border border-[#142b4d]">
                      AND
                    </span>
                    <span className="text-white font-medium">Geographic Region</span>
                    <span className="text-zinc-500">is in</span>
                    <span className="px-2 py-0.5 rounded-none bg-[#1e6aff]/15 text-[#38bdf8] border border-[#1e6aff]/30 font-semibold">
                      Canada, Germany, Netherlands
                    </span>
                  </div>
                </div>

                {/* Visual benefit callout */}
                <div className="p-4 rounded-none bg-[#071529] border border-[#1e6aff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant Results (1,240 Matching Contracts Found in 11.4ms)</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      Any member of your sales, finance, or executive team can create these filters in under 10 seconds.
                    </p>
                  </div>

                  <Link
                    href="/search"
                    className="px-4 py-2 rounded-none btn-render-primary text-white text-xs font-medium transition-colors shrink-0"
                  >
                    Launch Visual Query Builder
                  </Link>
                </div>
              </div>
            )}

            {/* ================= TAB 3: AI COPILOT ================= */}
            {activeTab === "aiCopilot" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#132a4a] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                      <span>AI Natural Language Search Assistant</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                      Ask business questions in normal, plain English. DataScope automatically translates your question into precise, validated data filters.
                    </p>
                  </div>
                  <span className="genesis-badge">
                    AI-Powered
                  </span>
                </div>

                {/* Plain english input sample */}
                <div className="space-y-2">
                  <label className="text-xs text-zinc-400 font-medium">You type in plain English:</label>
                  <div className="p-3.5 rounded-none bg-[#071529] border border-[#132a4a] text-white text-xs font-sans">
                    &quot;Show me all active enterprise contracts in Canada or Germany with net profit over $80,000&quot;
                  </div>
                </div>

                {/* Translation Result */}
                <div className="p-4 rounded-none bg-[#001225] border border-[#1e6aff]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>AI Understood & Applied 4 Verified Filters Automatically</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">Response time: 0.2s</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-[#091b36] border border-[#142b4d] text-zinc-200">
                      Status: <strong>Active</strong>
                    </span>
                    <span className="px-2.5 py-1 bg-[#091b36] border border-[#142b4d] text-zinc-200">
                      Countries: <strong>Canada, Germany</strong>
                    </span>
                    <span className="px-2.5 py-1 bg-[#091b36] border border-[#142b4d] text-zinc-200">
                      Category: <strong>Enterprise</strong>
                    </span>
                    <span className="px-2.5 py-1 bg-[#091b36] border border-[#142b4d] text-emerald-400">
                      Min Profit: <strong>&gt; $80,000</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: SAVED VIEWS & COLLABORATION ================= */}
            {activeTab === "collaboration" && (
              <div className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#132a4a] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <BookmarkCheck className="w-4 h-4 text-[#38bdf8]" />
                      <span>Team Saved Views & Live URL Sharing</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                      Never rebuild a filter twice. Save complex views for weekly standups, share links across departments, and export with one click.
                    </p>
                  </div>
                  <span className="genesis-badge">
                    Team Productivity
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-none bg-[#071529] border border-[#132a4a] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Q4 High-Margin EMEA</span>
                      <span className="text-[10px] font-mono text-emerald-400">🌐 Shared</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      Filtered by 4 European territories with profit &gt; $100k. Used weekly by Sales Leadership.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#38bdf8]">
                      <span>420 matching deals</span>
                      <span className="underline">Apply View &rarr;</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-none bg-[#071529] border border-[#132a4a] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Pending Executive Review</span>
                      <span className="text-[10px] font-mono text-sky-400">🔒 Finance Only</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      Deals flagged with pending regulatory review or missing tax clearances.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#38bdf8]">
                      <span>38 flagged deals</span>
                      <span className="underline">Apply View &rarr;</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-none bg-[#071529] border border-[#132a4a] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Top Tier-1 Tech Accounts</span>
                      <span className="text-[10px] font-mono text-[#38bdf8]">🌐 Shared</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      Enterprise technology contracts generating &gt; $500,000 annual recurring revenue.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#38bdf8]">
                      <span>180 accounts</span>
                      <span className="underline">Apply View &rarr;</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-none bg-[#001225] border border-[#132a4a] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-zinc-300">
                      URL synchronizes with your active filters. Copy and send the link on Slack or email—your colleague sees the exact same data slice.
                    </span>
                  </div>
                  <Link href="/saved-views" className="px-3.5 py-1.5 rounded-none btn-render-primary text-white font-medium text-xs">
                    Explore Saved Views
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            4. WHO BENEFITS: 3 CORE ENTERPRISE PERSONAS
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Tailored For Enterprise Roles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Designed For High-Performance Cross-Functional Teams
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans">
              From business leaders reviewing margins to operational analysts verifying contract terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Persona 1: Executive Leadership */}
            <div className="p-6 rounded-none genesis-card space-y-4">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#ffffff]">
                Executive Leadership (CFO, CDO, COO)
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Get an instant bird&apos;s-eye view of enterprise revenues, net margins, and operational deal health without waiting for analysts to assemble weekly spreadsheets.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time portfolio revenue aggregates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Permanent compliance audit history</span>
                </li>
              </ul>
            </div>

            {/* Persona 2: Revenue Operations & Sales Leaders */}
            <div className="p-6 rounded-none genesis-card space-y-4">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#ffffff]">
                Revenue Operations & Deal Desks
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Track enterprise contract pipelines, filter accounts by geography and deal priority, and pinpoint margin discrepancies before quarter-end.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Instant contract lookup by title or client code</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>One-click status updates with audit stamps</span>
                </li>
              </ul>
            </div>

            {/* Persona 3: Data Analysts & Operations */}
            <div className="p-6 rounded-none genesis-card space-y-4">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#ffffff]">
                Data & Business Analysts
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Slice and dice 100k+ records without writing boilerplate SQL. Create custom views, export clean data subsets to CSV, and share findings with stakeholders.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Multi-column sorting and column customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fast, streaming CSV exports without crashes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. CORE TANGIBLE BENEFITS (Why Companies Adopt DataScope)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-semibold">
              The DataScope Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Six Key Benefits For Modern Enterprises
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Sub-Second Speed at Scale
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Search, sort, and slice through 100,000+ contracts in less than 20 milliseconds. No waiting for loading spinners or spinning wheels.
              </p>
            </div>

            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Zero Engineering Dependency
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Business users can build intricate multi-variable queries and filters independently. Free up engineering teams to focus on core product features.
              </p>
            </div>

            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Role-Based Governance (RBAC)
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Keep sensitive financial data secure. Control exactly who can view, mutate, approve, or export records across your entire organization.
              </p>
            </div>

            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                100% Immutable Audit Trail
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Every single record update is captured with the user identity, timestamp, and previous values—ensuring total audit compliance.
              </p>
            </div>

            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8]">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Frictionless Team Sharing
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Save team views and share bookmarked URLs instantly. Team members open the exact same filtered dataset without emailing CSV attachments.
              </p>
            </div>

            <div className="p-6 rounded-none genesis-card space-y-3">
              <div className="w-10 h-10 rounded-none bg-[#001225] border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Clean Streaming CSV Export
              </h3>
              <p className="text-xs text-[#878787] leading-relaxed font-sans">
                Export filtered segments directly to CSV with one click. Ideal for offline audits, executive slide presentations, and board reporting.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FREQUENTLY ASKED QUESTIONS (Business & Workflow Centric)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-semibold">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "What exact purpose does DataScope fulfill for an enterprise?",
                a: "DataScope serves as a centralized, lightning-fast data exploration hub. When companies have tens of thousands of revenue contracts, invoices, or customer accounts, traditional tools like Excel crash and slow down. DataScope lets any business user search, filter, and analyze 100,000+ records in under 20ms without needing engineering assistance.",
              },
              {
                q: "Do non-technical team members need to know SQL or code?",
                a: "Not at all. DataScope was built specifically so business users can apply multi-condition filters using simple dropdowns, or even ask questions in plain English using the built-in AI assistant. Everything is point-and-click.",
              },
              {
                q: "How does DataScope replace traditional Excel or Google Sheets?",
                a: "Instead of emailing stale, unverified CSV files that crash on 50k rows, DataScope provides a single, live, shared source of truth. Multiple team members can access 100,000+ records simultaneously, customize their columns, save shared views, and see real-time updates.",
              },
              {
                q: "How does role-based access control (RBAC) protect sensitive revenue data?",
                a: "DataScope enforces three distinct permission levels: Administrators have full control over data and maintenance; Data Analysts can query, filter, and export; and Viewers can only explore and read without ability to edit or export confidential records.",
              },
              {
                q: "Can I export filtered datasets to CSV or external tools?",
                a: "Yes. Once you apply your search and filters, you can export either the entire filtered dataset or only selected rows with a single click.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-none bg-[#051329] border border-[#132a4a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-[#07172e] transition-colors"
                >
                  <span className="font-sans">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openFaq === index ? "rotate-180 text-[#38bdf8]" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-xs text-[#878787] leading-relaxed font-sans border-t border-[#132a4a] bg-[#001225]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. FINAL CTA BANNER
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-none genesis-card space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1e6aff]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#002b5c]/25 blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-bold text-[#ffffff] tracking-tight relative z-10">
              Transform How Your Team Explores Enterprise Data
            </h2>
            <p className="text-xs sm:text-sm text-[#878787] max-w-xl mx-auto relative z-10 font-sans">
              Experience instant sub-second search, visual point-and-click filtering, and audit-ready governance across 100,000 business contracts right now.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
              <Link
                href="/explorer"
                className="px-6 py-3.5 rounded-none btn-render-primary text-xs font-semibold flex items-center gap-2 group shadow-lg shadow-[#1e6aff]/25 text-white"
              >
                <span>Launch Live Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="px-6 py-3.5 rounded-none btn-render-secondary text-xs font-semibold"
              >
                Provision Free Demo Account
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
