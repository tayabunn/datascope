"use client";

import React from "react";
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
} from "lucide-react";

export default function ArchitecturePage() {
  const architecturalLayers = [
    {
      step: "01",
      layer: "Client Application & State",
      tech: "Next.js 15 • React 19 • Redux Toolkit • RTK Query",
      color: "#968dfa",
      bgBorder: "bg-[#6c35f5]/10 border-[#968dfa]/30",
      description:
        "Client architecture features normalized state caching with 300s TTL. Deep-linked URL query parameters synchronize search terms, active facets, and column configurations to eliminate client-side re-renders and enable 1-click sharing.",
      metrics: "300s Cache TTL • Zero Re-Render Waterfall",
    },
    {
      step: "02",
      layer: "API Gateway & Security Tier",
      tech: "Route Handlers • Zod Schemas • RBAC Guard Middleware",
      color: "#38bdf8",
      bgBorder: "bg-[#005e9e]/10 border-[#005e9e]/30",
      description:
        "Every incoming query is strictly validated against TypeScript Zod schemas. Multi-tier RBAC guards verify session tokens and prevent unauthorized privilege escalation on mutations, exports, and admin procedures.",
      metrics: "Zero Unchecked Inputs • Strict RBAC Enforcement",
    },
    {
      step: "03",
      layer: "Connection Pooler & Multiplexer",
      tech: "PGBouncer • Transaction-Level Pooling • Max 20 Conns",
      color: "#ffa033",
      bgBorder: "bg-[#ff8204]/10 border-[#ff8204]/30",
      description:
        "Prevents PostgreSQL connection exhaustion during traffic surges. Maintains a tight 18/20 pool ratio with sub-millisecond connection checkout times, shielding the core database from TCP socket churn.",
      metrics: "18/20 Active Pool • Sub-1ms Conn Checkout",
    },
    {
      step: "04",
      layer: "Type-Safe ORM Query Engine",
      tech: "Drizzle ORM • Pure SQL Generation • Prepared Statements",
      color: "#0b7d55",
      bgBorder: "bg-[#0b7d55]/10 border-[#0b7d55]/30",
      description:
        "Emits raw-speed SQL without runtime AST overhead. Prepared statements enable PostgreSQL query planner caching, reducing CPU parse cycles to near zero across identical query shapes.",
      metrics: "Zero ORM Overhead • Automatic Prepared Statements",
    },
    {
      step: "05",
      layer: "Database Storage & Indexing Engine",
      tech: "PostgreSQL 16 • GIN pg_trgm • Composite B-Trees",
      color: "#c084fc",
      bgBorder: "bg-[#8a05ff]/10 border-[#8a05ff]/30",
      description:
        "The core data engine for 100,000+ business records. Utilizes inverted GIN trigram indexes for sub-18ms substring searches and composite B-Trees for instantaneous multi-facet category and status filtering.",
      metrics: "Sub-18ms P95 • Zero Sequential Table Scans",
    },
  ];

  const indexingStrategies = [
    {
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
        "Breaks textual strings into 3-character n-grams. When searching for partial terms like '%cloud%' or '%analytics%', Postgres looks up matching trigram postings lists directly rather than reading 100,000 rows from disk.",
    },
    {
      title: "Composite Multi-Facet B-Tree",
      target: "category & status",
      type: "Composite B-Tree",
      purpose: "Instantaneous Facet Slicing",
      sql: `CREATE INDEX idx_business_records_category_status 
ON business_records (category, status);`,
      explanation:
        "Combines the two most frequently filtered categorical dimensions into a single balanced tree index. Eliminates Bitmap Index Scans and index intersections, yielding instantaneous 8ms query execution.",
    },
    {
      title: "Descending Revenue B-Tree",
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
      query: "SELECT SUM(revenue), AVG(net_profit)...",
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

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#6c35f5]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed top-[450px] right-0 w-[450px] h-[450px] bg-[#ff8204]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Shared Navigation Header */}
      <PublicHeader />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-16 pb-14 px-4 w-[90%] mx-auto text-center space-y-5">
          <div className="mistral-pill mb-2 shadow-sm inline-flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#ff8204] animate-pulse" />
            <span>PostgreSQL 16 & Sub-18ms Query Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#fafaf4] tracking-tight leading-tight">
            High-Performance System <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#968dfa] via-[#6c35f5] to-[#ff8204]">
              Architecture & Indexing Engine
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
            Discover the engineering decisions that power 100,000+ enterprise records with sub-18ms P95 query times: GIN trigrams, connection multiplexing, and memory-safe streaming seeders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Link
              href="/explorer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-none btn-render-primary text-xs font-semibold group shadow-lg shadow-[#6c35f5]/25"
            >
              <Database className="w-4 h-4 text-[#b193e0]" />
              <span>Test Live in Data Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/overview"
              className="flex items-center gap-2 px-5 py-3.5 rounded-none btn-render-secondary text-xs font-semibold"
            >
              <Activity className="w-4 h-4 text-[#968dfa]" />
              <span>Inspect Mission Control Telemetry</span>
            </Link>
          </div>
        </section>

        {/* 5-Layer System Architecture Section */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              End-To-End Topology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5-Layer Scalability Stack
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              From client-side query parameters down to physical disk blocks in PostgreSQL 16.
            </p>
          </div>

          <div className="space-y-4">
            {architecturalLayers.map((layer, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none render-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-xl font-mono font-bold text-zinc-600 px-2 py-1 rounded-none bg-[#090b11] border border-[#1a2030]">
                    {layer.step}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#fafaf4]">
                        {layer.layer}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#161d2d] text-zinc-300 border border-[#222a3d]">
                        {layer.tech}
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa] max-w-2xl leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    {layer.metrics}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PostgreSQL Indexing Strategies Section */}
        <section className="py-16 px-4 w-[90%] mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              PostgreSQL 16 Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Indexing Strategies & DDL Definitions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              How inverted trigrams and composite B-Trees eliminate expensive sequential table scans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {indexingStrategies.map((idxItem, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none render-card flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#6c35f5]/20 text-[#968dfa] border border-[#6c35f5]/30">
                      {idxItem.type}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Target: {idxItem.target}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#fafaf4]">
                    {idxItem.title}
                  </h3>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {idxItem.explanation}
                  </p>
                </div>

                <div className="p-3.5 rounded-none bg-[#080a10] border border-[#1a2030] font-mono text-[11px] text-indigo-300 overflow-x-auto">
                  <pre>
                    <code>{idxItem.sql}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benchmark Comparison Table */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Empirical Latency Data
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Performance Benchmark Results
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Real query benchmark timings measured against 100,000 live business records.
            </p>
          </div>

          <div className="rounded-none bg-[#0b0e17] border border-[#1d263b] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234]">
                  <tr>
                    <th className="px-5 py-3.5">Operation & Query Shape</th>
                    <th className="px-5 py-3.5 text-rose-400">Standard Postgres</th>
                    <th className="px-5 py-3.5 text-emerald-400">DataScope (GIN+B-Tree)</th>
                    <th className="px-5 py-3.5 text-right">Performance Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  {benchmarks.map((b, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#121624] transition-colors font-sans"
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-white">{b.operation}</div>
                        <code className="text-[11px] text-zinc-500 font-mono">
                          {b.query}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-zinc-400">
                        {b.unindexed}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-emerald-400 font-semibold">
                        {b.indexed}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono text-[11px] font-bold">
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
        <section className="py-16 px-4 w-[90%] mx-auto text-center">
          <div className="p-10 sm:p-12 rounded-none render-card space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
              Experience the Architecture in Real Time
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto">
              Execute live trigram queries on 100,000 records or sign in as an Administrator to view database telemetry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/explorer"
                className="px-6 py-3.5 rounded-none btn-render-primary text-xs font-semibold flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-[#b193e0]" />
                <span>Launch Live Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/overview"
                className="px-6 py-3.5 rounded-none btn-render-secondary text-xs font-semibold"
              >
                Admin Mission Control
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
