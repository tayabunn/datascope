"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import DataScopeLogo from "@/components/common/DataScopeLogo";
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
  ExternalLink,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient Radial Background Glows (Render Iris & Mistral Amber) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#6c35f5]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed top-[400px] right-0 w-[500px] h-[500px] bg-[#ff8204]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Public Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080a10]/85 border-b border-[#1a2030]">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6c35f5] via-[#581ccb] to-[#ff8204] flex items-center justify-center shadow-lg shadow-[#6c35f5]/30 text-white font-bold group-hover:scale-105 transition-transform p-2">
              <DataScopeLogo className="w-full h-full text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#fafaf4] tracking-tight text-lg">
                  DataScope
                </span>
                <span className="mistral-pill text-[10px] py-0.5 px-2">
                  v2.4 Enterprise
                </span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] font-mono">
                Data Discovery & Intelligence
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Platform Features
            </a>
            <a href="#preview" className="hover:text-white transition-colors">
              Data Explorer
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Architecture & Indexing
            </a>
            <Link href="/overview" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Overview Dashboard</span>
              <ChevronRight className="w-3 h-3 text-zinc-500" />
            </Link>
          </nav>

          {/* Action CTAs: Dynamic based on Session State */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                  Signed in as <span className="text-indigo-400 font-semibold">{user?.fullName?.split(" ")[0] || "User"}</span>
                </span>
                <Link
                  href="/explorer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all group"
                >
                  <Database className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Go to Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-[#121724] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section (Render Cloud Atmosphere + Mistral Editorial Typography) */}
        <section className="relative pt-20 pb-16 px-6 max-w-6xl mx-auto text-center space-y-6">
          <div className="mistral-pill mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8204] animate-pulse" />
            <span>100,000+ Business Records • Sub-18ms GIN Indexing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-[#fafaf4] tracking-tight leading-[1.12]">
            Next-Generation Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#968dfa] via-[#6c35f5] to-[#ff8204]">
              Data Discovery & Intelligence
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
            Engineered for high-volume enterprise discovery. Query millions of records with PostgreSQL B-Tree & GIN trigram indexing, RTK Query server-state caching, and sub-20ms response times.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/explorer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg btn-render-primary text-sm font-semibold group"
            >
              <Database className="w-4 h-4 text-[#b193e0]" />
              <span>Launch Live Data Explorer (100k Rows)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/overview"
              className="flex items-center gap-2 px-5 py-3.5 rounded-lg btn-render-secondary text-sm font-semibold"
            >
              <Activity className="w-4 h-4 text-[#968dfa]" />
              <span>Overview Dashboard</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-3.5 rounded-lg btn-render-secondary text-sm font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-[#0b7d55]" />
              <span>Evaluate Demo Roles</span>
            </Link>
          </div>

          {/* Metric Strip (Render Inset Cards + Mistral Telemetry) */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg render-card text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#fafaf4]">
                100,000+
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                Indexed Records Loaded
              </div>
            </div>

            <div className="p-4 rounded-lg render-card text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0b7d55]">
                &lt; 18ms
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                P95 Query Latency
              </div>
            </div>

            <div className="p-4 rounded-lg render-card text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#968dfa]">
                300s
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                Client Cache Retention
              </div>
            </div>

            <div className="p-4 rounded-lg mistral-card text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ffa033]">
                100%
              </div>
              <div className="text-[11px] text-[#a1a1aa] font-mono">
                PostgreSQL SQL Aggr.
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive Explorer Preview Section */}
        <section id="preview" className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              The Central Application Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Data Explorer
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Dynamic multi-column sorting, column show/hide management, instant trigram filtering, and slide-over audit drawers.
            </p>
          </div>

          {/* Mock Interactive Data Table Graphic */}
          <div className="rounded-lg bg-[#0b0e17] border border-[#1d263b] shadow-2xl overflow-hidden">
            {/* Table Mock Bar */}
            <div className="p-3.5 bg-[#0e121d] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-zinc-400 text-[11px]">
                  Showing <strong className="text-white">1 - 50</strong> of{" "}
                  <strong className="text-indigo-400">100,000</strong> records
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  14ms Latency
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#141926] border border-[#222a3d] text-zinc-300">
                  Visible Columns: 8
                </span>
                <Link
                  href="/explorer"
                  className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] transition-colors"
                >
                  Open in Explorer →
                </Link>
              </div>
            </div>

            {/* Table Header & Rows Preview */}
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
                    <th className="px-4 py-3">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-4 py-3 text-indigo-300 font-semibold">REC-000001</td>
                    <td className="px-4 py-3 font-sans text-white font-medium">Enterprise Cloud Migration Contract</td>
                    <td className="px-4 py-3 text-zinc-300">Apex Global Systems</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Enterprise</span></td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">Active</span></td>
                    <td className="px-4 py-3 text-zinc-300">Germany</td>
                    <td className="px-4 py-3 text-white font-semibold">$348,200.00</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">+$87,050.00</td>
                  </tr>
                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-4 py-3 text-indigo-300 font-semibold">REC-000002</td>
                    <td className="px-4 py-3 font-sans text-white font-medium">Global AI Pipeline Licensing</td>
                    <td className="px-4 py-3 text-zinc-300">Vanguard Analytics</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Financial Services</span></td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">Pending</span></td>
                    <td className="px-4 py-3 text-zinc-300">United States</td>
                    <td className="px-4 py-3 text-white font-semibold">$195,500.00</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">+$48,875.00</td>
                  </tr>
                  <tr className="hover:bg-[#121624] transition-colors">
                    <td className="px-4 py-3 text-indigo-300 font-semibold">REC-000003</td>
                    <td className="px-4 py-3 font-sans text-white font-medium">Core Banking Infrastructure SLA</td>
                    <td className="px-4 py-3 text-zinc-300">Helios Capital AG</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Public Sector</span></td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">Active</span></td>
                    <td className="px-4 py-3 text-zinc-300">Switzerland</td>
                    <td className="px-4 py-3 text-white font-semibold">$520,000.00</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold">+$130,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Platform Capabilities Grid */}
        <section id="features" className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Engineered For Scale
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Six Core Architectural Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg render-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#6c35f5]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                100,000+ Record Streaming Seeder
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Chunked streaming batch insertion generating 100k realistic enterprise records with zero heap memory spikes in PostgreSQL 16.
              </p>
            </div>

            <div className="p-6 rounded-lg mistral-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff8204]/15 border border-[#ff8204]/35 flex items-center justify-center text-[#ffa033]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                GIN Trigram Fuzzy Search
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                PostgreSQL <code className="text-[#ffa033] font-mono">pg_trgm</code> GIN indexes and composite B-Trees execute substring queries in under 20ms without table scans.
              </p>
            </div>

            <div className="p-6 rounded-lg render-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0b7d55]/15 border border-[#0b7d55]/35 flex items-center justify-center text-[#0b7d55]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Server-Side State & RTK Query
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Normalized cache tagging, 300s cache retention for instant back-navigation, and automatic background refetching upon mutation.
              </p>
            </div>

            <div className="p-6 rounded-lg render-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#968dfa]/15 border border-[#968dfa]/30 flex items-center justify-center text-[#968dfa]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Server-Side SQL Aggregations
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Computes portfolio revenue, category breakdowns, and growth trends entirely in SQL—preventing giant row transfers to the client.
              </p>
            </div>

            <div className="p-6 rounded-lg render-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#005e9e]/15 border border-[#005e9e]/35 flex items-center justify-center text-[#38bdf8]">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Saved Views & URL Search State
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Filters, search queries, and sorting are synchronized with browser query parameters, enabling deep-linking and team sharing.
              </p>
            </div>

            <div className="p-6 rounded-lg render-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8a05ff]/15 border border-[#8a05ff]/35 flex items-center justify-center text-[#c084fc]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#fafaf4]">
                Role-Based Access Control (RBAC)
              </h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Strict separation of Administrator, Data Analyst, and Viewer capabilities with audit trail logging for all mutations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Footer Section (Render Iris + Mistral Amber) */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <div className="p-10 sm:p-12 rounded-lg render-card space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#fafaf4] tracking-tight">
              Ready to Explore High-Volume Enterprise Data?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto">
              Experience sub-20ms search queries, dynamic column visibility, and server-side state synchronization right now.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/explorer"
                className="px-6 py-3 rounded-lg btn-render-primary text-xs font-semibold"
              >
                Launch Data Explorer
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-lg btn-render-secondary text-xs font-semibold"
              >
                Register Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Public Footer */}
      <footer className="border-t border-[#161d2d] bg-[#06080c] py-10 px-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DataScopeLogo className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-semibold">DataScope Enterprise Platform</span>
            <span>•</span>
            <span>PostgreSQL 16 & Drizzle ORM • Next.js 15 & Redux Toolkit</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/overview" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/explorer" className="hover:text-white transition-colors">
              Data Explorer
            </Link>
            <Link href="/search" className="hover:text-white transition-colors">
              Advanced Search
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
