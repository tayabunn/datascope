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
import { Sparkles, X, ArrowRight, CheckCircle2, CornerDownLeft } from "lucide-react";

interface AiSearchModalProps {
  onClose: () => void;
}

const EXAMPLE_PROMPTS = [
  "Find active customers from Germany with revenue greater than $10,000",
  "Show urgent deals in United Kingdom with high revenue",
  "Top enterprise accounts in Japan sorted by profit",
  "Pending deals in France with revenue over 50k",
];

export default function AiSearchModal({ onClose }: AiSearchModalProps) {
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: queryText }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (e) {
      console.error(e);
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
              <h3 className="text-sm font-semibold text-white">
                AI Natural Language Search Assistant
              </h3>
              <p className="text-xs text-zinc-400">
                Describe what you want in plain English; DataScope converts it to SQL filters.
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
              placeholder="e.g. Find active customers from Germany with revenue greater than $10,000..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#141a29] border border-[#252f47] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-sans pr-24"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1 transition-all"
            >
              {isLoading ? "Parsing..." : "Translate"}
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

        {/* Translation Results Preview */}
        {result && (
          <div className="p-3.5 rounded-lg bg-[#121724] border border-indigo-500/30 space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Validated Filter Configuration Generated:</span>
            </div>
            <pre className="p-2.5 rounded bg-[#0b0e17] text-[11px] font-mono text-indigo-300 border border-[#1b2236] overflow-x-auto">
              {JSON.stringify(result.filterConfig, null, 2)}
            </pre>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
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

