"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Database,
  Search,
  Zap,
  ShieldCheck,
  BarChart3,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Server,
  Layers,
  SlidersHorizontal,
  TableProperties,
  Cpu,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: BarChart3,
      title: "Server-Side SQL Aggregations",
      badge: "Zero Client Memory Bloat",
      color: "#968dfa",
      bgBorder: "bg-[#6c35f5]/10 border-[#968dfa]/30",
      description:
        "Computes portfolio revenues, category-level breakdowns, transaction counts, and growth trends entirely in PostgreSQL. No giant 100k raw-record payloads sent across the network.",
      bullets: [
        "Aggregate queries execute in under 19ms on PostgreSQL 16",
        "Calculates SUM, AVG, MIN, MAX without browser freezing",
        "Zero memory overhead on low-end mobile and tablet devices",
      ],
      codeSnippet: `SELECT category, status, COUNT(*), SUM(revenue) 
FROM business_records 
GROUP BY category, status;`,
    },
    {
      icon: Search,
      title: "GIN Trigram Fuzzy Search Engine",
      badge: "Sub-18ms Substring Queries",
      color: "#ffa033",
      bgBorder: "bg-[#ff8204]/10 border-[#ff8204]/30",
      description:
        "PostgreSQL pg_trgm inverted indexes enable instant fuzzy matching across deal titles, company names, and SKUs without sequential table scans.",
      bullets: [
        "Inverted trigram index on deal_title & company attributes",
        "Tolerates minor typos, partial words, and prefixes",
        "Deterministic index scans instead of O(N) full-table iterations",
      ],
      codeSnippet: `CREATE INDEX gin_trgm_deal_title 
ON business_records 
USING gin (deal_title gin_trgm_ops);`,
    },
    {
      icon: BookmarkCheck,
      title: "Deep-Linked URL State Synchronization",
      badge: "Shareable Team Presets",
      color: "#38bdf8",
      bgBorder: "bg-[#005e9e]/10 border-[#005e9e]/30",
      description:
        "Every search token, active filter facet, sort column, and page index is synchronized with URL search parameters in real time.",
      bullets: [
        "Bookmark or send URLs to colleagues with exact filters intact",
        "Browser back and forward navigation works flawlessly without reloading",
        "Supports saved views saved directly to database state",
      ],
      codeSnippet: `/explorer?q=Cloud&status=Active&sort=revenue_desc&page=1`,
    },
    {
      icon: ShieldCheck,
      title: "3-Tier Enterprise Role-Based Access Control",
      badge: "Strict Privilege Guard",
      color: "#c084fc",
      bgBorder: "bg-[#8a05ff]/10 border-[#8a05ff]/30",
      description:
        "Enforces strict boundaries between Administrator, Data Analyst, and Viewer roles with immutable audit logging on all data mutations.",
      bullets: [
        "Admin: Full cluster operations, cache flushing, VACUUM, and audit logs",
        "Analyst: Data inspection, composite queries, CSV export, and record edits",
        "Viewer: Secure read-only exploration with export and mutation locked",
      ],
      codeSnippet: `// RBAC Privilege Guard
if (user.role === 'Viewer') {
  throw new ForbiddenError('Export and edit restricted');
}`,
    },
    {
      icon: TableProperties,
      title: "Dynamic Column Management & Virtualization",
      badge: "11+ Schema Attributes",
      color: "#0b7d55",
      bgBorder: "bg-[#0b7d55]/10 border-[#0b7d55]/30",
      description:
        "Customize table layout dynamically by showing, hiding, and resizing 11 schema columns with frozen ID anchors for optimal scanning.",
      bullets: [
        "Sticky frozen Record ID column during horizontal table scrolling",
        "Dynamic column chooser popup with one-click toggles",
        "Compact, Normal, and Spacious density options for financial analysts",
      ],
      codeSnippet: `const [visibleCols, setVisibleCols] = useState([
  'dealTitle', 'company', 'category', 'status', 'revenue'
]);`,
    },
    {
      icon: Zap,
      title: "RTK Query Normalized Cache & 300s Retention",
      badge: "Zero Waterfall Requests",
      color: "#968dfa",
      bgBorder: "bg-[#6c35f5]/10 border-[#968dfa]/30",
      description:
        "Client queries are cached in memory with a 300-second retention window. Navigating between views, records, and search queries yields instant responses.",
      bullets: [
        "Instant back-and-forth navigation with zero network loading spinners",
        "Automated tag-based cache invalidation when records are edited",
        "Optimistic UI updates with automatic rollback on network failure",
      ],
      codeSnippet: `// RTK Query Cache Tagging
providesTags: (result) => [
  { type: 'Records', id: 'LIST' },
  ...result.data.map(({ id }) => ({ type: 'Records', id }))
]`,
    },
  ];

  const rbacMatrix = [
    {
      capability: "Browse & Search 100k Records",
      viewer: true,
      analyst: true,
      admin: true,
    },
    {
      capability: "Multi-Predicate Filter Builder (Status, Category, Country)",
      viewer: true,
      analyst: true,
      admin: true,
    },
    {
      capability: "Dynamic Column Customization & Density Controls",
      viewer: true,
      analyst: true,
      admin: true,
    },
    {
      capability: "Inspect Detailed Record Schema & Timestamps",
      viewer: true,
      analyst: true,
      admin: true,
    },
    {
      capability: "Save & Manage Custom Filter Views",
      viewer: false,
      analyst: true,
      admin: true,
    },
    {
      capability: "Export Filtered Datasets to CSV (RFC 4180)",
      viewer: false,
      analyst: true,
      admin: true,
    },
    {
      capability: "Edit & Update Record Business Fields",
      viewer: false,
      analyst: true,
      admin: true,
    },
    {
      capability: "Database Vacuum, Cache Flush & GIN Reindexing",
      viewer: false,
      analyst: false,
      admin: true,
    },
    {
      capability: "Access Security Audit Trail & Mission Control",
      viewer: false,
      analyst: false,
      admin: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#6c35f5]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="fixed top-[450px] right-0 w-[450px] h-[450px] bg-[#ff8204]/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Shared Navigation Header */}
      <PublicHeader />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-16 pb-14 px-4 w-[90%] mx-auto text-center space-y-5">
          <div className="mistral-pill mb-2 shadow-sm inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8204] animate-pulse" />
            <span>Enterprise Feature Specification</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#fafaf4] tracking-tight leading-tight">
            High-Performance Capabilities for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#968dfa] via-[#6c35f5] to-[#ff8204]">
              Large-Scale Data Intelligence
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
            Every feature in DataScope is engineered to eliminate data latency, enforce zero-leak security boundaries, and provide an effortless exploration experience across 100,000+ enterprise records.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/explorer"
              className="flex items-center gap-2 px-6 py-3 rounded-none btn-render-primary text-xs font-semibold group"
            >
              <Database className="w-4 h-4 text-[#b193e0]" />
              <span>Launch Live Data Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/architecture"
              className="flex items-center gap-2 px-5 py-3 rounded-none btn-render-secondary text-xs font-semibold"
            >
              <Cpu className="w-4 h-4 text-[#968dfa]" />
              <span>Explore Architecture & Indexing</span>
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="py-12 px-4 w-[90%] mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Deep Architectural Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Six Enterprise Pillars
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Inspect how server-side Postgres engines, Redux state synchronization, and GIN trigrams work in harmony.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-none render-card flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-11 h-11 rounded-none ${feat.bgBorder} border flex items-center justify-center`}
                        style={{ color: feat.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#161d2d] border border-[#232c42] text-zinc-300">
                        {feat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#fafaf4] tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#a1a1aa] mt-1.5 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {feat.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-xs text-zinc-300"
                        >
                          <span className="text-emerald-400 font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code snippet block */}
                  <div className="p-3 rounded-none bg-[#080a10] border border-[#1a2030] font-mono text-[11px] text-zinc-400 overflow-x-auto">
                    <pre className="text-indigo-300 leading-tight">
                      <code>{feat.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RBAC Permission Matrix Section */}
        <section className="py-16 px-4 w-[90%] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Security & Access Isolation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Role-Based Permission Matrix (RBAC)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              DataScope enforces strict privilege partitioning across user classifications to ensure compliance and data integrity.
            </p>
          </div>

          <div className="rounded-none bg-[#0b0e17] border border-[#1d263b] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[11px] border-b border-[#1b2234]">
                  <tr>
                    <th className="px-5 py-3.5">Platform Capability</th>
                    <th className="px-5 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-none bg-zinc-800 text-zinc-300">
                        Viewer
                      </span>
                    </th>
                    <th className="px-5 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-none bg-indigo-950 text-indigo-300 border border-indigo-700/40">
                        Data Analyst
                      </span>
                    </th>
                    <th className="px-5 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-none bg-[#6c35f5]/20 text-[#968dfa] border border-[#6c35f5]/40 font-bold">
                        Administrator
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                  {rbacMatrix.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#121624] transition-colors font-sans"
                    >
                      <td className="px-5 py-3 text-xs text-zinc-200 font-medium">
                        {row.capability}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.viewer ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.analyst ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {row.admin ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-zinc-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 w-[90%] mx-auto text-center">
          <div className="p-10 sm:p-12 rounded-none render-card space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
              Test These Capabilities Live
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto">
              Launch into the 100,000 record grid with instant trigram filtering, density controls, and URL synchronization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/explorer"
                className="px-6 py-3 rounded-none btn-render-primary text-xs font-semibold flex items-center gap-2"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Launch Data Explorer</span>
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-none btn-render-secondary text-xs font-semibold"
              >
                Sign In to Test Admin Role
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
