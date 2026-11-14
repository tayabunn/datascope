"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
} from "@/store/api/recordsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToast } from "@/store/slices/toastSlice";
import {
  ArrowLeft,
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
  Layers,
  Star,
  Globe,
  Share2,
} from "lucide-react";

export default function RecordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetRecordByIdQuery(
    resolvedParams.id
  );
  const [updateRecord, { isLoading: isUpdating }] = useUpdateRecordMutation();

  const record = data?.data?.record;
  const related = data?.data?.relatedRecords || [];
  const auditLogs = data?.data?.auditLogs || [];

  const handleStatusChange = async (newStatus: "Active" | "Pending" | "Inactive" | "Archived") => {
    if (!record) return;
    try {
      await updateRecord({
        id: record.id,
        changes: { status: newStatus },
      }).unwrap();

      dispatch(
        addToast({
          type: "success",
          title: "Record Updated",
          message: `Status updated to ${newStatus}. Audit log entry recorded.`,
        })
      );
    } catch (e) {
      dispatch(
        addToast({
          type: "error",
          title: "Update Failed",
          message: "Failed to persist record updates to PostgreSQL.",
        })
      );
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        addToast({
          type: "info",
          title: "Link Copied",
          message: "Record detail URL copied to clipboard.",
        })
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#090b10] text-[#f1f3f7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 space-y-6 max-w-5xl mx-auto w-full">
          {/* Top Back Action Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/explorer"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Data Explorer</span>
            </Link>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white text-xs font-medium transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Record</span>
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-28 bg-[#121624] rounded-2xl" />
              <div className="h-44 bg-[#121624] rounded-2xl" />
              <div className="h-44 bg-[#121624] rounded-2xl" />
            </div>
          ) : isError || !record ? (
            <div className="p-8 rounded-2xl bg-[#0f131f] border border-rose-500/30 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <h3 className="text-sm font-semibold text-white">Record Not Found</h3>
              <p className="text-xs text-zinc-400">
                The record ID &quot;{resolvedParams.id}&quot; does not exist in the database.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Record Header Card */}
              <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1d263b] shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {record.recordCode}
                    </span>
                    <span
                      className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${
                        record.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                          : record.status === "Pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/25"
                      }`}
                    >
                      {record.status}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                      Priority: {record.priority}
                    </span>
                  </div>

                  {/* Status Mutator for Authorized Users */}
                  {user?.role !== "Viewer" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-zinc-500 font-mono">Change Status:</span>
                      <select
                        value={record.status}
                        onChange={(e) =>
                          handleStatusChange(
                            e.target.value as "Active" | "Pending" | "Inactive" | "Archived"
                          )
                        }
                        disabled={isUpdating}
                        className="px-2.5 py-1 rounded-lg bg-[#141926] border border-[#222a3d] text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    {record.title}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{record.companyName}</span>
                    <span>•</span>
                    <Globe className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{record.country}</span>
                    <span>•</span>
                    <Tag className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{record.category}</span>
                  </p>
                </div>

                {/* Financial KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1f283d] space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      Revenue
                    </span>
                    <div className="text-lg font-bold font-mono text-white">
                      ${record.revenue.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1f283d] space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      Cost
                    </span>
                    <div className="text-lg font-bold font-mono text-zinc-300">
                      ${record.cost.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1f283d] space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      Net Profit
                    </span>
                    <div
                      className={`text-lg font-bold font-mono ${
                        record.profit >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      ${record.profit.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1f283d] space-y-0.5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">
                      Deal Rating
                    </span>
                    <div className="text-lg font-bold font-mono text-amber-400 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{record.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Changes & Audit Trail */}
              <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1d263b] shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-[#1b2234] pb-3">
                  <History className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                    Historical Changes & Audit Log
                  </h2>
                </div>

                {auditLogs.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-mono py-2">
                    No historical modifications logged for this record.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="text-zinc-500 uppercase text-[10px] border-b border-[#1b2234]">
                        <tr>
                          <th className="pb-2">Action</th>
                          <th className="pb-2">Modified By</th>
                          <th className="pb-2">Previous State</th>
                          <th className="pb-2">New State</th>
                          <th className="pb-2">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#171d2e] text-zinc-300">
                        {auditLogs.map((log) => (
                          <tr key={log.id}>
                            <td className="py-2.5 text-indigo-400 font-semibold">
                              {log.action}
                            </td>
                            <td className="py-2.5 text-zinc-300">{log.changedBy}</td>
                            <td className="py-2.5 text-rose-400 font-mono text-[11px]">
                              {JSON.stringify(log.previousValues)}
                            </td>
                            <td className="py-2.5 text-emerald-400 font-mono text-[11px]">
                              {JSON.stringify(log.newValues)}
                            </td>
                            <td className="py-2.5 text-zinc-500 text-[11px]">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Related Records Section */}
              {related.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#0e121d] border border-[#1d263b] shadow-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#1b2234] pb-3">
                    <LinkIcon className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-xs font-semibold text-white uppercase font-mono tracking-wider">
                      Related Records & Cross-References
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {related.map((rel, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#121624] border border-[#1f283d] flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-mono text-indigo-400 font-semibold">
                            {rel.relationshipType}
                          </span>
                          <div className="text-xs font-semibold text-white">
                            {rel.targetRecord?.title || "Associated Record"}
                          </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-400">
                          ${rel.targetRecord?.revenue?.toLocaleString() || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
