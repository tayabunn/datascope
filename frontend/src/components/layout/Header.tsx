"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGlobalQuery } from "@/store/slices/searchConfigSlice";
import { toggleExportModal } from "@/store/slices/uiPreferenceSlice";
import {
  Search,
  Sparkles,
  Download,
  Zap,
  Database,
  SlidersHorizontal,
  Globe,
} from "lucide-react";
import AiSearchModal from "@/components/filters/AiSearchModal";

export default function Header() {
  const dispatch = useAppDispatch();
  const { globalQuery } = useAppSelector((state) => state.searchConfig);
  const { performanceTelemetry } = useAppSelector((state) => state.uiPreference);
  const { user } = useAppSelector((state) => state.auth);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <>
      <header className="h-18 bg-[#0c0f17]/90 backdrop-blur-md border-b border-[#1a2030] px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left Section: Active Dataset & Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#141926] border border-[#1d2436] text-xs shadow-sm">
            <Database className="w-4 h-4 text-[#968dfa]" />
            <span className="text-zinc-300 font-medium hidden sm:inline">
              Dataset:
            </span>
            <span className="text-white font-semibold">
              Global Enterprise Revenue & Contracts
            </span>
            <span className="render-pill py-0.5 px-2 font-mono">
              100,000 Rows
            </span>
          </div>

          {/* Performance Telemetry Badge */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Query: {performanceTelemetry.lastQueryTimeMs}ms</span>
            <span className="text-emerald-500/60">•</span>
            <span>Index: GIN / B-Tree</span>
          </div>
        </div>

        {/* Center / Right Section: Global Search & Quick Actions */}
        <div className="flex items-center gap-3.5">
          {/* Global Search Bar */}
          <div className="relative w-64 md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 100k records (title, company, SKU)..."
              value={globalQuery}
              onChange={(e) => dispatch(setGlobalQuery(e.target.value))}
              className="w-full pl-9 pr-12 py-2 rounded-lg bg-[#121622] border border-[#202738] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#968dfa] focus:ring-1 focus:ring-[#6c35f5] transition-all font-mono"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded border border-[#262e42] bg-[#161c2a]">
              ⌘K
            </span>
          </div>

          {/* AI Search Assistant Button (Mistral Amber Signature) */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ff8204]/15 hover:bg-[#ff8204]/25 border border-[#ff8204]/35 text-[#ffa033] hover:text-white text-xs font-semibold transition-all shadow-sm"
            title="Ask AI to construct search query in natural language"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff8204] animate-pulse" />
            <span className="hidden sm:inline">AI Search</span>
          </button>

          {/* Export CSV Button (RBAC: Admin & Analyst only, Viewer read-only) */}
          {user?.role !== "Viewer" ? (
            <a
              href="/api/export"
              download
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-zinc-300 hover:text-white text-xs font-medium transition-all"
              title="Export filtered records to CSV"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </a>
          ) : (
            <span
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121622] border border-[#1b2234] text-zinc-500 text-xs font-medium cursor-not-allowed opacity-60"
              title="Export restricted: Requires Data Analyst or Admin role"
            >
              <Download className="w-3.5 h-3.5 text-zinc-600" />
              <span>Export Locked</span>
            </span>
          )}

          {/* Public Landing Page Link (Render Iris Signature) */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#6c35f5]/15 hover:bg-[#6c35f5]/25 border border-[#968dfa]/30 text-[#b193e0] hover:text-white text-xs font-medium transition-all"
            title="Go to Public Landing Page"
          >
            <Globe className="w-3.5 h-3.5 text-[#968dfa]" />
            <span className="hidden md:inline">Landing Page</span>
          </Link>
        </div>
      </header>

      {/* Natural Language AI Search Modal */}
      {isAiModalOpen && (
        <AiSearchModal onClose={() => setIsAiModalOpen(false)} />
      )}
    </>
  );
}

