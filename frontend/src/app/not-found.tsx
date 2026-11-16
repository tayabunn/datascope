import React from "react";
import Link from "next/link";
import DataScopeLogo from "@/components/common/DataScopeLogo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f3f7] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/25 text-white mb-6 p-3">
        <DataScopeLogo className="w-full h-full text-white" />
      </div>

      <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold mb-3">
        404 — Resource Not Found
      </span>

      <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
        Page or Dataset Not Found
      </h1>
      <p className="text-sm text-zinc-400 max-w-md mb-8">
        The view or endpoint you requested is not currently mapped in the DataScope catalog.
      </p>

      <Link
        href="/explorer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Data Explorer
      </Link>
    </div>
  );
}
