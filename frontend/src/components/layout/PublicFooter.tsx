"use client";

import React from "react";
import Link from "next/link";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import { ArrowUpRight, Github, Shield, Terminal } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="border-t border-[#132a4a] bg-[#000a17] py-12 px-6 text-xs text-[#878787]">
      <div className="w-[90%] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#132a4a]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-none bg-[#001225] border border-[#1e6aff] flex items-center justify-center p-1 shadow-md shadow-[#1e6aff]/20">
                <DataScopeLogo className="w-full h-full text-white" />
              </div>
              <span className="text-white font-bold tracking-tight text-sm">
                DataScope Enterprise Platform
              </span>
              <span className="genesis-badge text-[10px] py-0.5 px-2">
                Production Tier
              </span>
            </div>
            <p className="text-[#878787] text-xs max-w-md">
              Next-generation high-volume data discovery engine powered by PostgreSQL 16, GIN trigram indexing, and Redux Toolkit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link
              href="/features"
              className="text-[#878787] hover:text-white transition-colors"
            >
              Platform Features
            </Link>
            <Link
              href="/data-explorer"
              className="text-[#878787] hover:text-white transition-colors"
            >
              Data Explorer
            </Link>
            <Link
              href="/architecture"
              className="text-[#878787] hover:text-white transition-colors"
            >
              Architecture & Indexing
            </Link>
            <Link
              href="/explorer"
              className="text-[#38bdf8] hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Live Explorer</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              href="/login"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DataScope Inc.</span>
            <span>•</span>
            <span>PostgreSQL 16 & Drizzle ORM</span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cluster Telemetry: Sub-18ms P95
            </span>
            <span className="text-zinc-600">|</span>
            <span>Render × Mistral Design Spec</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
