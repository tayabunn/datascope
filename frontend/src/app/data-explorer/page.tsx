"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Database,
  Search,
  Filter,
  SlidersHorizontal,
  TableProperties,
  ArrowRight,
  Sparkles,
  Zap,
  Download,
  Eye,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function DataExplorerShowcasePage() {
  const [selectedDensity, setSelectedDensity] = useState<"compact" | "normal" | "spacious">("compact");
  const [activeTab, setActiveTab] = useState<"all" | "enterprise" | "finance" | "tech">("all");

  const sampleRecords = [
    {
      id: "REC-000001",
      title: "Enterprise Cloud Migration & Data Lake",
      company: "Apex Global Systems",
      category: "Enterprise",
      status: "Active",
      country: "Germany",
      revenue: "$348,200.00",
      profit: "+$87,050.00",
      owner: "Sarah Jenkins",
    },
    {
      id: "REC-000002",
      title: "Global AI Pipeline Licensing & Compute",
      company: "Vanguard Analytics",
      category: "Finance",
      status: "Pending",
      country: "United States",
      revenue: "$195,500.00",
      profit: "+$48,875.00",
      owner: "David Chen",
    },
    {
      id: "REC-000003",
      title: "Core Banking Infrastructure SLA",
      company: "Helios Capital AG",
      category: "Finance",
      status: "Active",
      country: "Switzerland",
      revenue: "$520,000.00",
      profit: "+$130,000.00",
      owner: "Marcus Vance",
    },
    {
      id: "REC-000004",
      title: "Kubernetes Cluster Fleet Management",
      company: "Nordic Tech Solutions",
      category: "Technology",
      status: "Active",
      country: "Sweden",
      revenue: "$112,400.00",
      profit: "+$33,720.00",
      owner: "Elena Rostova",
    },
    {
      id: "REC-000005",
      title: "Healthcare Compliance & HIPAA Storage",
      company: "BioHealth Diagnostics",
      category: "Enterprise",
      status: "Suspended",
      country: "United Kingdom",
      revenue: "$280,000.00",
      profit: "+$56,000.00",
      owner: "Liam Gallagher",
    },
  ];

  const filteredRecords =
    activeTab === "all"
      ? sampleRecords
      : sampleRecords.filter(
          (r) => r.category.toLowerCase() === activeTab.toLowerCase()
        );

  const capabilities = [
    {
      icon: Filter,
      title: "Multi-Predicate Faceted Filtering",
      description:
        "Combine Deal Status, Industry Categories, Origin Countries, and numeric Revenue intervals seamlessly. Every condition triggers sub-20ms SQL filtering without UI lockup.",
    },
    {
      icon: SlidersHorizontal,
      title: "Density Modes & Viewport Customization",
      description:
        "Switch between Compact (dense 32px rows for fast scanning), Normal (44px balanced), and Spacious (56px touch-friendly) layouts depending on your screen resolution.",
    },
    {
      icon: Eye,
      title: "Slide-Over Record Schema Inspector",
      description:
        "Click any record to inspect complete JSON schema payload attributes, financial breakdowns, historical timestamps, and user edit trails in a sliding drawer.",
    },
    {
      icon: TableProperties,
      title: "Dynamic Column Selector",
      description:
        "Toggle visibility across 11 enterprise fields including Deal Title, Company, Category, Status, Country, Revenue, Net Profit, Deal Owner, Created At, and Updated At.",
    },
    {
      icon: Download,
      title: "High-Throughput RFC 4180 CSV Export",
      description:
        "Stream tens of thousands of filtered records directly into standard CSV format with role-based access control guarding sensitive proprietary business assets.",
    },
    {
      icon: BookmarkCheck,
      title: "URL Search State & Saved View Presets",
      description:
        "Search keywords and filter selections persist directly in URL query parameters. Save custom presets to reload multi-faceted searches with a single click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1050px] h-[520px] bg-[#6c35f5]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed top-[450px] right-0 w-[480px] h-[480px] bg-[#ff8204]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Shared Navigation Header */}
      <PublicHeader />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-16 pb-14 px-6 max-w-6xl mx-auto text-center space-y-5">
          <div className="mistral-pill mb-2 shadow-sm inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8204] animate-pulse" />
            <span>Application Experience</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#fafaf4] tracking-tight leading-tight">
            High-Throughput Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#968dfa] via-[#6c35f5] to-[#ff8204]">
              Data Explorer
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
            Purpose-built to inspect, query, and dissect 100,000+ enterprise deals with instantaneous responsiveness, dynamic column virtualization, and sub-20ms database queries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Link
              href="/explorer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg btn-render-primary text-xs font-semibold group shadow-lg shadow-[#6c35f5]/25"
            >
              <Database className="w-4 h-4 text-[#b193e0]" />
              <span>Launch Live Data Explorer (100k Rows)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/features"
              className="flex items-center gap-2 px-5 py-3.5 rounded-lg btn-render-secondary text-xs font-semibold"
            >
              <Layers className="w-4 h-4 text-[#968dfa]" />
              <span>Review Platform Features</span>
            </Link>
          </div>
        </section>

        {/* Interactive Mock Table Preview with Controls */}
        <section className="py-8 px-6 max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Live Interactive Interface
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Intuitive, High-Density Grid Architecture
            </h2>
          </div>

          <div className="rounded-lg bg-[#0b0e17] border border-[#1d263b] shadow-2xl overflow-hidden">
            {/* Control Bar: Filter Tabs & Telemetry */}
            <div className="p-4 bg-[#0e121d] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-zinc-400 text-xs mr-2">
                  Dataset: <strong className="text-white">100,000 Records</strong>
                </span>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#141926] p-1 rounded-lg border border-[#202738]">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      activeTab === "all"
                        ? "bg-[#6c35f5] text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    All Deals
                  </button>
                  <button
                    onClick={() => setActiveTab("enterprise")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      activeTab === "enterprise"
                        ? "bg-[#6c35f5] text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Enterprise
                  </button>
                  <button
                    onClick={() => setActiveTab("finance")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      activeTab === "finance"
                        ? "bg-[#6c35f5] text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Finance
                  </button>
                  <button
                    onClick={() => setActiveTab("tech")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      activeTab === "tech"
                        ? "bg-[#6c35f5] text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Technology
                  </button>
                </div>

                {/* Telemetry Indicator */}
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  P95: 14.2ms
                </span>
              </div>

              {/* Density Switcher & Live Explorer Action */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 bg-[#141926] p-1 rounded-lg border border-[#202738] text-[11px] font-mono">
                  <button
                    onClick={() => setSelectedDensity("compact")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedDensity === "compact"
                        ? "bg-[#252f47] text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Compact
                  </button>
                  <button
                    onClick={() => setSelectedDensity("normal")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedDensity === "normal"
                        ? "bg-[#252f47] text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setSelectedDensity("spacious")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      selectedDensity === "spacious"
                        ? "bg-[#252f47] text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Spacious
                  </button>
                </div>

                <Link
                  href="/explorer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
                >
                  <span>Open Full Explorer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Table Mock Rows */}
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
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Net Profit</th>
                    <th className="px-4 py-3">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  {filteredRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      className={`hover:bg-[#121624] transition-colors ${
                        selectedDensity === "compact"
                          ? "py-2"
                          : selectedDensity === "normal"
                          ? "py-3.5"
                          : "py-5"
                      }`}
                    >
                      <td
                        className={`px-4 ${
                          selectedDensity === "compact"
                            ? "py-2"
                            : selectedDensity === "normal"
                            ? "py-3.5"
                            : "py-5"
                        } text-indigo-300 font-semibold`}
                      >
                        {rec.id}
                      </td>
                      <td className="px-4 font-sans text-white font-medium">
                        {rec.title}
                      </td>
                      <td className="px-4 text-zinc-300">{rec.company}</td>
                      <td className="px-4">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                          {rec.category}
                        </span>
                      </td>
                      <td className="px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            rec.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                              : rec.status === "Pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/25"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-4 text-zinc-300">{rec.country}</td>
                      <td className="px-4 text-white font-semibold">
                        {rec.revenue}
                      </td>
                      <td className="px-4 text-emerald-400 font-semibold">
                        {rec.profit}
                      </td>
                      <td className="px-4 text-zinc-400 text-[11px]">
                        {rec.owner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-16 px-6 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Workflow Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explorer Feature Highlights
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Every detail is tuned for enterprise analysts conducting audit investigations and revenue forecasting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg render-card space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#6c35f5]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-[#fafaf4]">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Bottom Banner */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <div className="p-10 sm:p-12 rounded-lg render-card space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
              Ready to Query 100,000 Records?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto">
              Open the production Data Explorer to test instant multi-filter conditions and URL state synchronization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/explorer"
                className="px-6 py-3.5 rounded-lg btn-render-primary text-xs font-semibold flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-[#b193e0]" />
                <span>Launch Live Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/architecture"
                className="px-6 py-3.5 rounded-lg btn-render-secondary text-xs font-semibold"
              >
                View Indexing Benchmarks
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <PublicFooter />
    </div>
  );
}
