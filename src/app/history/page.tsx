"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { History, Clock, ArrowRight, Zap, Database } from "lucide-react";
import Link from "next/link";

const MOCK_HISTORY = [
  {
    id: "h-01",
    query: "status = 'Active' AND country = 'Germany' AND revenue >= 10000",
    matchedCount: 14820,
    executionTimeMs: 11.4,
    executedAt: "10 minutes ago",
    user: "Sarah Connor (Analyst)",
  },
  {
    id: "h-02",
    query: "title ILIKE '%cloud migration%' AND category = 'Enterprise'",
    matchedCount: 3240,
    executionTimeMs: 14.8,
    executedAt: "25 minutes ago",
    user: "Sarah Connor (Analyst)",
  },
  {
    id: "h-03",
    query: "status = 'Pending' AND priority = 'Urgent'",
    matchedCount: 920,
    executionTimeMs: 8.6,
    executedAt: "1 hour ago",
    user: "Alex Rivera (Admin)",
  },
  {
    id: "h-04",
    query: "country = 'United States' ORDER BY profit DESC LIMIT 50",
    matchedCount: 28400,
    executionTimeMs: 16.2,
    executedAt: "3 hours ago",
    user: "Marcus Vance (Viewer)",
  },
  {
    id: "h-05",
    query: "revenue >= 500000 /* Tier-1 Strategic Accounts */",
    matchedCount: 12100,
    executionTimeMs: 9.1,
    executedAt: "Yesterday",
    user: "Sarah Connor (Analyst)",
  },
];

export default function HistoryPage() {
  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-5xl mx-auto w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Search & Execution History
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Audit Log
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review analytical query executions, response times, and index hit diagnostics across user sessions.
            </p>
          </div>

          <div className="rounded-xl bg-[#0f131f] border border-[#1d2538] overflow-hidden shadow-lg">
            <div className="divide-y divide-[#171d2e]">
              {MOCK_HISTORY.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-[#121724] transition-colors flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="text-zinc-200 font-semibold text-xs font-mono">
                      {item.query}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-sans">
                      <span>Executed by {item.user}</span>
                      <span>•</span>
                      <span>{item.executedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-zinc-300 font-semibold">
                        {item.matchedCount.toLocaleString()} matches
                      </div>
                      <div className="text-[11px] text-emerald-400 flex items-center justify-end gap-1">
                        <Zap className="w-3 h-3" />
                        <span>{item.executionTimeMs} ms</span>
                      </div>
                    </div>

                    <Link
                      href="/explorer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#161c2c] hover:bg-[#1e263c] border border-[#232c42] text-zinc-300 hover:text-white transition-all"
                    >
                      <span>Rerun</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
