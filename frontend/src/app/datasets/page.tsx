"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAppSelector } from "@/store/hooks";
import {
  Database,
  Plus,
  Layers,
  Calendar,
  Lock,
  Globe,
  Shield,
  ArrowRight,
  Server,
} from "lucide-react";
import Link from "next/link";

interface DatasetCardItem {
  id: string;
  name: string;
  description: string;
  category: string;
  dataSource: string;
  totalRecords: number;
  accessLevel: "Public" | "Internal" | "Restricted";
  lastUpdated: string;
}

const INITIAL_DATASETS: DatasetCardItem[] = [
  {
    id: "ds-01",
    name: "Global Enterprise Revenue & Contracts",
    description: "High-volume repository containing enterprise contract telemetry, multi-region sales, account profitability, and historical status audits.",
    category: "Enterprise",
    dataSource: "SAP S/4HANA & Salesforce Lake",
    totalRecords: 100000,
    accessLevel: "Public",
    lastUpdated: "2026-11-14",
  },
  {
    id: "ds-02",
    name: "Cloud Infrastructure & Telemetry Metrics",
    description: "Multi-cluster Kubernetes pod telemetry, CPU utilization matrices, edge computing bandwidth, and SLA uptime records.",
    category: "DevOps & Cloud",
    dataSource: "Datadog & AWS CloudWatch Ingest",
    totalRecords: 245000,
    accessLevel: "Internal",
    lastUpdated: "2026-11-12",
  },
  {
    id: "ds-03",
    name: "Algorithmic High-Frequency Transactions",
    description: "Securities order books, settlement logs, derivative margin calls, and real-time execution tick streams.",
    category: "Financial Services",
    dataSource: "Bloomberg Terminal & FIX Protocol Feed",
    totalRecords: 500000,
    accessLevel: "Restricted",
    lastUpdated: "2026-11-10",
  },
];

export default function DatasetsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [datasets] = useState<DatasetCardItem[]>(INITIAL_DATASETS);
  const [searchFilter, setSearchFilter] = useState("");

  const filtered = datasets.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Dataset Library & Governance
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                  3 Connected Lakes
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                Register, configure, and monitor access permissions across distributed enterprise business datasets.
              </p>
            </div>

            {user?.role === "Administrator" && (
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all">
                <Plus className="w-3.5 h-3.5" />
                <span>Register New Dataset</span>
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Filter datasets by name or vertical..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0e121d] border border-[#1b2234] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Dataset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-lg bg-[#0f131f] border border-[#1d2538] hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {d.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        d.accessLevel === "Public"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : d.accessLevel === "Internal"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      {d.accessLevel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {d.description}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-zinc-400 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Total Volume:</span>
                      <span className="text-indigo-300 font-bold">
                        {d.totalRecords.toLocaleString()} Records
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Data Source:</span>
                      <span className="text-zinc-300 truncate max-w-[180px]">
                        {d.dataSource}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Last Synchronized:</span>
                      <span className="text-zinc-400">{d.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1a2133] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Engine: PostgreSQL GIN
                  </span>
                  <Link
                    href="/explorer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md"
                  >
                    <span>Explore Data</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

