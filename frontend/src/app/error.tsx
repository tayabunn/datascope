"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("DataScope Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-none bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/25 text-white mb-6 p-3">
        <DataScopeLogo className="w-full h-full text-white" />
      </div>

      <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold mb-3">
        System Notice — Cluster Recovery
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        An unexpected state occurred
      </h1>
      <p className="text-xs text-zinc-400 max-w-md mb-6 font-mono">
        {error.message || "A runtime reconciliation exception was caught."}
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reload Component
        </button>

        <Link
          href="/explorer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white text-xs font-semibold transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Data Explorer
        </Link>
      </div>
    </div>
  );
}
