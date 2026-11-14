"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeRecordDrawer } from "@/store/slices/uiPreferenceSlice";
import {
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
} from "@/store/api/recordsApi";
import {
  X,
  Building,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Tag,
  Link as LinkIcon,
  History,
  CheckCircle2,
  AlertCircle,
  FileCode,
} from "lucide-react";

export default function RecordDetailDrawer() {
  const dispatch = useAppDispatch();
  const { activeDrawerRecordId } = useAppSelector((state) => state.uiPreference);
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetRecordByIdQuery(
    activeDrawerRecordId || "",
    { skip: !activeDrawerRecordId }
  );

  const [updateRecord, { isLoading: isUpdating }] = useUpdateRecordMutation();

  if (!activeDrawerRecordId) return null;

  const record = data?.data?.record;
  const related = data?.data?.relatedRecords || [];
  const auditLogs = data?.data?.auditLogs || [];

  const handleStatusChange = async (newStatus: any) => {
    if (!record) return;
    try {
      await updateRecord({
        id: record.id,
        changes: { status: newStatus },
      }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0c0f18] border-l border-[#1f2638] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1b2234] flex items-center justify-between bg-[#0e121d]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {record?.recordCode || "LOADING..."}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  record?.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                    : record?.status === "Pending"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/25"
                }`}
              >
                {record?.status}
              </span>
            </div>
            <h2 className="text-base font-semibold text-white truncate max-w-lg">
              {record?.title || "Record Details"}
            </h2>
          </div>

          <button
            onClick={() => dispatch(closeRecordDrawer())}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a2236] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading || !record ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-[#161c2c] rounded-xl" />
              <div className="h-40 bg-[#161c2c] rounded-xl" />
              <div className="h-40 bg-[#161c2c] rounded-xl" />
            </div>
          ) : (
            <>
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1d2436] space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Revenue
                  </div>
                  <div className="text-base font-mono font-bold text-white">
                    ${record.revenue.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1d2436] space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    Net Profit
                  </div>
                  <div className="text-base font-mono font-bold text-emerald-400">
                    ${record.profit.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1d2436] space-y-1">
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    Priority
                  </div>
                  <div className="text-base font-mono font-bold text-amber-400">
                    {record.priority}
                  </div>
                </div>
              </div>

              {/* Status Update Quick Action (RBAC: Admin & Analyst only) */}
              {user?.role !== "Viewer" && (
                <div className="p-3.5 rounded-xl bg-[#101420] border border-[#1f283d] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-zinc-200">
                      Update Operational Status
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Triggered state updates append to immutable audit logs.
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {["Active", "Pending", "Archived"].map((st) => (
                      <button
                        key={st}
                        disabled={isUpdating || record.status === st}
                        onClick={() => handleStatusChange(st)}
                        className={`text-xs px-2.5 py-1 rounded font-mono font-medium transition-all ${
                          record.status === st
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-[#181f30] text-zinc-400 hover:text-white hover:bg-[#222b42]"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Information Grid */}
              <div className="rounded-xl bg-[#121624] border border-[#1d2436] p-4 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold border-b border-[#1c2438] pb-2">
                  Entity Metadata
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div>
                    <span className="text-zinc-500">Target Company:</span>
                    <p className="text-zinc-200 font-medium">{record.companyName}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Industry Category:</span>
                    <p className="text-zinc-200 font-medium">{record.category}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Country of Origin:</span>
                    <p className="text-zinc-200 font-medium">{record.country}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Operating Cost:</span>
                    <p className="text-zinc-200 font-mono">${record.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Client Rating:</span>
                    <p className="text-amber-400 font-mono">★ {record.rating} / 5.0</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Ingested At:</span>
                    <p className="text-zinc-400 font-mono">{record.createdAt.slice(0, 10)}</p>
                  </div>
                </div>

                {record.tags && record.tags.length > 0 && (
                  <div className="pt-2 border-t border-[#1c2438]/70 flex flex-wrap gap-1.5">
                    {record.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#182033] text-indigo-300 border border-indigo-500/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Records (Connected Graph) */}
              <div className="rounded-xl bg-[#121624] border border-[#1d2436] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold border-b border-[#1c2438] pb-2">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Related Business Records</span>
                </div>
                <div className="space-y-2">
                  {related.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#0e121d] border border-[#1c2336] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-medium text-zinc-200">
                          {rel.targetRecord.title}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          {rel.relationshipType} • {rel.targetRecord.recordCode}
                        </div>
                      </div>
                      <div className="font-mono text-emerald-400 font-semibold">
                        ${rel.targetRecord.revenue?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Audit Trail Timeline */}
              <div className="rounded-xl bg-[#121624] border border-[#1d2436] p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold border-b border-[#1c2438] pb-2">
                  <History className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Historical Change Audit Log</span>
                </div>
                <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1f283d]">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="pl-6 relative space-y-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 absolute left-1 top-1.5 -translate-x-1/2 ring-4 ring-[#0c0f18]" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200 font-mono">
                          {log.action}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {log.timestamp.slice(0, 16).replace("T", " ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Changed by <span className="text-indigo-300 font-medium">{log.changedBy}</span>
                      </p>
                      {Object.keys(log.newValues || {}).length > 0 && (
                        <pre className="p-2 rounded bg-[#0a0d14] text-[10px] font-mono text-zinc-400 border border-[#1a2133] overflow-x-auto">
                          {JSON.stringify(log.newValues, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

