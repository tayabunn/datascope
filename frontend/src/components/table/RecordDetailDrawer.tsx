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
        <div className="p-5 border-b border-[#1a2030] flex items-center justify-between bg-[#0e121d]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="render-pill text-xs py-0.5 px-2.5 font-semibold">
                {record?.recordCode || "LOADING..."}
              </span>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                  record?.status === "Active"
                    ? "bg-[#0b7d55]/15 text-[#0b7d55] border-[#0b7d55]/30"
                    : record?.status === "Pending"
                    ? "bg-[#ff8204]/15 text-[#ffa033] border-[#ff8204]/30"
                    : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                }`}
              >
                {record?.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-[#fafaf4] truncate max-w-lg">
              {record?.title || "Record Details"}
            </h2>
          </div>

          <button
            onClick={() => dispatch(closeRecordDrawer())}
            className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#1a2030] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading || !record ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-[#121624] rounded-lg" />
              <div className="h-40 bg-[#121624] rounded-lg" />
              <div className="h-40 bg-[#121624] rounded-lg" />
            </div>
          ) : (
            <>
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg render-card space-y-1">
                  <div className="text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#0b7d55]" />
                    Revenue
                  </div>
                  <div className="text-base font-mono font-bold text-[#fafaf4]">
                    ${record.revenue.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg render-card space-y-1">
                  <div className="text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#968dfa]" />
                    Net Profit
                  </div>
                  <div className="text-base font-mono font-bold text-[#0b7d55]">
                    ${record.profit.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg mistral-card space-y-1">
                  <div className="text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#ff8204]" />
                    Priority
                  </div>
                  <div className="text-base font-mono font-bold text-[#ffa033]">
                    {record.priority}
                  </div>
                </div>
              </div>

              {/* Status Update Quick Action (RBAC: Admin & Analyst only) */}
              {user?.role !== "Viewer" && (
                <div className="p-3.5 rounded-lg render-card flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#fafaf4]">
                      Update Operational Status
                    </div>
                    <div className="text-[11px] text-[#a1a1aa]">
                      Triggered state updates append to immutable audit logs.
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {["Active", "Pending", "Archived"].map((st) => (
                      <button
                        key={st}
                        disabled={isUpdating || record.status === st}
                        onClick={() => handleStatusChange(st)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-mono font-medium transition-all ${
                          record.status === st
                            ? "bg-[#6c35f5] text-white shadow-sm font-semibold"
                            : "bg-[#141926] text-[#a1a1aa] hover:text-white hover:bg-[#1a2133]"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Information Grid */}
              <div className="rounded-lg render-card p-4 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] font-semibold border-b border-[#1a2030] pb-2">
                  Entity Metadata
                </h3>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div>
                    <span className="text-zinc-500">Target Company:</span>
                    <p className="text-[#fafaf4] font-medium">{record.companyName}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Industry Category:</span>
                    <p className="text-[#fafaf4] font-medium">{record.category}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Country of Origin:</span>
                    <p className="text-[#fafaf4] font-medium">{record.country}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Operating Cost:</span>
                    <p className="text-[#fafaf4] font-mono">${record.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Client Rating:</span>
                    <p className="text-[#ffa033] font-mono">★ {record.rating} / 5.0</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Ingested At:</span>
                    <p className="text-[#a1a1aa] font-mono">{record.createdAt.slice(0, 10)}</p>
                  </div>
                </div>

                {record.tags && record.tags.length > 0 && (
                  <div className="pt-2 border-t border-[#1a2030] flex flex-wrap gap-1.5">
                    {record.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#6c35f5]/15 text-[#b193e0] border border-[#968dfa]/30"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Records (Connected Graph) */}
              <div className="rounded-lg render-card p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#a1a1aa] font-semibold border-b border-[#1a2030] pb-2">
                  <LinkIcon className="w-3.5 h-3.5 text-[#968dfa]" />
                  <span>Related Business Records</span>
                </div>
                <div className="space-y-2">
                  {related.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#0e121d] border border-[#1a2030] flex items-center justify-between text-xs hover:border-[#968dfa]/40 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-[#fafaf4]">
                          {rel.targetRecord.title}
                        </div>
                        <div className="text-[11px] text-[#a1a1aa] font-mono">
                          {rel.relationshipType} • {rel.targetRecord.recordCode}
                        </div>
                      </div>
                      <div className="font-mono text-[#0b7d55] font-semibold">
                        ${rel.targetRecord.revenue?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Audit Trail Timeline */}
              <div className="rounded-lg render-card p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#a1a1aa] font-semibold border-b border-[#1a2030] pb-2">
                  <History className="w-3.5 h-3.5 text-[#ff8204]" />
                  <span>Historical Change Audit Log</span>
                </div>
                <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1a2030]">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="pl-6 relative space-y-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff8204] absolute left-1 top-1.5 -translate-x-1/2 ring-4 ring-[#0c0f18]" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#fafaf4] font-mono">
                          {log.action}
                        </span>
                        <span className="text-[10px] text-[#a1a1aa] font-mono">
                          {log.timestamp.slice(0, 16).replace("T", " ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa]">
                        Changed by <span className="text-[#ffa033] font-medium">{log.changedBy}</span>
                      </p>
                      {Object.keys(log.newValues || {}).length > 0 && (
                        <pre className="p-2 rounded-lg bg-[#1a1a1e] text-[10px] font-mono text-[#ffa033] border border-[#2a2a30] overflow-x-auto">
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

