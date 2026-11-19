"use client";

import React from "react";
import Link from "next/link";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import FluidWaveCanvas from "@/components/home/FluidWaveCanvas";
import { ArrowUpRight, Database, Shield, Cpu, Activity, Terminal } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="relative border-t border-[#132a4a] bg-[#000a17] pt-16 pb-12 overflow-hidden">
      {/* Subtle Fluid Wave Canvas Background */}
      <FluidWaveCanvas className="opacity-40" intensity="dark" />

      {/* Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-[90%] mx-auto h-full grid grid-cols-4 sm:grid-cols-6 border-x border-[#132a4a]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-[#132a4a] h-full" />
          ))}
        </div>
      </div>

      <div className="w-[90%] mx-auto space-y-12 relative z-10">
        {/* Top Header Tag & Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#132a4a] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-[#001225] border border-[#1e6aff] flex items-center justify-center p-1.5 shadow-md shadow-[#1e6aff]/20">
              <DataScopeLogo className="w-full h-full text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold tracking-tight text-sm font-sans">
                  DataScope Enterprise Platform
                </span>
                <span className="genesis-badge text-[9px] py-0.5 px-2">
                  v2.4 Production
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[11px] text-[#38bdf8] flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#1e6aff]/10 border border-[#1e6aff]/25">
              <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping" />
              CLUSTER TELEMETRY: 14.2MS P95
            </span>
            <span className="text-zinc-500 font-mono hidden md:inline">[XX - FOOTER]</span>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div className="space-y-3">
            <span className="text-[11px] text-[#38bdf8] uppercase tracking-wider block font-bold">
              [NAVIGATION]
            </span>
            <ul className="space-y-2 text-zinc-400 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Platform Home
                </Link>
              </li>
              <li>
                <Link href="/data-explorer" className="hover:text-white transition-colors">
                  Live Data Explorer
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Product Features
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Architecture & Indexing
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Visual Query Builder
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] text-[#38bdf8] uppercase tracking-wider block font-bold">
              [SYSTEM SPEC]
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center justify-between">
                <span>Database Engine:</span>
                <span className="text-white">PostgreSQL 16</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Text Search:</span>
                <span className="text-white">pg_trgm (GIN)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Client Framework:</span>
                <span className="text-white">Next.js 15</span>
              </li>
              <li className="flex items-center justify-between">
                <span>State Pipeline:</span>
                <span className="text-white">Redux Toolkit</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Scroll Physics:</span>
                <span className="text-white">Lenis Inertial</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] text-[#38bdf8] uppercase tracking-wider block font-bold">
              [COMPLIANCE & AUDIT]
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOC-2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Immutable Audit Trail</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Role-Based Access Control</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-AST Fast Compilation</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] text-[#38bdf8] uppercase tracking-wider block font-bold">
              [ACTION CONSOLE]
            </span>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Experience instant data discovery with 100,000 real business contracts.
            </p>
            <div className="pt-1">
              <Link
                href="/explorer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-none btn-render-primary text-white text-xs font-semibold shadow-lg shadow-[#1e6aff]/25 group"
              >
                <span>Launch Live Explorer</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Massive Grotesque Brand Typography (Genesis 01:20 Signature) */}
        <div className="border-t border-[#132a4a] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#878787] pb-4 gap-2">
            <div>
              <span>© {new Date().getFullYear()} DATASCOPE ENTERPRISE INC. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>LATENCY: &lt; 20MS</span>
              <span>•</span>
              <span>CAPACITY: 100,000+ RECORDS</span>
              <span>•</span>
              <span>GENESIS BLUEPRINT SPEC</span>
            </div>
          </div>

          <div className="text-[13vw] font-black tracking-tighter leading-none text-[#ffffff]/10 hover:text-[#38bdf8]/15 transition-colors duration-500 select-none text-center font-sans">
            DATASCOPE
          </div>
        </div>
      </div>
    </footer>
  );
}
