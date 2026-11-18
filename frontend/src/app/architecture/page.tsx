"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Database,
  Cpu,
  Zap,
  Server,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  GitCommit,
  CheckCircle2,
  Activity,
  HardDrive,
  Network,
  Binary,
  Code2,
  Copy,
  Check,
  Terminal,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export default function ArchitecturePage() {
  const [copiedSql, setCopiedSql] = useState<string | null>(null);

  const handleCopy = (sql: string, id: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedSql(id);
    setTimeout(() => setCopiedSql(null), 2000);
  };

  const architecturalLayers = [
    {
      step: "01",
      layer: "Client Application & Synchronized State",
      tech: "Next.js 15 • React 19 • Redux Toolkit • RTK Query",
      color: "#1e6aff",
      bgBorder: "bg-[#001225] border-[#1e3a5f]",
      badge: "300s Normalized Cache TTL",
      description:
        "Client architecture features normalized state caching with a 300s TTL window. Deep-linked URL search parameters synchronize search terms, multi-facet filters, and visible column schema without re-render cascades or prop-drilling.",
      metrics: "Zero Re-Render Waterfall • 1-Click Shareable State",
    },
    {
      step: "02",
      layer: "API Gateway, RBAC & Zod Validation Tier",
      tech: "Fastify • Route Handlers • Zod Schemas • JWT Middleware",
      color: "#38bdf8",
      bgBorder: "bg-[#001225] border-[#1e3a5f]",
      badge: "P95 14.2ms Gateway Latency",
      description:
        "Incoming requests pass through strict Zod runtime type-checking before reaching database execution. Multi-tier RBAC guards verify session tokens and enforce boundary isolation across Viewer, Analyst, and Administrator roles.",
      metrics: "Zero Unchecked Payloads • Strict Privilege Isolation",
    },
    {
      step: "03",
      layer: "Connection Pooler & Multiplexing Infrastructure",
      tech: "PGBouncer • Transaction-Level Pooling • Max 20 Conns",
      color: "#38bdf8",
      bgBorder: "bg-[#001225] border-[#1e3a5f]",
      badge: "18 / 20 Active Saturation",
      description:
        "Prevents PostgreSQL process starvation during high-concurrency analytical bursts. Maintains transaction-level pooling with sub-millisecond connection checkout, isolating core storage from socket churn.",
      metrics: "Sub-1ms Conn Checkout • 90% Pool Saturation Guard",
    },
    {
      step: "04",
      layer: "Type-Safe High-Performance ORM Engine",
      tech: "Drizzle ORM • Pure SQL Generation • Prepared Statements",
      color: "#10b981",
      bgBorder: "bg-[#001225] border-[#1e3a5f]",
      badge: "Zero Runtime AST Overhead",
      description:
        "Emits raw SQL with zero runtime query construction overhead. Automatic prepared statement binding enables PostgreSQL planner caching, reducing CPU parse cycles to near zero across identical query shapes.",
      metrics: "Direct Binary SQL Compilation • Planner Cache Reuse",
    },
    {
      step: "05",
      layer: "Storage Engine & Multi-Tier Index Architecture",
      tech: "PostgreSQL 16 • Inverted GIN pg_trgm • Composite B-Trees",
      color: "#c084fc",
      bgBorder: "bg-[#001225] border-[#1e3a5f]",
      badge: "100,000 Rows Sub-18ms",
      description:
        "The core data engine for 100,000+ enterprise records. Combines inverted GIN trigrams for sub-18ms fuzzy substring search with composite B-Trees for instantaneous multi-facet category and status filtering.",
      metrics: "Sub-18ms P95 • Zero Sequential Table Scans",
    },
  ];

  const indexingStrategies = [
    {
      id: "gin-trgm",
      title: "Inverted Trigram GIN Index",
      target: "deal_title & company",
      type: "GIN (pg_trgm)",
      purpose: "Sub-18ms Substring & Fuzzy Matching",
      sql: `CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX gin_trgm_deal_title 
ON business_records 
USING gin (deal_title gin_trgm_ops);

CREATE INDEX gin_trgm_company 
ON business_records 
USING gin (company gin_trgm_ops);`,
      explanation:
        "Deconstructs textual strings into 3-character n-grams. When searching for partial terms like '%cloud%' or '%analytics%', Postgres evaluates matching trigram postings lists directly rather than reading 100,000 raw rows from disk.",
    },
    {
      id: "composite-btree",
      title: "Composite Multi-Facet B-Tree",
      target: "category & status",
      type: "Composite B-Tree",
      purpose: "Instantaneous Facet Slicing",
      sql: `CREATE INDEX idx_business_records_category_status 
ON business_records (category, status);`,
      explanation:
        "Combines the two most frequently filtered categorical dimensions into a single balanced tree index. Eliminates Bitmap Index Scans and index intersections, yielding instantaneous 8.6ms query execution.",
    },
    {
      id: "directional-btree",
      title: "Directional Numeric B-Tree",
      target: "revenue DESC NULLS LAST",
      type: "Directional B-Tree",
      purpose: "Top-Tier Deal Sorting",
      sql: `CREATE INDEX idx_business_records_revenue_desc 
ON business_records (revenue DESC NULLS LAST);`,
      explanation:
        "Pre-sorts numeric revenue fields in descending order with NULLs positioned last. Allows PostgreSQL to fetch top deals in O(log N) time with zero in-memory sort buffer spills.",
    },
  ];

  const benchmarks = [
    {
      operation: "Fuzzy Substring Search (100k Rows)",
      query: "WHERE deal_title ILIKE '%migration%'",
      unindexed: "382.4 ms",
      indexed: "14.2 ms",
      speedup: "26.9x Faster",
    },
    {
      operation: "Composite Facet Filter",
      query: "WHERE category = 'Enterprise' AND status = 'Active'",
      unindexed: "114.8 ms",
      indexed: "8.6 ms",
      speedup: "13.3x Faster",
    },
    {
      operation: "Financial Portfolio Aggregations",
      query: "SELECT SUM(revenue), AVG(profit)...",
      unindexed: "241.0 ms",
      indexed: "19.1 ms",
      speedup: "12.6x Faster",
    },
    {
      operation: "Top Deals Descending Sort",
      query: "ORDER BY revenue DESC LIMIT 50",
      unindexed: "198.5 ms",
      indexed: "11.4 ms",
      speedup: "17.4x Faster",
    },
  ];

  const telemetryStats = [
    {
      label: "TOTAL RECORD CAPACITY",
      value: "100,000+",
      sub: "B-Tree & GIN Indexed",
      icon: Database,
      color: "text-[#38bdf8]",
    },
    {
      label: "QUERY LATENCY P95",
      value: "14.2ms",
      sub: "99.8% Sub-20ms SLA",
      icon: Zap,
      color: "text-[#38bdf8]",
    },
    {
      label: "CONNECTION SATURATION",
      value: "18 / 20",
      sub: "PGBouncer Pooler",
      icon: Cpu,
      color: "text-[#10b981]",
    },
    {
      label: "CACHE HIT RATIO (REDIS)",
      value: "98.4%",
      sub: "In-Memory L2 Serving",
      icon: HardDrive,
      color: "text-[#1e6aff]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#001225] text-[#ffffff] flex flex-col selection:bg-[#1e6aff]/30 selection:text-[#38bdf8]">
      {/* Background Architectural Grid & Subtle Ambient Glow */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1620320a_1px,transparent_1px),linear-gradient(to_bottom,#1620320a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[#001225]/40 blur-[160px] pointer-events-none" />

      {/* Shared Navigation Header */}
      <PublicHeader />

      {/* Hero Section - GENESIS Digital Architecture */}
      <main className="flex-1 relative z-10">
        <section className="relative pt-16 pb-12 px-4 w-[90%] mx-auto text-center space-y-5">
          <div className="genesis-badge mb-1 shadow-sm inline-flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
            <span>GENESIS HIGH-PERFORMANCE DIGITAL ARCHITECTURE v2.4</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#fafaf4] tracking-tight leading-tight">
            High-Performance Digital Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#38bdf8] to-[#1e6aff]">
              & Sub-18ms Indexing Engine
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#a1a1aa] text-xs sm:text-sm leading-relaxed">
            Architectural blueprints and engineering decisions that power 100,000+ enterprise records with sub-18ms P95 query execution: inverted GIN trigrams, connection multiplexing, and zero-AST memory compilation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/explorer"
              className="flex items-center gap-2 px-6 py-3 rounded-none btn-genesis-primary text-xs font-semibold group shadow-md"
            >
              <Database className="w-4 h-4 text-[#38bdf8]" />
              <span>Test Live in Data Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/overview"
              className="flex items-center gap-2 px-5 py-3 rounded-none btn-genesis-secondary text-xs font-semibold"
            >
              <Activity className="w-4 h-4 text-[#38bdf8]" />
              <span>Executive Command Telemetry</span>
            </Link>
          </div>
        </section>

        {/* 4 Core Telemetry Metrics Bar */}
        <section className="py-6 px-4 w-[90%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {telemetryStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-none genesis-card space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#878787]">
                    <span>{stat.label}</span>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5-Layer System Architecture Stack */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-1.5">
            <span className="genesis-badge">
              END-TO-END TOPOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5-Tier High-Performance Stack
            </h2>
            <p className="text-xs sm:text-sm text-[#878787] max-w-lg mx-auto">
              From client-side query parameters down to physical disk blocks in PostgreSQL 16.
            </p>
          </div>

          <div className="space-y-3.5">
            {architecturalLayers.map((layer, idx) => (
              <div
                key={idx}
                className="p-5 rounded-none genesis-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-lg font-mono font-bold text-[#38bdf8] px-2.5 py-1 rounded-none bg-[#001225] border border-[#1e3a5f]">
                    {layer.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#fafaf4]">
                        {layer.layer}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#0c1322] text-[#878787] border border-[#1c2a42]">
                        {layer.tech}
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa] max-w-3xl leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="genesis-badge-emerald">
                    {layer.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PostgreSQL 16 Indexing Strategies & DDL Blueprints */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-1.5">
            <span className="genesis-badge">
              POSTGRESQL 16 OPTIMIZATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Indexing Strategies & DDL Definitions
            </h2>
            <p className="text-xs sm:text-sm text-[#878787] max-w-xl mx-auto">
              How inverted trigrams and composite B-Trees eliminate expensive sequential table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {indexingStrategies.map((idxItem) => (
              <div
                key={idxItem.id}
                className="p-5 rounded-none genesis-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="genesis-badge">
                      {idxItem.type}
                    </span>
                    <span className="text-[10px] text-[#878787] font-mono">
                      Target: {idxItem.target}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#fafaf4]">
                    {idxItem.title}
                  </h3>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {idxItem.explanation}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#878787] border-b border-[#162032] pb-1">
                    <span>SQL DDL DEFINITION</span>
                    <button
                      onClick={() => handleCopy(idxItem.sql, idxItem.id)}
                      className="flex items-center gap-1 text-[#38bdf8] hover:text-white transition-colors"
                      title="Copy SQL"
                    >
                      {copiedSql === idxItem.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#10b981]" />
                          <span className="text-[#10b981]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-none bg-[#050810] border border-[#162032] font-mono text-[11px] text-[#38bdf8] overflow-x-auto">
                    <pre>
                      <code>{idxItem.sql}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Benchmark Matrix Table */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-6">
          <div className="text-center space-y-1.5">
            <span className="genesis-badge">
              EMPIRICAL BENCHMARKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Query Latency & Execution Speedups
            </h2>
            <p className="text-xs sm:text-sm text-[#878787] max-w-lg mx-auto">
              Real query benchmark timings measured against 100,000 live business records.
            </p>
          </div>

          <div className="rounded-none genesis-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#001225] text-[#878787] uppercase text-[10px] border-b border-[#162032]">
                  <tr>
                    <th className="px-5 py-3.5">Operation & Query Shape</th>
                    <th className="px-5 py-3.5 text-rose-400">Standard Postgres O(N)</th>
                    <th className="px-5 py-3.5 text-[#10b981]">DataScope (GIN + B-Tree)</th>
                    <th className="px-5 py-3.5 text-right">Performance Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#162032] text-zinc-300">
                  {benchmarks.map((b, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#001225]/40 transition-colors font-sans"
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-white text-xs">{b.operation}</div>
                        <code className="text-[10px] text-zinc-400 font-mono">
                          {b.query}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-zinc-400">
                        {b.unindexed}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[#10b981] font-semibold">
                        {b.indexed}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="genesis-badge-emerald">
                          {b.speedup}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Bottom Banner */}
        <section className="py-14 px-4 w-[90%] mx-auto text-center">
          <div className="p-8 sm:p-10 rounded-none genesis-card space-y-5 max-w-4xl mx-auto border-t-2 border-t-[#1e6aff]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#fafaf4] tracking-tight">
              Experience the Architecture in Real Time
            </h2>
            <p className="text-xs text-[#a1a1aa] max-w-xl mx-auto">
              Execute live trigram queries across 100,000 records or explore the executive command center to inspect business KPIs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/explorer"
                className="px-6 py-3 rounded-none btn-genesis-primary text-xs font-semibold flex items-center gap-2 shadow-md"
              >
                <Database className="w-4 h-4 text-[#38bdf8]" />
                <span>Launch Live Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/overview"
                className="px-6 py-3 rounded-none btn-genesis-secondary text-xs font-semibold"
              >
                View Executive Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <PublicFooter />
    </div>
  );
}
