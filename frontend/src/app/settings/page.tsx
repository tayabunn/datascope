"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPageSize,
  setTableDensity,
  resetVisibleColumns,
} from "@/store/slices/uiPreferenceSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  Settings,
  Database,
  Sliders,
  Shield,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Terminal,
} from "lucide-react";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { pageSize, tableDensity } = useAppSelector((state) => state.uiPreference);
  const { user } = useAppSelector((state) => state.auth);

  const [isResetting, setIsResetting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleResetDefaults = () => {
    dispatch(setPageSize(50));
    dispatch(setTableDensity("compact"));
    dispatch(resetVisibleColumns());
    dispatch(
      addToast({
        type: "info",
        title: "Preferences Reset",
        message: "Viewport density set to compact, default page size set to 50.",
      })
    );
    setStatusMessage("UI settings successfully reset to enterprise defaults.");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  // RBAC: Strict Administrator Authority Guard for System Configuration
  if (user?.role !== "Administrator") {
    return (
      <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header />
          <main className="p-6 max-w-xl mx-auto w-full my-auto text-center space-y-4">
            <div className="p-8 rounded-none mistral-card shadow-2xl space-y-4">
              <div className="w-14 h-14 rounded-none bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-block px-2.5 py-0.5 rounded-none bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-400 font-semibold uppercase tracking-wider">
                  403 Forbidden • Admin Authority Required
                </div>
                <h2 className="text-lg font-bold text-[#fafaf4] tracking-tight">
                  System Configuration Restricted
                </h2>
                <p className="text-xs text-[#a1a1aa]">
                  Database engine telemetry, connection pooling parameters, and platform architecture controls are restricted strictly to platform <span className="text-rose-400 font-semibold">Administrators</span>.
                </p>
                <p className="text-[11px] font-mono text-zinc-500 pt-1">
                  Your current session role is: <span className="text-[#38bdf8] font-semibold">{user?.role || "Viewer"}</span>
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <Link
                  href="/explorer"
                  className="px-5 py-2.5 rounded-none btn-render-primary text-xs font-semibold flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Return to Data Explorer</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 w-full">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
                System & Workspace Preferences
              </h1>
              <span className="render-pill text-xs py-0.5 px-2.5 font-semibold">
                Configuration
              </span>
            </div>
            <p className="text-sm text-[#a1a1aa] mt-1">
              Customize table viewport densities, manage connection pool parameters, and review system diagnostics.
            </p>
          </div>

          {statusMessage && (
            <div className="p-3 rounded-none bg-[#0b7d55]/15 border border-[#0b7d55]/30 text-[#0b7d55] text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Table Display Preferences */}
          <div className="p-5 rounded-none render-card space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1a2030] pb-3">
              <Sliders className="w-4 h-4 text-[#38bdf8]" />
              <h2 className="text-xs font-semibold uppercase font-mono tracking-wider text-[#fafaf4]">
                Data Explorer Viewport Preferences
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-zinc-200">Table Row Density</div>
                  <div className="text-[#a1a1aa] text-[11px]">
                    Controls padding and vertical space between records in the table.
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#121624] p-1 rounded-none border border-[#1f273c]">
                  {(["compact", "comfortable", "spacious"] as const).map((density) => (
                    <button
                      key={density}
                      onClick={() => dispatch(setTableDensity(density))}
                      className={`px-3 py-1 rounded-none text-xs font-mono capitalize transition-all ${
                        tableDensity === density
                          ? "bg-[#1e6aff] text-white font-semibold shadow"
                          : "text-[#a1a1aa] hover:text-zinc-200"
                      }`}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1a2030] pt-3">
                <div>
                  <div className="font-semibold text-zinc-200">Default Page Size</div>
                  <div className="text-[#a1a1aa] text-[11px]">
                    Number of rows returned per server-side pagination slice.
                  </div>
                </div>
                <select
                  value={pageSize}
                  onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                  className="px-3 py-1.5 rounded-none bg-[#121624] border border-[#1f273c] text-zinc-200 font-mono focus:outline-none focus:border-[#1e6aff] cursor-pointer"
                >
                  <option value={25}>25 rows</option>
                  <option value={50}>50 rows (Standard)</option>
                  <option value={100}>100 rows</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-none btn-render-secondary text-xs font-medium"
                >
                  Reset to Default Layout
                </button>
              </div>
            </div>
          </div>

          {/* Database Diagnostics */}
          <div className="p-5 rounded-none render-card space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1a2030] pb-3">
              <Database className="w-4 h-4 text-[#38bdf8]" />
              <h2 className="text-xs font-semibold uppercase font-mono tracking-wider text-[#fafaf4]">
                Database Engine Status (PostgreSQL + Drizzle)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-none bg-[#121624] border border-[#1f273c] space-y-1">
                <span className="text-[#a1a1aa]">PostgreSQL Connection Pool</span>
                <div className="text-[#fafaf4] font-bold">20 Concurrent Sockets</div>
                <div className="text-[10px] text-[#0b7d55] font-semibold">Idle Timeout: 30,000ms</div>
              </div>

              <div className="p-3 rounded-none bg-[#121624] border border-[#1f273c] space-y-1">
                <span className="text-[#a1a1aa]">Indexing Engines Active</span>
                <div className="text-[#fafaf4] font-bold">B-Tree + GIN Trigram</div>
                <div className="text-[10px] text-[#38bdf8] font-semibold">pg_trgm Extension Enabled</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

