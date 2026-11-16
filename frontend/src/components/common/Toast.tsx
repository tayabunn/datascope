"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeToast, ToastItem } from "@/store/slices/toastSlice";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";

function SingleToast({ toast }: { toast: ToastItem }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
  };

  const borderColors = {
    success: "border-emerald-500/30 bg-[#0c141d]",
    info: "border-cyan-500/30 bg-[#0d1524]",
    warning: "border-amber-500/30 bg-[#1c1810]",
    error: "border-rose-500/30 bg-[#1a1015]",
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border ${borderColors[toast.type]} shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 fade-in duration-200 min-w-[280px] max-w-sm`}
    >
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 space-y-0.5">
        <h4 className="text-xs font-semibold text-white tracking-tight">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="text-zinc-500 hover:text-zinc-300 transition-colors p-0.5"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useAppSelector((state) => state.toast);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <SingleToast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

