"use client";

import React, { useState } from "react";
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
import {
  Search,
  Plus,
  Trash2,
  Code2,
  Play,
  SlidersHorizontal,
  Layers,
  Sparkles,
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

  const handleExecute = () => {
    // Apply conditions to Redux search state
    for (const c of conditions) {
      if (c.field === "status") dispatch(setStatusFilter(c.value));
      if (c.field === "country") dispatch(setCountryFilter(c.value));
      if (c.field === "category") dispatch(setCategoryFilter(c.value));
      if (c.field === "revenue") {
        const val = Number(c.value);
        if (!isNaN(val)) dispatch(setRevenueRange({ min: val, max: null }));
      }
      if (c.field === "title" || c.field === "companyName") {
        dispatch(setGlobalQuery(c.value));
      }
    }

    router.push("/explorer");
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-5xl mx-auto w-full">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Visual Query Builder
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                AST Query Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Construct complex, multi-variable relational queries with custom logical predicates without writing raw SQL.
            </p>
          </div>

          {/* Builder Panel */}
          <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1b2234] pb-3">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                Active Predicate Conditions ({conditions.length})
              </span>

              <button
                onClick={addCondition}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white text-xs font-medium transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                <span>Add Condition</span>
              </button>
            </div>

            {/* Condition Rows */}
            <div className="space-y-2.5">
              {conditions.map((cond, index) => (
                <div
                  key={cond.id}
                  className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-[#121624] border border-[#1e273b] text-xs"
                >
                  <span className="font-mono text-[10px] text-zinc-500 w-12 text-center font-bold">
                    {index === 0 ? "WHERE" : "AND"}
                  </span>

                  {/* Field Selector */}
                  <select
                    value={cond.field}
                    onChange={(e) =>
                      updateCondition(cond.id, "field", e.target.value)
                    }
                    className="px-2.5 py-1.5 rounded bg-[#161c2c] border border-[#232c42] text-zinc-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
                    className="px-2.5 py-1.5 rounded bg-[#161c2c] border border-[#232c42] text-zinc-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
                    className="flex-1 min-w-[140px] px-3 py-1.5 rounded bg-[#161c2c] border border-[#232c42] text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCondition(cond.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                    title="Remove rule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Execute Query Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleExecute}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute & View Results</span>
              </button>
            </div>
          </div>

          {/* Dynamic SQL Compiler Preview */}
          <div className="p-5 rounded-xl bg-[#0f131f] border border-[#1d2538] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 font-semibold">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Compiled PostgreSQL Abstract Syntax Tree (AST)</span>
            </div>
            <pre className="p-3.5 rounded-lg bg-[#0a0d14] border border-[#1a2133] text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              {sqlPreview}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}
