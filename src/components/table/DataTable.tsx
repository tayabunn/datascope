"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPageSize,
  toggleColumnVisibility,
  toggleRowSelection,
  selectAllRows,
  clearRowSelection,
  openRecordDrawer,
} from "@/store/slices/uiPreferenceSlice";
import { RecordItem } from "@/store/api/recordsApi";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckSquare,
  Square,
  Sparkles,
  Layers,
  Check,
} from "lucide-react";

interface DataTableProps {
  records: RecordItem[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
}

const ALL_COLUMNS = [
  { key: "recordCode", label: "Record ID", width: "w-28" },
  { key: "title", label: "Deal Title", width: "w-72" },
  { key: "companyName", label: "Company", width: "w-48" },
  { key: "category", label: "Category", width: "w-36" },
  { key: "status", label: "Status", width: "w-28" },
  { key: "country", label: "Country", width: "w-32" },
  { key: "revenue", label: "Revenue", width: "w-36" },
  { key: "profit", label: "Net Profit", width: "w-36" },
  { key: "rating", label: "Rating", width: "w-24" },
  { key: "priority", label: "Priority", width: "w-28" },
  { key: "createdAt", label: "Created Date", width: "w-36" },
];

export default function DataTable({
  records,
  isLoading,
  isFetching,
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  sortField,
  sortOrder,
  onSortChange,
}: DataTableProps) {
  const dispatch = useAppDispatch();
  const { visibleColumns, selectedRowIds, tableDensity } = useAppSelector(
    (state) => state.uiPreference
  );
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState("");

  const allRowIds = records.map((r) => r.id);
  const isAllSelected =
    records.length > 0 && allRowIds.every((id) => selectedRowIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      dispatch(clearRowSelection());
    } else {
      dispatch(selectAllRows(allRowIds));
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpPageInput("");
    }
  };

  return (
    <div className="bg-[#0c0f17] border border-[#1b2234] rounded-xl shadow-lg flex flex-col overflow-hidden">
      {/* Table Action Bar */}
      <div className="p-3 bg-[#0f131f] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Selection summary or record stats */}
        <div className="flex items-center gap-3">
          {selectedRowIds.length > 0 ? (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono">
              <span className="font-semibold">
                {selectedRowIds.length} row(s) selected
              </span>
              <button
                onClick={() => dispatch(clearRowSelection())}
                className="underline hover:text-white ml-2 text-[11px]"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="text-zinc-400 font-mono text-[11px]">
              Showing{" "}
              <span className="text-white font-semibold">
                {((page - 1) * pageSize + 1).toLocaleString()}
              </span>{" "}
              –{" "}
              <span className="text-white font-semibold">
                {Math.min(page * pageSize, totalCount).toLocaleString()}
              </span>{" "}
              of{" "}
              <span className="text-indigo-400 font-semibold">
                {totalCount.toLocaleString()}
              </span>{" "}
              records
            </div>
          )}

          {isFetching && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Syncing
            </span>
          )}
        </div>

        {/* Right: Column visibility dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white transition-all font-medium"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>Visible Columns ({visibleColumns.length})</span>
          </button>

          {isColumnDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-[#121624] border border-[#232c42] rounded-xl p-2.5 shadow-2xl z-50 space-y-1 animate-in fade-in duration-100">
              <div className="text-[10px] uppercase font-mono text-zinc-400 px-2 py-1 border-b border-[#1f273b]">
                Toggle Columns
              </div>
              <div className="max-h-60 overflow-y-auto space-y-0.5 py-1">
                {ALL_COLUMNS.map((col) => {
                  const isChecked = visibleColumns.includes(col.key);
                  return (
                    <button
                      key={col.key}
                      onClick={() => dispatch(toggleColumnVisibility(col.key))}
                      className="w-full flex items-center justify-between px-2 py-1 rounded text-xs text-left hover:bg-[#1a2236] text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>{col.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Container (Horizontal Scroll for 15+ cols) */}
      <div className="overflow-x-auto min-h-[420px] relative">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead className="bg-[#0f1320] text-zinc-400 font-mono text-[11px] uppercase tracking-wider sticky top-0 z-20 border-b border-[#1b2234]">
            <tr>
              {/* Checkbox column */}
              <th className="w-10 px-4 py-3 text-center">
                <button
                  onClick={handleSelectAll}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              {ALL_COLUMNS.filter((col) => visibleColumns.includes(col.key)).map(
                (col) => {
                  const isSorted = sortField === col.key;
                  return (
                    <th
                      key={col.key}
                      onClick={() => onSortChange(col.key)}
                      className={`px-4 py-3 cursor-pointer select-none transition-colors hover:text-white ${
                        isSorted ? "text-indigo-400 font-semibold bg-indigo-500/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.label}</span>
                        {isSorted ? (
                          sortOrder === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    </th>
                  );
                }
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#171d2e] text-zinc-300">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} className="animate-pulse bg-[#0e121c]/50">
                  <td className="px-4 py-3.5 text-center">
                    <div className="w-4 h-4 rounded bg-[#1e273b] mx-auto" />
                  </td>
                  {ALL_COLUMNS.filter((c) => visibleColumns.includes(c.key)).map(
                    (c, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div
                          className="h-3.5 bg-[#1a2336] rounded"
                          style={{ width: `${60 + ((j * 17) % 35)}%` }}
                        />
                      </td>
                    )
                  )}
                </tr>
              ))
            ) : records.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={visibleColumns.length + 1}
                  className="px-6 py-16 text-center text-zinc-500"
                >
                  <div className="max-w-sm mx-auto space-y-2">
                    <Layers className="w-8 h-8 text-zinc-600 mx-auto" />
                    <h4 className="text-sm font-semibold text-zinc-300">
                      No Records Matched
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Try broadening your search term or resetting the active filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Render Data Rows
              records.map((record) => {
                const isSelected = selectedRowIds.includes(record.id);

                return (
                  <tr
                    key={record.id}
                    onClick={() => dispatch(openRecordDrawer(record.id))}
                    className={`cursor-pointer transition-colors group table-row-hover ${
                      isSelected ? "bg-indigo-600/10" : ""
                    } ${tableDensity === "compact" ? "py-2" : "py-3.5"}`}
                  >
                    {/* Row checkbox */}
                    <td
                      className="px-4 py-2.5 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleRowSelection(record.id));
                      }}
                    >
                      <button className="text-zinc-500 hover:text-zinc-300">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Columns */}
                    {visibleColumns.includes("recordCode") && (
                      <td className="px-4 py-2.5 font-mono text-[11px] text-indigo-300 font-medium">
                        {record.recordCode}
                      </td>
                    )}

                    {visibleColumns.includes("title") && (
                      <td className="px-4 py-2.5 text-zinc-100 font-medium max-w-xs truncate group-hover:text-indigo-300 transition-colors">
                        {record.title}
                      </td>
                    )}

                    {visibleColumns.includes("companyName") && (
                      <td className="px-4 py-2.5 text-zinc-300 font-sans">
                        {record.companyName}
                      </td>
                    )}

                    {visibleColumns.includes("category") && (
                      <td className="px-4 py-2.5">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                          {record.category}
                        </span>
                      </td>
                    )}

                    {visibleColumns.includes("status") && (
                      <td className="px-4 py-2.5">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                            record.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                              : record.status === "Pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                              : record.status === "Inactive"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/25"
                              : "bg-zinc-700/20 text-zinc-400 border-zinc-600/30"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    )}

                    {visibleColumns.includes("country") && (
                      <td className="px-4 py-2.5 text-zinc-300">
                        {record.country}
                      </td>
                    )}

                    {visibleColumns.includes("revenue") && (
                      <td className="px-4 py-2.5 font-mono text-zinc-100 font-medium">
                        ${record.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    )}

                    {visibleColumns.includes("profit") && (
                      <td
                        className={`px-4 py-2.5 font-mono ${
                          record.profit >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        ${record.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    )}

                    {visibleColumns.includes("rating") && (
                      <td className="px-4 py-2.5 font-mono text-amber-400">
                        ★ {record.rating}
                      </td>
                    )}

                    {visibleColumns.includes("priority") && (
                      <td className="px-4 py-2.5 font-mono text-[11px]">
                        <span
                          className={`${
                            record.priority === "Urgent"
                              ? "text-rose-400 font-bold"
                              : record.priority === "High"
                              ? "text-amber-400 font-semibold"
                              : "text-zinc-400"
                          }`}
                        >
                          {record.priority}
                        </span>
                      </td>
                    )}

                    {visibleColumns.includes("createdAt") && (
                      <td className="px-4 py-2.5 font-mono text-zinc-500 text-[11px]">
                        {record.createdAt.slice(0, 10)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Server-Side Pagination Bar */}
      <div className="p-3 bg-[#0f131f] border-t border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
            aria-label="Records per page"
            className="px-2 py-1 rounded bg-[#141926] border border-[#222a3d] text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {[25, 50, 100].map((sz) => (
              <option key={sz} value={sz} className="bg-[#141926]">
                {sz}
              </option>
            ))}
          </select>
        </div>

        {/* Page Jump Form */}
        <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
          <span className="text-zinc-400">Jump to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={String(page)}
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            className="w-14 px-2 py-1 rounded bg-[#141926] border border-[#222a3d] text-center text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          <span className="text-zinc-500">/ {totalPages.toLocaleString()}</span>
        </form>

        {/* Prev / Next Page Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={page <= 1 || isLoading}
            className="p-1.5 rounded-lg bg-[#141926] hover:bg-[#1b2133] border border-[#222a3d] disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="p-1.5 rounded-lg bg-[#141926] hover:bg-[#1b2133] border border-[#222a3d] disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-zinc-300 font-semibold bg-[#141926] border border-[#222a3d] rounded-lg">
            Page {page} of {totalPages.toLocaleString()}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
            className="p-1.5 rounded-lg bg-[#141926] hover:bg-[#1b2133] border border-[#222a3d] disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages || isLoading}
            className="p-1.5 rounded-lg bg-[#141926] hover:bg-[#1b2133] border border-[#222a3d] disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
