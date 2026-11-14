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
  Download,
  Lock,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111624] via-[#0d101a] to-[#090b12] border border-[#1d263b] p-8 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Enterprise Data Discovery & Intelligence v2.4</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Explore, Search, and Analyze <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                  100,000+ Structured Records
                </span>
              </h1>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Engineered for data-intensive enterprise discovery. Powered by PostgreSQL B-Tree & GIN Trigram indexing, Redux Toolkit caching, and server-side state synchronization.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/explorer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all group"
                >
                  <Database className="w-4 h-4 text-indigo-200" />
                  <span>Launch Data Explorer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/analytics"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141926] hover:bg-[#1b2236] border border-[#232c42] text-zinc-200 text-xs font-semibold transition-all"
                >
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Portfolio Analytics</span>
                </Link>

                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141926] hover:bg-[#1b2236] border border-[#232c42] text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-600/15 hover:bg-cyan-600/25 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Sub-20ms Search</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                GIN Trigram & composite B-Tree indexes execute complex substring queries without sequential scans.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">RTK Query Caching</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automated request deduplication, normalized tag invalidation, and background state synchronization.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">100k+ Records Batch Seeder</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Batch streaming architecture seeds 100,000 realistic enterprise rows in under 30 seconds.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Role-Based Access</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fine-grained permissions for Administrator, Data Analyst, and Viewer with live role switching.
              </p>
            </div>
          </div>

          {/* Quick Module Shortcuts */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Core Intelligence Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/explorer"
                className="p-5 rounded-xl bg-[#0e121d] border border-[#1b2234] hover:border-indigo-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  Central Data Explorer
                </h3>
                <p className="text-xs text-zinc-400">
                  Custom high-density table with dynamic columns, multi-column sorting, selection, and record detail drawer.
                </p>
              </Link>

              <Link
                href="/search"
                className="p-5 rounded-xl bg-[#0e121d] border border-[#1b2234] hover:border-indigo-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <Search className="w-5 h-5 text-cyan-400" />
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Visual Query Builder
                </h3>
                <p className="text-xs text-zinc-400">
                  Construct nested predicate conditions, inspect compiled PostgreSQL ASTs, and run targeted searches.
                </p>
              </Link>

              <Link
                href="/saved-views"
                className="p-5 rounded-xl bg-[#0e121d] border border-[#1b2234] hover:border-indigo-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <BookmarkCheck className="w-5 h-5 text-emerald-400" />
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Saved Views & Sharing
                </h3>
                <p className="text-xs text-zinc-400">
                  Reuse frequently executed search configurations, column layouts, and share views with authorized teammates.
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
