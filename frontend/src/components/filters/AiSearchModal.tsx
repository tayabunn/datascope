"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setStatusFilter,
  setCountryFilter,
  setCategoryFilter,
  setRevenueRange,
  setGlobalQuery,
} from "@/store/slices/searchConfigSlice";
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  CornerDownLeft,
  ShieldCheck,
  AlertTriangle,
  Cpu,
} from "lucide-react";

interface AiSearchModalProps {
  onClose: () => void;
}

const EXAMPLE_PROMPTS = [
  "Find active customers from Germany with revenue greater than $50,000",
  "Show urgent deals in United Kingdom with high revenue",
  "Top enterprise accounts in Japan sorted by profit",
  "Pending deals in France with revenue over 50k",
];

export default function AiSearchModal({ onClose }: AiSearchModalProps) {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setErrorMessage(data.error?.message || "Failed to process query.");
      }
    } catch (e: any) {
      setErrorMessage(e?.message || "Network error while calling AI assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!result?.filterConfig) return;
    const cfg = result.filterConfig;

    if (cfg.status) dispatch(setStatusFilter(cfg.status));
    if (cfg.country) dispatch(setCountryFilter(cfg.country));
    if (cfg.category) dispatch(setCategoryFilter(cfg.category));
    if (cfg.minRevenue != null) {
      dispatch(setRevenueRange({ min: cfg.minRevenue, max: null }));
    }
    if (cfg.search) {
      dispatch(setGlobalQuery(cfg.search));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f131d] border border-[#232c42] rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1f273b] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  AI Natural Language Search Assistant
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  Tool Calling + Guardrails
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Describe your query in plain English; DataScope translates it to typed SQL parameters.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#1a2133]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate(prompt);
          }}
          className="space-y-2"
        >
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="e.g. Find active customers from Germany with revenue greater than $50,000..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141a29] border border-[#252f47] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-sans pr-24"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1 transition-all"
            >
              {isLoading ? "Analyzing..." : "Translate"}
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </div>

          {/* Example prompt pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-zinc-400 self-center">Try:</span>
            {EXAMPLE_PROMPTS.map((ex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(ex);
                  handleGenerate(ex);
                }}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#161c2c] border border-[#232b40] text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-all truncate max-w-[280px]"
              >
                {ex}
              </button>
            ))}
          </div>
        </form>

        {/* Error / Guardrail Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Query Processing Failed</p>
              <p className="text-[11px] text-rose-300/80 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Translation Results Preview with Tool Calling & Guardrails */}
        {result && (
          <div className="p-3.5 rounded-lg bg-[#121724] border border-indigo-500/30 space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Validated Query Tool Call Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Guardrails Passed
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  <Cpu className="w-3 h-3" />
                  {result.metadata?.provider || "Engine"}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#0b0e17] text-[11px] font-mono text-indigo-300 border border-[#1b2236] overflow-x-auto space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">
                Tool: {result.toolCall?.name || "query_dataset_records"}
              </div>
              <pre>{JSON.stringify(result.toolCall?.arguments || result.filterConfig, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-zinc-400 truncate max-w-[340px]">
                {result.metadata?.summary || result.interpretation}
              </p>
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all shrink-0"
              >
                <span>Apply to Data Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
