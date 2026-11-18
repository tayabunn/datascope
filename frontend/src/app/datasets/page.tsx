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

        <main className="p-6 space-y-6 w-full">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
                  Dataset Library & Governance
                </h1>
                <span className="render-pill text-xs py-0.5 px-2.5 font-semibold">
                  3 Connected Lakes
                </span>
              </div>
              <p className="text-sm text-[#a1a1aa] mt-1">
                Register, configure, and monitor access permissions across distributed enterprise business datasets.
              </p>
            </div>

            {user?.role === "Administrator" && (
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-none btn-render-primary text-xs font-semibold shadow-md">
                <Plus className="w-3.5 h-3.5 text-[#38bdf8]" />
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
              className="w-full px-3.5 py-2 rounded-none bg-[#051329] border border-[#132a4a] text-xs text-[#fafaf4] placeholder-zinc-500 focus:outline-none focus:border-[#1e6aff] transition-all"
            />
          </div>

          {/* Dataset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-none genesis-card flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#001225] text-[#38bdf8] border border-[#1e6aff]/40">
                      {d.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-none flex items-center gap-1 border ${
                        d.accessLevel === "Public"
                          ? "bg-[#0b7d55]/15 text-[#0b7d55] border-[#0b7d55]/30 font-semibold"
                          : d.accessLevel === "Internal"
                          ? "bg-[#001225] text-[#38bdf8] border border-[#38bdf8]/40 font-semibold"
                          : "bg-rose-500/15 text-rose-400 border-rose-500/30 font-semibold"
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      {d.accessLevel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#fafaf4] group-hover:text-[#38bdf8] transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2">
                      {d.description}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-[#a1a1aa] pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Total Volume:</span>
                      <span className="text-[#38bdf8] font-bold">
                        {d.totalRecords.toLocaleString()} Records
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Data Source:</span>
                      <span className="text-[#fafaf4] truncate max-w-[180px]">
                        {d.dataSource}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Last Synchronized:</span>
                      <span className="text-[#a1a1aa]">{d.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1a2030] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Engine: PostgreSQL GIN
                  </span>
                  <Link
                    href="/explorer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-none btn-render-primary text-xs font-semibold"
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

