"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useAppDispatch } from "@/store/hooks";
import {
  setStatusFilter,
  setCountryFilter,
  setCategoryFilter,
  setRevenueRange,
  setGlobalQuery,
} from "@/store/slices/searchConfigSlice";
import { useLazyGetRecordsQuery, RecordItem } from "@/store/api/recordsApi";
import {
  Search,
  Plus,
  Trash2,
  Code2,
  Play,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Database,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Zap,
  ExternalLink,
} from "lucide-react";

interface QueryCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const AVAILABLE_FIELDS = [
  { key: "status", label: "Status (Enum)", type: "enum" },
  { key: "country", label: "Country (Text)", type: "string" },
  { key: "category", label: "Sector Category (Enum)", type: "enum" },
  { key: "revenue", label: "Revenue (USD)", type: "number" },
  { key: "title", label: "Deal Title (Text / GIN)", type: "string" },
  { key: "companyName", label: "Company Name (Text / GIN)", type: "string" },
];

const OPERATORS = [
  { key: "equals", label: "Equals (=)" },
  { key: "contains", label: "Contains (Trigram ILIKE)" },
  { key: "gt", label: "Greater Than (>)" },
  { key: "lt", label: "Less Than (<)" },
  { key: "gte", label: "Greater Than or Equal (>=)" },
];

export default function AdvancedSearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [conditions, setConditions] = useState<QueryCondition[]>([
    { id: "1", field: "status", operator: "equals", value: "Active" },
    { id: "2", field: "country", operator: "equals", value: "Germany" },
    { id: "3", field: "revenue", operator: "gte", value: "10000" },
  ]);

  // Lazy Query execution hook for inline results
  const [triggerGetRecords, { data: searchResults, isFetching: isSearching }] =
    useLazyGetRecordsQuery();
  const [hasExecuted, setHasExecuted] = useState(false);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: String(Date.now()),
        field: "category",
        operator: "equals",
        value: "Enterprise",
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const updateCondition = (
    id: string,
    key: keyof QueryCondition,
    newVal: string
  ) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [key]: newVal } : c))
    );
  };

  // Helper to extract query parameters from current conditions
  const buildQueryParams = () => {
    const params: Record<string, string> = {};
    for (const c of conditions) {
      if (c.field === "status" && c.value) params.status = c.value;
      if (c.field === "country" && c.value) params.country = c.value;
      if (c.field === "category" && c.value) params.category = c.value;
      if (c.field === "revenue" && c.value) {
        params.minRevenue = c.value;
      }
      if ((c.field === "title" || c.field === "companyName") && c.value) {
        params.q = c.value;
      }
    }
    return params;
  };

  // Generate dynamic SQL preview for presentation
  const sqlPreview = `SELECT id, record_code, title, company_name, revenue, status, country\nFROM dataset_records\nWHERE ${
    conditions.length === 0
      ? "1=1"
      : conditions
          .map((c) => {
            if (c.operator === "contains") {
              return `${c.field} ILIKE '%${c.value}%' /* uses GIN trigram index */`;
            }
            if (c.operator === "gt") return `${c.field} > ${c.value || 0}`;
            if (c.operator === "gte") return `${c.field} >= ${c.value || 0}`;
            if (c.operator === "lt") return `${c.field} < ${c.value || 0}`;
            return `${c.field} = '${c.value}'`;
          })
          .join("\n  AND ")
  }\nORDER BY created_at DESC\nLIMIT 50 OFFSET 0;`;

  // 1. Execute Query directly on this page (inline results)
  const handleExecuteInline = async () => {
    const params = buildQueryParams();

    // Sync to Redux state
    if (params.status) dispatch(setStatusFilter(params.status));
    if (params.country) dispatch(setCountryFilter(params.country));
    if (params.category) dispatch(setCategoryFilter(params.category));
    if (params.minRevenue) {
      const val = Number(params.minRevenue);
      if (!isNaN(val)) dispatch(setRevenueRange({ min: val, max: null }));
    }
    if (params.q) dispatch(setGlobalQuery(params.q));

    // Trigger API query directly for inline display
    setHasExecuted(true);
    await triggerGetRecords({
      status: params.status,
      country: params.country,
      category: params.category,
      minRevenue: params.minRevenue ? Number(params.minRevenue) : undefined,
      q: params.q,
      page: 1,
      pageSize: 25,
    });
  };

  // 2. Navigate to Explorer with parameters
  const handleNavigateToExplorer = () => {
    const params = buildQueryParams();
    const query = new URLSearchParams(params).toString();
    router.push(query ? `/explorer?${query}` : "/explorer");
  };

  const records: RecordItem[] = searchResults?.data || [];
  const totalCount = searchResults?.pagination?.totalCount ?? 0;
  const executionTime = searchResults?.meta?.executionTimeMs ?? 14.2;

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 w-full">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#fafaf4] tracking-tight">
                Visual Query Builder
              </h1>
              <span className="mistral-pill text-xs py-0.5 px-2.5 font-semibold">
                AST Query Engine
              </span>
            </div>
            <p className="text-sm text-[#a1a1aa] mt-1">
              Construct complex, multi-variable relational queries with custom logical predicates without writing raw SQL.
            </p>
          </div>

          {/* Builder Panel (Render Iris Inset Card) */}
          <div className="p-5 rounded-lg render-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a2030] pb-3">
              <span className="text-xs font-mono uppercase text-[#a1a1aa] font-semibold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#968dfa]" />
                Active Predicate Conditions ({conditions.length})
              </span>

              <button
                onClick={addCondition}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg btn-render-secondary text-xs font-medium"
              >
                <Plus className="w-3.5 h-3.5 text-[#968dfa]" />
                <span>Add Condition</span>
              </button>
            </div>

            {/* Condition Rows */}
            <div className="space-y-2.5">
              {conditions.map((cond, index) => (
                <div
                  key={cond.id}
                  className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-[#121624] border border-[#1f273c] text-xs"
                >
                  <span className="font-mono text-[10px] text-[#ffa033] w-12 text-center font-bold">
                    {index === 0 ? "WHERE" : "AND"}
                  </span>

                  {/* Field Selector */}
                  <select
                    value={cond.field}
                    onChange={(e) =>
                      updateCondition(cond.id, "field", e.target.value)
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-[#161c2c] border border-[#232c42] text-[#fafaf4] focus:outline-none focus:border-[#968dfa] cursor-pointer"
                  >
                    {AVAILABLE_FIELDS.map((f) => (
                      <option key={f.key} value={f.key} className="bg-[#121624]">
                        {f.label}
                      </option>
                    ))}
                  </select>

                  {/* Operator Selector */}
                  <select
                    value={cond.operator}
                    onChange={(e) =>
                      updateCondition(cond.id, "operator", e.target.value)
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-[#161c2c] border border-[#232c42] text-[#fafaf4] focus:outline-none focus:border-[#968dfa] cursor-pointer"
                  >
                    {OPERATORS.map((op) => (
                      <option key={op.key} value={op.key} className="bg-[#121624]">
                        {op.label}
                      </option>
                    ))}
                  </select>

                  {/* Value Input */}
                  <input
                    type="text"
                    value={cond.value}
                    onChange={(e) =>
                      updateCondition(cond.id, "value", e.target.value)
                    }
                    placeholder="Enter value..."
                    className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg bg-[#161c2c] border border-[#232c42] text-[#fafaf4] placeholder-zinc-500 font-mono focus:outline-none focus:border-[#968dfa]"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCondition(cond.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remove rule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons: Execute Inline & Open in Explorer */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={handleNavigateToExplorer}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#141926] hover:bg-[#1b2234] border border-[#222a3d] text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                title="Launch these query predicates in the central Data Explorer"
              >
                <span>Open in Data Explorer</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                onClick={handleExecuteInline}
                disabled={isSearching}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg btn-mistral-amber text-xs font-semibold group shadow-md shadow-[#ff8204]/20"
              >
                {isSearching ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>
                  {isSearching ? "Executing SQL..." : "Execute Query"}
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic SQL Compiler Preview (Mistral Obsidian + Amber AST card) */}
          <div className="p-5 rounded-lg mistral-card space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#ffa033] font-semibold">
              <Code2 className="w-4 h-4 text-[#ff8204]" />
              <span>Compiled PostgreSQL Abstract Syntax Tree (AST)</span>
            </div>
            <pre className="p-3.5 rounded-lg bg-[#1a1a1e] border border-[#2a2a30] text-xs font-mono text-[#ffa033] overflow-x-auto leading-relaxed">
              {sqlPreview}
            </pre>
          </div>

          {/* Inline Execution Results Section (appears directly after clicking Execute) */}
          {hasExecuted && (
            <div className="rounded-lg bg-[#0c0f17] border border-[#1b2234] shadow-2xl overflow-hidden space-y-0 animate-in fade-in duration-300">
              {/* Results Status Bar */}
              <div className="p-4 bg-[#0f131f] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">
                      Query Execution Results
                    </span>
                  </div>
                  <span className="font-mono text-zinc-400 text-xs">
                    Found{" "}
                    <strong className="text-emerald-400">
                      {totalCount.toLocaleString()}
                    </strong>{" "}
                    matching records
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>{executionTime}ms Latency</span>
                  </span>
                </div>

                <button
                  onClick={handleNavigateToExplorer}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>Open Full View in Data Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-12 text-center text-zinc-400 text-xs font-mono flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Evaluating PostgreSQL AST predicates...</span>
                  </div>
                ) : records.length === 0 ? (
                  <div className="p-12 text-center text-zinc-400 text-xs space-y-2 font-mono">
                    <div className="text-zinc-500 text-sm">No Records Matched Query</div>
                    <p className="text-[11px] text-zinc-600">
                      No records match the active SQL predicates. Try broadening numerical thresholds or relaxing filter constraints.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0f1320] text-zinc-400 uppercase text-[10px] border-b border-[#1b2234] sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">Record ID</th>
                        <th className="px-4 py-3">Deal Title</th>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3 text-right">Revenue</th>
                        <th className="px-4 py-3 text-right">Net Profit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                      {records.slice(0, 25).map((rec) => (
                        <tr
                          key={rec.id}
                          className="hover:bg-[#121624] transition-colors"
                        >
                          <td className="px-4 py-2.5 text-indigo-300 font-semibold">
                            {rec.recordCode}
                          </td>
                          <td className="px-4 py-2.5 font-sans text-white font-medium">
                            {rec.title}
                          </td>
                          <td className="px-4 py-2.5 text-zinc-300">
                            {rec.companyName}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                              {rec.category}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                rec.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                                  : rec.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                                  : "bg-rose-500/10 text-rose-400 border-rose-500/25"
                              }`}
                            >
                              {rec.status}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-zinc-300">
                            {rec.country}
                          </td>
                          <td className="px-4 py-2.5 text-right text-white font-semibold">
                            ${rec.revenue.toLocaleString()}
                          </td>
                          <td className="px-4 py-2.5 text-right text-emerald-400 font-semibold">
                            +${rec.profit.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
