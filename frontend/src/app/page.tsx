"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import MotionHeroShowcase from "@/components/home/MotionHeroShowcase";
import FluidWaveCanvas from "@/components/home/FluidWaveCanvas";
import QuantumScannerHero from "@/components/home/QuantumScannerHero";
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
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Server,
  Network,
  Maximize2,
  Filter,
} from "lucide-react";

export default function LandingPage() {
  // Kinetic Problem Text cycling (Genesis 00:29 - 00:36)
  const kineticProblems = [
    "Scattered data chaos.",
    "Delayed legacy reports.",
    "Wasted overhead cost.",
  ];
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblemIdx((prev) => (prev + 1) % kineticProblems.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [kineticProblems.length]);

  // Interactive CAD Process Ruler State (Genesis 00:44 - 00:48)
  const [activeProcessWeek, setActiveProcessWeek] = useState(1);

  // Interactive Product Showcase State (4 Core Workflows)
  const [activeTab, setActiveTab] = useState<
    "explorer" | "queryBuilder" | "aiCopilot" | "collaboration"
  >("explorer");

  // Mock search query in Interactive Explorer
  const [mockSearch, setMockSearch] = useState("");
  const [mockDensity, setMockDensity] = useState<"compact" | "normal">("compact");

  // Interactive FAQ Toggle state (Genesis 00:105 - 00:113)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    <div className="min-h-screen bg-[#001225] text-[#ffffff] flex flex-col selection:bg-[#1e6aff]/40 selection:text-[#38bdf8] relative overflow-hidden font-sans">
      {/* Blueprint Background Grid Lines (Genesis Signature Architecture) */}
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
        <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-[#132a4a]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-[#132a4a] h-full" />
          ))}
        </div>
      </div>

      {/* Public Navigation Header */}
      <PublicHeader />

      {/* Main Content */}
      <main className="flex-1 space-y-28 pb-24 relative z-10">
        {/* =========================================================================
            HERO SECTION: QUANTUM SCANNER & DISSOLVE ENGINE (DISTILL × THREE.JS × INTELLIGENCE)
            ========================================================================= */}
        <QuantumScannerHero />

        {/* =========================================================================
            SECTION [01 - INTRO]: ARCHITECTURAL INTRO & STEPPED STAIRCASE (00:10 - 00:26)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-10">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [01 - INTRO] // ENTERPRISE DATA ARCHITECTURE
            </span>
            <span className="font-mono text-xs text-zinc-500">REDUCED TIME-TO-INSIGHT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Video / Interactive Demo Screen Card */}
            <div className="lg:col-span-5 p-6 rounded-none bg-[#051329] border border-[#132a4a] flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <span className="absolute top-2 left-2 text-[9px] font-mono text-[#38bdf8]">⌜ 01.A</span>
              <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#38bdf8]">01.B ⌟</span>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#38bdf8] px-2 py-0.5 rounded-none bg-[#1e6aff]/15 border border-[#1e6aff]/30">
                    LIVE SYSTEM SIMULATION
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    14.2ms
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                  Interactive Inverted GIN Indexing & Query Pipeline
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Experience sub-20ms multi-variable lookups across 100,000 active business deals in real time.
                </p>
              </div>

              {/* Simulation Preview Window */}
              <div className="p-4 rounded-none bg-[#000a17] border border-[#132a4a] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                  <span>QUERY EXECUTION TIME</span>
                  <span className="text-emerald-400 font-bold">14.5ms</span>
                </div>
                <div className="text-[#38bdf8] truncate">
                  SELECT * FROM contracts WHERE trigram(title) &gt; 0.3 AND rev &gt; $50k
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#132a4a] text-[11px]">
                  <span className="text-zinc-400">PGBouncer Pool Check:</span>
                  <span className="text-white">Active (0.8ms)</span>
                </div>
              </div>

              <Link
                href="/explorer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-none btn-render-primary text-white text-xs font-semibold"
              >
                <Play className="w-3.5 h-3.5 text-[#38bdf8] fill-current" />
                <span>Open Full Interactive Engine</span>
              </Link>
            </div>

            {/* Right: Architectural Philosophy & "Let's Talk" */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 p-6 rounded-none bg-[#071529] border border-[#132a4a]">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-sans">
                  We engineer unified data architectures that transform scattered information into predictive enterprise assets.
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  By fusing advanced indexing with deep visual analytics, we build the intelligence engines that drive multi-million dollar growth and accelerate market velocity across 100,000+ live contracts.
                </p>
                <div className="p-4 rounded-none bg-[#051329] border-l-2 border-[#1e6aff] text-xs text-zinc-400 font-sans leading-relaxed">
                  No legacy reporting. No useless dashboards. Just clean, AI-powered foresight built to scale your competitive edge without waiting for engineers to write SQL.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/explorer"
                  className="px-6 py-3 rounded-none bg-white text-[#001225] font-bold text-xs hover:bg-[#38bdf8] transition-colors"
                >
                  Let&apos;s Talk
                </Link>
                <Link
                  href="/features"
                  className="px-6 py-3 rounded-none btn-render-secondary text-xs text-zinc-300 hover:text-white"
                >
                  View Architectural Blueprints
                </Link>
              </div>
            </div>
          </div>

          {/* Stepped / Cascading Metric Staircase (Genesis 00:26) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end pt-4">
            <div className="p-6 rounded-none bg-[#051329] border border-[#132a4a] space-y-2 h-40 flex flex-col justify-end">
              <div className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight">
                $50M+
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Client revenue impact delivered.
              </div>
            </div>

            <div className="p-6 rounded-none bg-[#051329] border border-[#132a4a] space-y-2 h-48 flex flex-col justify-end border-t-2 border-t-[#1e6aff]">
              <div className="text-3xl sm:text-5xl font-black font-mono text-[#38bdf8] tracking-tight">
                87%
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Faster strategic decision speed.
              </div>
            </div>

            <div className="p-6 rounded-none bg-[#051329] border border-[#132a4a] space-y-2 h-56 flex flex-col justify-end border-t-2 border-t-[#38bdf8]">
              <div className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight">
                20+
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Sources unified into one system.
              </div>
            </div>

            <div className="p-6 rounded-none bg-[#051329] border border-[#132a4a] space-y-2 h-64 flex flex-col justify-end border-t-2 border-t-emerald-400">
              <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                100%
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                Automated predictive accuracy.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [02 - PROBLEM]: KINETIC TEXT & COMPARISON MATRIX (00:29 - 00:36)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-12">
          {/* Kinetic Morphing Headline */}
          <div className="p-12 rounded-none bg-[#000a17] border border-[#132a4a] text-center space-y-4 relative overflow-hidden">
            <span className="font-mono text-xs text-rose-400 tracking-widest uppercase block">
              [02 - PROBLEM] // THE BOTTLENECK YOU FACE TODAY
            </span>

            <div className="h-20 flex items-center justify-center">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans transition-all duration-300">
                {kineticProblems[currentProblemIdx]}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans">
              Traditional spreadsheets were never designed to handle 50,000+ complex revenue rows. Here is why enterprise teams replace them with DataScope.
            </p>
          </div>

          {/* Architectural Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-8 rounded-none bg-[#11090c] border border-rose-500/30 space-y-6 relative">
              <span className="absolute top-2 left-2 text-[9px] font-mono text-rose-400">LEGACY TOOLS</span>
              <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold font-mono">
                <ShieldAlert className="w-4 h-4" />
                <span>The Traditional Problem (Excel & Clunky CSVs)</span>
              </div>
              <ul className="space-y-4 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Browser & App Crashes:</strong> Excel or Google Sheets freezes and crashes whenever your dataset reaches 50,000+ customer records or invoices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Engineering Bottlenecks:</strong> Business users have to wait days for data engineers to write SQL queries just to answer a simple quarterly question.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Outdated Versions:</strong> Team members circulate conflicting CSV files over email and Slack, resulting in decision-making based on stale data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>Zero Compliance or Audit Log:</strong> Anyone can accidentally overwrite a multi-million-dollar figure with no record of who changed what or when.</span>
                </li>
              </ul>
            </div>

            {/* The DataScope Solution */}
            <div className="p-8 rounded-none bg-[#051329] border border-emerald-500/30 space-y-6 relative">
              <span className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400">DATASCOPE BLUEPRINT</span>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>The DataScope Solution (Modern Data Intelligence)</span>
              </div>
              <ul className="space-y-4 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Zero-Lag Virtualized Tables:</strong> Smoothly scroll through 100,000+ records at a locked 60 FPS without your browser using more than a few megabytes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>Self-Serve Point-and-Click:</strong> Non-technical business users can filter, slice, and cross-reference data in seconds without writing a line of SQL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>One Shared Source of Truth:</strong> Save custom views, share bookmarked URLs, and ensure everyone looks at identical live database records.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span><strong>100% Immutable Audit History:</strong> Every status update, approval, and modification is permanently logged with user ID, timestamp, and previous state.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [03 - ETHOS]: 6 ARCHITECTURAL CAPABILITY TILES (00:36 - 00:43)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [03 - ETHOS] // ARCHITECTURAL CAPABILITIES
            </span>
            <span className="font-mono text-xs text-zinc-500">6 CORE SYSTEMS</span>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Building systems for enterprise scale.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
              Precision modules designed to eliminate fragmented operational silos and unlock instant decision velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "CAP-01",
                title: "Predictive modeling for modern enterprise",
                desc: "We deploy custom AI architectures that forecast market trends, margin swings, and cohort health.",
                icon: Zap,
                accent: "#1e6aff",
              },
              {
                id: "CAP-02",
                title: "Breaking down complex operational silos",
                desc: "We connect scattered data sources into a single, high-performance source of truth without duplication.",
                icon: Database,
                accent: "#38bdf8",
              },
              {
                id: "CAP-03",
                title: "Uncovering hidden enterprise revenue",
                desc: "We track the entire contract lifecycle to reveal where profit leaks and identify high-margin accounts.",
                icon: TrendingUp,
                accent: "#10b981",
              },
              {
                id: "CAP-04",
                title: "Replacing manual logs with automation",
                desc: "We build systems that process millions of points instantly with complete immutable audit stamps.",
                icon: Clock,
                accent: "#38bdf8",
              },
              {
                id: "CAP-05",
                title: "Evaluating your current data systems",
                desc: "We analyze database infrastructure to eliminate heavy overhead costs and slow query locks.",
                icon: Server,
                accent: "#1e6aff",
              },
              {
                id: "CAP-06",
                title: "Optimizing processing speed at scale",
                desc: "Inverted GIN trigram indexes and virtualized DOM tables guarantee sub-20ms rendering at 60 FPS.",
                icon: Cpu,
                accent: "#10b981",
              },
            ].map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="p-6 rounded-none bg-[#051329] border border-[#132a4a] hover:border-[#1e6aff] transition-all space-y-4 relative group"
                >
                  <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-500">{cap.id}</span>
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-[#38bdf8]">⌜ ⌝</span>

                  <div className="w-10 h-10 rounded-none bg-[#001225] border border-[#1e6aff]/40 flex items-center justify-center text-[#38bdf8] group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white font-sans">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {cap.desc}
                  </p>

                  <div className="pt-2 border-t border-[#132a4a] flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                    <Link href="/features" className="hover:text-white transition-colors flex items-center gap-1">
                      <span>Let&apos;s Talk</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Motion Hero Showcase Embedded */}
          <div className="pt-8">
            <MotionHeroShowcase />
          </div>
        </section>

        {/* =========================================================================
            SECTION [04 - PROCESS]: THE PRECISION CAD MEASUREMENT RULER (00:44 - 00:48)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [04 - PROCESS] // FROM DEPLOYMENT TO DATA INTELLIGENCE
            </span>
            <span className="font-mono text-xs text-zinc-500">4-WEEK ROADMAP</span>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              From deployment to data intelligence.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl font-sans">
              Our structured implementation framework moves your enterprise from scattered spreadsheets to sub-second answers in 4 weeks.
            </p>
          </div>

          {/* The CAD Precision Ruler */}
          <div className="p-6 rounded-none bg-[#051329] border border-[#132a4a] space-y-6">
            <div className="relative py-4 border-b border-[#132a4a]">
              {/* Ruler Tick Marks */}
              <div className="flex justify-between items-end h-8 px-2">
                {Array.from({ length: 41 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[1px] transition-colors ${
                      i % 10 === 0
                        ? "h-8 bg-[#38bdf8]"
                        : i % 5 === 0
                        ? "h-5 bg-zinc-600"
                        : "h-3 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>

              {/* Week Markers */}
              <div className="grid grid-cols-4 text-xs font-mono pt-3">
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    onClick={() => setActiveProcessWeek(w)}
                    className={`text-left font-bold transition-colors ${
                      activeProcessWeek === w
                        ? "text-[#38bdf8]"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    Week 0{w}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Stage Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              <div className={`p-4 rounded-none border transition-colors ${activeProcessWeek === 1 ? "bg-[#091b36] border-[#1e6aff]" : "bg-[#071529] border-[#132a4a]"}`}>
                <div className="text-xs font-mono text-[#38bdf8] mb-1 font-bold">STAGE 01</div>
                <h4 className="text-sm font-bold text-white mb-2">Audit &amp; Align</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We analyze your existing data pipelines to map leaks, identify unindexed queries, and quantify immediate high-ROI automation wins.
                </p>
              </div>

              <div className={`p-4 rounded-none border transition-colors ${activeProcessWeek === 2 ? "bg-[#091b36] border-[#1e6aff]" : "bg-[#071529] border-[#132a4a]"}`}>
                <div className="text-xs font-mono text-[#38bdf8] mb-1 font-bold">STAGE 02</div>
                <h4 className="text-sm font-bold text-white mb-2">Core Framework</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We connect your scattered data platforms into a single, high-performance PostgreSQL 16 &amp; GIN trigram source of enterprise truth.
                </p>
              </div>

              <div className={`p-4 rounded-none border transition-colors ${activeProcessWeek === 3 ? "bg-[#091b36] border-[#1e6aff]" : "bg-[#071529] border-[#1e6aff]"}`}>
                <div className="text-xs font-mono text-[#38bdf8] mb-1 font-bold">STAGE 03</div>
                <h4 className="text-sm font-bold text-white mb-2">Deploy AI Models</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We integrate custom Whisper voice and natural language semantic intelligence to automate decision speeds and forecast market trends.
                </p>
              </div>

              <div className={`p-4 rounded-none border transition-colors ${activeProcessWeek === 4 ? "bg-[#091b36] border-[#1e6aff]" : "bg-[#071529] border-[#1e6aff]"}`}>
                <div className="text-xs font-mono text-[#38bdf8] mb-1 font-bold">STAGE 04</div>
                <h4 className="text-sm font-bold text-white mb-2">Scale &amp; Optimize</h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We deliver lightning-fast analytics tracking that maintains locked sub-20ms performance across 100,000+ contracts.
                </p>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="p-5 rounded-none bg-[#071529] border border-[#1e6aff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                  <span>Ready to modernize? Stop guessing.</span>
                </span>
                <p className="text-xs text-zinc-400 font-sans">
                  We build high-performance data architectures that accelerate your decision speed and cut through operational noise.
                </p>
              </div>

              <Link
                href="/explorer"
                className="px-5 py-2.5 rounded-none btn-render-primary text-white text-xs font-semibold shrink-0"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [05 - FRAMEWORKS & INTEGRATIONS]: 4x3 ECOSYSTEM GRID (00:49 - 00:53)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [05 - FRAMEWORKS &amp; INTEGRATIONS] // ECOSYSTEM
            </span>
            <span className="font-mono text-xs text-zinc-500">12 CORE STACKS</span>
          </div>

          <div className="p-8 sm:p-12 rounded-none bg-[#000a17] border border-[#132a4a] relative space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase tracking-tight">
                Unifying your data ecosystem.
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Native integrations connecting your existing infrastructure into sub-second data pipelines.
              </p>
            </div>

            {/* 12 Interactive Framework Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "POSTGRESQL 16", role: "Primary Relational Core", tag: "DB" },
                { name: "PG_TRGM GIN", role: "Sub-18ms Text Search", tag: "INDEX" },
                { name: "NEXT.JS 15", role: "Client App Router", tag: "UI" },
                { name: "REDUX TOOLKIT", role: "Deterministic State", tag: "STORE" },
                { name: "REDIS CACHE", role: "Sub-Millisecond Keys", tag: "CACHE" },
                { name: "DUCKDB ENGINE", role: "Fast Vector Ingestion", tag: "OLAP" },
                { name: "OPENAI WHISPER", role: "Voice Query Decoding", tag: "AI" },
                { name: "APACHE ARROW", role: "Columnar Serialization", tag: "PERF" },
                { name: "TYPESCRIPT 5", role: "Strict Compile Safety", tag: "LANG" },
                { name: "TAILWIND CSS V4", role: "Architectural Theme", tag: "CSS" },
                { name: "DOCKER PROD", role: "Isolated Microservices", tag: "OPS" },
                { name: "SOC-2 CERTIFIED", role: "Enterprise Governance", tag: "SEC" },
              ].map((fw) => (
                <div
                  key={fw.name}
                  className="p-4 rounded-none bg-[#051329] border border-[#132a4a] hover:border-[#1e6aff] hover:bg-[#071529] transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#38bdf8] px-1.5 py-0.5 rounded-none bg-[#1e6aff]/10 border border-[#1e6aff]/20">
                      {fw.tag}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600 group-hover:text-emerald-400 transition-colors">
                      ACTIVE
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                    {fw.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-sans">
                    {fw.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [06 - FEATURED REVIEWS]: TESTIMONIAL & OUTCOMES (00:54 - 00:59)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [06 - FEATURED REVIEWS] // ENTERPRISE PROOF
            </span>
            <span className="font-mono text-xs text-zinc-500">TESTIMONIALS</span>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              What enterprise leaders say about us.
            </h2>
          </div>

          {/* Large Editorial Quote Card */}
          <div className="p-8 sm:p-12 rounded-none bg-[#051329] border border-[#132a4a] space-y-6 relative">
            <span className="text-5xl text-[#38bdf8] font-serif leading-none select-none">“</span>
            <blockquote className="text-lg sm:text-2xl text-white font-medium leading-relaxed font-sans">
              DataScope completely transformed our data infrastructure. Their AI models and sub-20ms queries connected easily with our legacy systems and gave our leadership team instant clarity within days. We eliminated tracking delays and finally unlocked high-speed performance monitoring at a massive scale when our previous vendor failed us completely.
            </blockquote>
            <div className="flex items-center justify-between border-t border-[#132a4a] pt-4 text-xs font-mono">
              <div>
                <span className="text-white font-bold">Marcus Sterling</span> — VP of Revenue Operations, FinEdge Global
              </div>
              <span className="text-emerald-400">VERIFIED ENTERPRISE CLIENT</span>
            </div>
          </div>

          {/* 4 Outcome Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">40% Less</div>
              <div className="text-xs text-zinc-400 font-sans">Churn &amp; Missing Renewals</div>
            </div>
            <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#38bdf8]">100,000+</div>
              <div className="text-xs text-zinc-400 font-sans">Contracts Handled at 60 FPS</div>
            </div>
            <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">$200K</div>
              <div className="text-xs text-zinc-400 font-sans">Engineering Overhead Saved</div>
            </div>
            <div className="p-5 rounded-none bg-[#051329] border border-[#132a4a] space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">87%</div>
              <div className="text-xs text-zinc-400 font-sans">Faster Decision Speed</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [07 - ENGAGEMENT MODELS]: 3 PRICING TIERS (01:00 - 01:04)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [07 - ENGAGEMENT MODELS] // PRICING
            </span>
            <span className="font-mono text-xs text-zinc-500">TRANSPARENT PLANS</span>
          </div>

          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Transparent plans tailored for growth.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Deploy in your cloud or use our fully-managed dedicated enterprise cluster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Plan 1 */}
            <div className="p-8 rounded-none bg-[#051329] border border-[#132a4a] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  TIER 01
                </span>
                <h3 className="text-xl font-bold text-white">Core Audit</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Perfect for growing businesses needing unified baseline metrics and fewer disconnected data silos across teams.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-black font-mono text-white">$1,600</span>
                  <span className="text-xs text-zinc-400 font-mono"> / starting</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Data infrastructure audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Core system unification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2 connected data sources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Basic tracking framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Monthly strategy review</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full flex items-center justify-center py-3 rounded-none btn-render-secondary text-xs font-semibold text-white"
              >
                Activate Plan
              </Link>
            </div>

            {/* Plan 2: Featured */}
            <div className="p-8 rounded-none bg-[#071529] border-2 border-[#1e6aff] space-y-6 flex flex-col justify-between shadow-2xl shadow-[#1e6aff]/20 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-none bg-[#1e6aff] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                MOST POPULAR
              </span>
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider block">
                  TIER 02 // RECOMMENDED
                </span>
                <h3 className="text-xl font-bold text-white">Intelligence Partner</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Our flagship model deploying advanced predictive AI models to completely automate your data decision speeds.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-black font-mono text-[#38bdf8]">$4,500</span>
                  <span className="text-xs text-zinc-400 font-mono"> / month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Everything in Core Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Predictive AI integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>10+ connected pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time anomaly alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Weekly performance growth</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/explorer"
                className="w-full flex items-center justify-center py-3 rounded-none btn-render-primary text-white text-xs font-semibold"
              >
                Activate Plan
              </Link>
            </div>

            {/* Plan 3 */}
            <div className="p-8 rounded-none bg-[#051329] border border-[#132a4a] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  TIER 03
                </span>
                <h3 className="text-xl font-bold text-white">Custom Engine</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Built for large-scale global networks requiring dedicated infrastructure, custom LLMs, and compliance.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-black font-mono text-white">$12,000</span>
                  <span className="text-xs text-zinc-400 font-mono"> / starting</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300 font-sans border-t border-[#132a4a] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unlimited data pipelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Predictive churn modeling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dedicated systems expert</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>24/7 priority SLA support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full flex items-center justify-center py-3 rounded-none btn-render-secondary text-xs font-semibold text-white"
              >
                Activate Plan
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION [08 - FAQ]: PRECISION NUMBERED ACCORDION (01:05 - 01:13)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [08 - FAQ] // CLARIFICATIONS
            </span>
            <span className="font-mono text-xs text-zinc-500">7 ANSWERS</span>
          </div>

          <div className="text-left space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
              Clear answers to common queries.
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl">
            {[
              {
                id: "01",
                q: "How long does implementation take?",
                a: "A standard implementation takes 2 to 4 weeks. We connect directly with your existing PostgreSQL, Snowflake, or SQL databases and configure inverted GIN indexes without disrupting current operations.",
              },
              {
                id: "02",
                q: "Do you replace our current tools?",
                a: "DataScope replaces slow Excel exports and clunky spreadsheets for discovery, while sitting harmoniously alongside your existing core ERPs, CRMs, and data warehouses.",
              },
              {
                id: "03",
                q: "How secure is our revenue data with your AI?",
                a: "Completely private and enterprise-gated. We are SOC-2 Type II certified. Your data is never used to train public LLM models, and all semantic queries execute against private self-hosted or dedicated endpoints.",
              },
              {
                id: "04",
                q: "What industries do you specialize in?",
                a: "We power high-volume contract and revenue discovery for Healthcare, Fintech, Telecommunications, Cloud Infrastructure, and Global Supply Chains.",
              },
              {
                id: "05",
                q: "Is there a long-term commitment?",
                a: "No. Our Core Audit and Intelligence Partner tiers are offered on flexible month-to-month terms with straightforward cancellation policies.",
              },
              {
                id: "06",
                q: "What data sources can you connect?",
                a: "PostgreSQL, MySQL, Snowflake, BigQuery, DuckDB, Salesforce, and high-volume streaming CSV/Parquet data feeds.",
              },
              {
                id: "07",
                q: "How do we track the direct ROI?",
                a: "Through our built-in telemetry dashboard which tracks hours of engineering query time saved, reduction in data silos, and immediate recovery of leaked contract margins.",
              },
            ].map((faq, idx) => (
              <div
                key={faq.id}
                className="rounded-none bg-[#051329] border border-[#132a4a] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:bg-[#071529] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#38bdf8] font-bold">
                      {faq.id}
                    </span>
                    <span className="font-sans">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#38bdf8] transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-zinc-300 leading-relaxed font-sans border-t border-[#132a4a]/40 bg-[#001225]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION [09 - CONTACT]: LEAD CONSULTATION FORM (01:14 - 01:16)
            ========================================================================= */}
        <section className="px-4 w-[90%] mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#132a4a] pb-3">
            <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
              [09 - CONTACT] // GET STARTED
            </span>
            <span className="font-mono text-xs text-zinc-500">DIRECT CONSULTATION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Container */}
            <div className="lg:col-span-7 p-8 rounded-none bg-[#051329] border border-[#132a4a] space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-4xl font-black text-white font-sans">
                  Ready to automate your pipelines?
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Submit your details to receive an architectural data audit and private demo sandbox.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono space-y-2">
                  <div className="font-bold">REQUEST SUBMITTED SUCCESSFULLY</div>
                  <p className="text-zinc-300 font-sans">
                    Our lead architect will contact you within 2 business hours with your private sandbox credentials.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-xs font-mono"
                >
                  <div className="space-y-1.5">
                    <label className="text-zinc-400">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full p-3 rounded-none bg-[#001225] border border-[#132a4a] text-white focus:outline-none focus:border-[#1e6aff]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@enterprise.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full p-3 rounded-none bg-[#001225] border border-[#132a4a] text-white focus:outline-none focus:border-[#1e6aff]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400">TELL US ABOUT YOUR DATA INFRASTRUCTURE</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Current bottlenecks, 50k+ Excel sheet crashes, tools used, or automation goals..."
                      value={contactForm.notes}
                      onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                      className="w-full p-3 rounded-none bg-[#001225] border border-[#132a4a] text-white focus:outline-none focus:border-[#1e6aff]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-none btn-render-primary text-white font-bold tracking-wide transition-all shadow-lg shadow-[#1e6aff]/25"
                  >
                    Submit Request
                  </button>

                  <div className="text-[11px] text-zinc-500 font-sans text-center pt-2">
                    Your info is 100% safe with us. Read our Terms &amp; Privacy Policy.
                  </div>
                </form>
              )}
            </div>

            {/* Testimonial Callout Card */}
            <div className="lg:col-span-5 p-8 rounded-none bg-[#071529] border border-[#132a4a] space-y-6">
              <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block">
                ENDORSEMENT
              </span>
              <p className="text-sm text-zinc-200 italic font-sans leading-relaxed">
                &quot;DataScope delivered real-time analytics tracking and unified our scattered systems into a high-performance engine in weeks.&quot;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#132a4a]">
                <div className="w-10 h-10 rounded-none bg-[#1e6aff] text-white font-bold flex items-center justify-center font-mono">
                  DV
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-sans">David Vance</div>
                  <div className="text-[11px] text-zinc-400 font-mono">CTO, CloudScale Inc.</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#132a4a] space-y-2">
                <span className="text-xs font-mono text-[#38bdf8] block font-bold">
                  DIRECT ACTION
                </span>
                <Link
                  href="/explorer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-none btn-render-secondary text-xs text-white"
                >
                  <Database className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Explore Live Demo Sandbox</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
