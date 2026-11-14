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
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-[#0c0f17]/90 backdrop-blur-md border-b border-[#1a2030] px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left Section: Active Dataset & Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141926] border border-[#1d2436] text-xs">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-300 font-medium hidden sm:inline">
              Dataset:
            </span>
            <span className="text-white font-semibold">
              Global Enterprise Revenue & Contracts
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              100,000 Rows
            </span>
          </div>

          {/* Performance Telemetry Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Query: {performanceTelemetry.lastQueryTimeMs}ms</span>
            <span className="text-emerald-500/60">•</span>
            <span>Index: GIN / B-Tree</span>
          </div>
        </div>

        {/* Center / Right Section: Global Search & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search Bar */}
          <div className="relative w-64 md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 100k records (title, company, SKU)..."
              value={globalQuery}
              onChange={(e) => dispatch(setGlobalQuery(e.target.value))}
              className="w-full pl-9 pr-12 py-1.5 rounded-lg bg-[#121622] border border-[#202738] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 px-1 py-0.5 rounded border border-[#262e42] bg-[#161c2a]">
              ⌘K
            </span>
          </div>

          {/* AI Search Assistant Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 hover:from-indigo-600/30 hover:to-cyan-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-medium transition-all shadow-sm"
            title="Ask AI to construct search query in natural language"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">AI Search</span>
          </button>

          {/* Export CSV Button */}
          <a
            href="/api/export"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#202738] text-zinc-300 hover:text-white text-xs font-medium transition-all"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </a>

          {/* Public Landing Page Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-medium transition-all"
            title="Go to Public Landing Page"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
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

