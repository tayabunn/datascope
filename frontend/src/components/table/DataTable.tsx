"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPageSize,
  toggleColumnVisibility,
  setVisibleColumns,
  resetVisibleColumns,
  toggleRowSelection,
  selectAllRows,
  clearRowSelection,
  openRecordDrawer,
  setTableDensity,
} from "@/store/slices/uiPreferenceSlice";
import { clearAllFilters } from "@/store/slices/searchConfigSlice";
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
  Download,
  RotateCcw,
  Zap,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";

export interface ColumnDef {
  key: string;
  label: string;
  defaultWidth: number;
  align?: "left" | "center" | "right";
  type: "text" | "number" | "currency" | "badge" | "date" | "rating";
}

export const ALL_COLUMNS: ColumnDef[] = [
  { key: "recordCode", label: "Record ID", defaultWidth: 125, type: "text" },
  { key: "title", label: "Deal Title", defaultWidth: 270, type: "text" },
  { key: "companyName", label: "Company", defaultWidth: 190, type: "text" },
  { key: "category", label: "Category", defaultWidth: 140, type: "badge" },
  { key: "status", label: "Status", defaultWidth: 120, type: "badge" },
  { key: "country", label: "Country", defaultWidth: 130, type: "text" },
  { key: "revenue", label: "Revenue", defaultWidth: 140, align: "right", type: "currency" },
  { key: "profit", label: "Net Profit", defaultWidth: 140, align: "right", type: "currency" },
  { key: "rating", label: "Rating", defaultWidth: 95, align: "center", type: "rating" },
  { key: "priority", label: "Priority", defaultWidth: 110, align: "center", type: "badge" },
  { key: "createdAt", label: "Created Date", defaultWidth: 130, type: "date" },
];

const DEFAULT_COLUMN_WIDTHS: Record<string, number> = ALL_COLUMNS.reduce(
  (acc, col) => ({ ...acc, [col.key]: col.defaultWidth }),
  {}
);

/**
 * High-performance search highlighter
 * Escapes regex special characters and highlights matching terms inside table cells
 */
function HighlightMatch({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim() || !text) {
    return <span>{text}</span>;
  }

  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (terms.length === 0) return <span>{text}</span>;

  try {
    const regex = new RegExp(`(${terms.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          terms.some((t) => new RegExp(`^${t}$`, "i").test(part)) ? (
            <mark
              key={i}
              className="bg-amber-400/25 text-amber-200 px-0.5 py-0.5 rounded font-semibold border-b border-amber-400/60"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  } catch {
    return <span>{text}</span>;
  }
}

/**
 * MemoizedTableRow Component
 * Skips re-rendering when other rows are selected or when table scrolls
 */
interface MemoizedTableRowProps {
  record: RecordItem;
  isSelected: boolean;
  visibleColumns: string[];
  columnWidths: Record<string, number>;
  tableDensity: "compact" | "comfortable" | "spacious";
  searchQuery: string;
  onRowClick: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

const MemoizedTableRow = React.memo(
  function MemoizedTableRow({
    record,
    isSelected,
    visibleColumns,
    columnWidths,
    tableDensity,
    searchQuery,
    onRowClick,
    onToggleSelect,
  }: MemoizedTableRowProps) {
    const densityClass =
      tableDensity === "compact"
        ? "py-2 text-[11px]"
        : tableDensity === "spacious"
        ? "py-4 text-xs"
        : "py-3 text-xs";

    return (
      <tr
        onClick={() => onRowClick(record.id)}
        className={`cursor-pointer transition-colors group table-row-hover ${
          isSelected ? "bg-indigo-600/12 hover:bg-indigo-600/18" : "hover:bg-[#121726]"
        }`}
      >
        {/* Row Checkbox */}
        <td
          className={`w-11 px-3 text-center ${densityClass}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(record.id);
          }}
        >
          <button
            type="button"
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
            aria-label={`Select row ${record.recordCode}`}
          >
            {isSelected ? (
              <CheckSquare className="w-4 h-4 text-indigo-400" />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </button>
        </td>

        {/* Record ID */}
        {visibleColumns.includes("recordCode") && (
          <td
            style={{ width: `${columnWidths.recordCode || 125}px` }}
            className={`px-3 font-mono font-medium text-indigo-300 truncate ${densityClass}`}
          >
            <HighlightMatch text={record.recordCode} query={searchQuery} />
          </td>
        )}

        {/* Deal Title */}
        {visibleColumns.includes("title") && (
          <td
            style={{ width: `${columnWidths.title || 270}px` }}
            className={`px-3 text-zinc-100 font-medium truncate group-hover:text-indigo-300 transition-colors ${densityClass}`}
          >
            <HighlightMatch text={record.title} query={searchQuery} />
          </td>
        )}

        {/* Company Name */}
        {visibleColumns.includes("companyName") && (
          <td
            style={{ width: `${columnWidths.companyName || 190}px` }}
            className={`px-3 text-zinc-300 truncate ${densityClass}`}
          >
            <HighlightMatch text={record.companyName} query={searchQuery} />
          </td>
        )}

        {/* Category Badge */}
        {visibleColumns.includes("category") && (
          <td
            style={{ width: `${columnWidths.category || 140}px` }}
            className={`px-3 truncate ${densityClass}`}
          >
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
              <HighlightMatch text={record.category} query={searchQuery} />
            </span>
          </td>
        )}

        {/* Status Badge */}
        {visibleColumns.includes("status") && (
          <td
            style={{ width: `${columnWidths.status || 120}px` }}
            className={`px-3 ${densityClass}`}
          >
            <span
              className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                record.status === "Active"
                  ? "bg-[#0b7d55]/15 text-[#0b7d55] border-[#0b7d55]/30"
                  : record.status === "Pending"
                  ? "bg-[#ff8204]/15 text-[#ffa033] border-[#ff8204]/30"
                  : record.status === "Inactive"
                  ? "bg-[#af1d27]/15 text-rose-400 border-rose-500/30"
                  : "bg-zinc-700/20 text-[#a1a1aa] border-zinc-600/30"
              }`}
            >
              {record.status}
            </span>
          </td>
        )}

        {/* Country */}
        {visibleColumns.includes("country") && (
          <td
            style={{ width: `${columnWidths.country || 130}px` }}
            className={`px-3 text-zinc-300 truncate ${densityClass}`}
          >
            <HighlightMatch text={record.country} query={searchQuery} />
          </td>
        )}

        {/* Revenue */}
        {visibleColumns.includes("revenue") && (
          <td
            style={{ width: `${columnWidths.revenue || 140}px` }}
            className={`px-3 font-mono text-zinc-100 font-medium text-right ${densityClass}`}
          >
            ${record.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </td>
        )}

        {/* Profit */}
        {visibleColumns.includes("profit") && (
          <td
            style={{ width: `${columnWidths.profit || 140}px` }}
            className={`px-3 font-mono text-right font-medium ${
              record.profit >= 0 ? "text-emerald-400" : "text-rose-400"
            } ${densityClass}`}
          >
            ${record.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </td>
        )}

        {/* Rating */}
        {visibleColumns.includes("rating") && (
          <td
            style={{ width: `${columnWidths.rating || 95}px` }}
            className={`px-3 font-mono text-amber-400 text-center ${densityClass}`}
          >
            ★ {record.rating}
          </td>
        )}

        {/* Priority */}
        {visibleColumns.includes("priority") && (
          <td
            style={{ width: `${columnWidths.priority || 110}px` }}
            className={`px-3 font-mono text-[11px] text-center ${densityClass}`}
          >
            <span
              className={`${
                record.priority === "Urgent"
                  ? "text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/25"
                  : record.priority === "High"
                  ? "text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/25"
                  : "text-zinc-400"
              }`}
            >
              {record.priority}
            </span>
          </td>
        )}

        {/* Created Date */}
        {visibleColumns.includes("createdAt") && (
          <td
            style={{ width: `${columnWidths.createdAt || 130}px` }}
            className={`px-3 font-mono text-zinc-500 text-[11px] ${densityClass}`}
          >
            {record.createdAt.slice(0, 10)}
          </td>
        )}
      </tr>
    );
  },
  (prev, next) => {
    return (
      prev.record.id === next.record.id &&
      prev.record.updatedAt === next.record.updatedAt &&
      prev.isSelected === next.isSelected &&
      prev.tableDensity === next.tableDensity &&
      prev.searchQuery === next.searchQuery &&
      prev.visibleColumns === next.visibleColumns &&
      prev.columnWidths === next.columnWidths
    );
  }
);

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
  sortOrder: string;
  onSortChange: (field: string, isMulti?: boolean) => void;
}

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
  const { globalQuery } = useAppSelector((state) => state.searchConfig);

  // Column Resizing state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(DEFAULT_COLUMN_WIDTHS);
  const [resizingCol, setResizingCol] = useState<string | null>(null);
  const resizingRef = useRef<{ colKey: string; startX: number; startWidth: number } | null>(null);

  // Dropdowns & Forms
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState("");

  // Virtualization state & container ref
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isVirtualizationEnabled, setIsVirtualizationEnabled] = useState(true);

  // Parse multi-column sorting parameters
  const sortFields = useMemo(
    () => sortField.split(",").map((s) => s.trim()).filter(Boolean),
    [sortField]
  );
  const sortOrders = useMemo(
    () => sortOrder.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean),
    [sortOrder]
  );

  const getSortInfo = useCallback(
    (colKey: string) => {
      const index = sortFields.indexOf(colKey);
      if (index === -1) return null;
      return {
        priority: sortFields.length > 1 ? index + 1 : null,
        order: (sortOrders[index] || sortOrders[0] || "desc") as "asc" | "desc",
      };
    },
    [sortFields, sortOrders]
  );

  // Interactive Column Resizing
  const handleResizeStart = (colKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startWidth = columnWidths[colKey] || 150;
    resizingRef.current = { colKey, startX: e.clientX, startWidth };
    setResizingCol(colKey);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingRef.current) return;
      const deltaX = moveEvent.clientX - resizingRef.current.startX;
      const newWidth = Math.max(70, Math.min(650, resizingRef.current.startWidth + deltaX));
      setColumnWidths((prev) => ({
        ...prev,
        [resizingRef.current!.colKey]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      resizingRef.current = null;
      setResizingCol(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleResetColumnWidth = (colKey: string) => {
    setColumnWidths((prev) => ({
      ...prev,
      [colKey]: DEFAULT_COLUMN_WIDTHS[colKey] || 150,
    }));
  };

  const handleResetAllWidths = () => {
    setColumnWidths(DEFAULT_COLUMN_WIDTHS);
  };

  // Selection Logic
  const allRowIds = useMemo(() => records.map((r) => r.id), [records]);
  const isAllSelected =
    records.length > 0 && allRowIds.every((id) => selectedRowIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      dispatch(clearRowSelection());
    } else {
      dispatch(selectAllRows(allRowIds));
    }
  };

  const handleRowClick = useCallback(
    (id: string) => {
      dispatch(openRecordDrawer(id));
    },
    [dispatch]
  );

  const handleToggleSelect = useCallback(
    (id: string) => {
      dispatch(toggleRowSelection(id));
    },
    [dispatch]
  );

  // Jump to Page
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpPageInput("");
    }
  };

  // Virtualization calculations
  const rowHeight = tableDensity === "compact" ? 38 : tableDensity === "spacious" ? 56 : 46;
  const viewportHeight = 520;
  const overscan = 6;

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const { visibleRecords, topSpacerHeight, bottomSpacerHeight } = useMemo(() => {
    if (!isVirtualizationEnabled || records.length <= 15) {
      return {
        visibleRecords: records,
        topSpacerHeight: 0,
        bottomSpacerHeight: 0,
      };
    }

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(
      records.length,
      Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan
    );

    const visible = records.slice(startIndex, endIndex);
    const topHeight = startIndex * rowHeight;
    const bottomHeight = Math.max(0, (records.length - endIndex) * rowHeight);

    return {
      visibleRecords: visible,
      topSpacerHeight: topHeight,
      bottomSpacerHeight: bottomHeight,
    };
  }, [isVirtualizationEnabled, records, scrollTop, rowHeight, viewportHeight, overscan]);

  // Export selected rows as CSV
  const handleExportSelected = () => {
    if (selectedRowIds.length === 0) return;
    const idsParam = selectedRowIds.join(",");
    window.open(`/api/export?ids=${encodeURIComponent(idsParam)}`, "_blank");
  };

  const activeColumns = ALL_COLUMNS.filter((col) => visibleColumns.includes(col.key));

  return (
    <div className="bg-[#0c0f17] border border-[#1b2234] rounded-lg shadow-2xl flex flex-col overflow-hidden">
      {/* Table Action Bar */}
      <div className="p-3 bg-[#0f131f] border-b border-[#1b2234] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Row Stats or Selection Banner */}
        <div className="flex items-center gap-3">
          {selectedRowIds.length > 0 ? (
            <div className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono">
              <CheckSquare className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold">{selectedRowIds.length} row(s) selected</span>
              <button
                onClick={handleExportSelected}
                className="flex items-center gap-1 ml-2 px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-sans font-medium transition-colors"
                title="Download CSV for only selected rows"
              >
                <Download className="w-3 h-3" />
                Export Selected
              </button>
              <button
                onClick={() => dispatch(clearRowSelection())}
                className="text-zinc-400 hover:text-white underline ml-1 text-[11px]"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="text-zinc-400 font-mono text-[11px] flex items-center gap-2">
              <span>
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
              </span>
            </div>
          )}

          {isFetching && (
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Syncing Data...</span>
            </span>
          )}

          {/* Virtualization Active Pill */}
          {isVirtualizationEnabled && records.length > 15 && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
              <Zap className="w-3 h-3 text-emerald-400" />
              Virtualized Viewport (Rendering {visibleRecords.length} / {records.length} DOM rows)
            </span>
          )}
        </div>

        {/* Right Controls: Density, Virtualization, Columns */}
        <div className="flex items-center gap-2">
          {/* Table Density Switcher */}
          <div className="flex items-center bg-[#141926] border border-[#222a3d] rounded-lg p-0.5">
            <button
              onClick={() => dispatch(setTableDensity("compact"))}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                tableDensity === "compact"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Compact density"
            >
              Compact
            </button>
            <button
              onClick={() => dispatch(setTableDensity("comfortable"))}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                tableDensity === "comfortable"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Comfortable density"
            >
              Normal
            </button>
            <button
              onClick={() => dispatch(setTableDensity("spacious"))}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                tableDensity === "spacious"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Spacious density"
            >
              Spacious
            </button>
          </div>

          {/* Virtualization Toggle */}
          <button
            onClick={() => setIsVirtualizationEnabled(!isVirtualizationEnabled)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isVirtualizationEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-[#141926] border-[#222a3d] text-zinc-400 hover:text-zinc-200"
            }`}
            title="Toggle Row Virtualization Engine (reduces active DOM nodes)"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Virtualize</span>
          </button>

          {/* Multi-Sort Indicator / Clear Button */}
          {sortFields.length > 1 && (
            <button
              onClick={() => onSortChange("createdAt", false)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono"
              title="Reset multi-column sort to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Multi-Sort ({sortFields.length})</span>
            </button>
          )}

          {/* Column Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141926] hover:bg-[#1a2133] border border-[#222a3d] text-zinc-300 hover:text-white transition-all font-medium"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span>Columns ({visibleColumns.length})</span>
            </button>

            {isColumnDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-[#121624] border border-[#232c42] rounded-lg p-2.5 shadow-2xl z-50 space-y-1 animate-in fade-in duration-100">
                <div className="flex items-center justify-between px-2 py-1 border-b border-[#1f273b] text-[10px] uppercase font-mono text-zinc-400">
                  <span>Toggle Columns</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        dispatch(setVisibleColumns(ALL_COLUMNS.map((c) => c.key)))
                      }
                      className="text-indigo-400 hover:underline normal-case"
                    >
                      All
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => dispatch(resetVisibleColumns())}
                      className="text-zinc-400 hover:text-white normal-case"
                    >
                      Default
                    </button>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-0.5 py-1">
                  {ALL_COLUMNS.map((col) => {
                    const isChecked = visibleColumns.includes(col.key);
                    return (
                      <button
                        key={col.key}
                        onClick={() => dispatch(toggleColumnVisibility(col.key))}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs text-left hover:bg-[#1a2236] text-zinc-300 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                              isChecked
                                ? "bg-indigo-600 border-indigo-500 text-white"
                                : "border-zinc-700"
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span>{col.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {col.type}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1.5 border-t border-[#1f273b]">
                  <button
                    onClick={handleResetAllWidths}
                    className="w-full text-center text-[11px] text-zinc-400 hover:text-white py-1 hover:bg-[#182033] rounded transition-colors"
                  >
                    Reset Column Widths
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Container (Virtualized Scroll Viewport) */}
      <div
        ref={tableContainerRef}
        onScroll={handleContainerScroll}
        className="overflow-x-auto max-h-[580px] overflow-y-auto relative divide-y divide-[#171d2e]"
      >
        {/* Top Indeterminate Lazy Loading Progress Bar */}
        {isFetching && !isLoading && (
          <div className="sticky top-0 left-0 right-0 h-1 bg-[#141926] z-30 overflow-hidden">
            <div className="animate-progress-fast" />
          </div>
        )}

        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead className="bg-[#0f1320] text-zinc-400 font-mono text-[11px] uppercase tracking-wider sticky top-0 z-20 border-b border-[#1b2234] shadow-sm select-none">
            <tr>
              {/* Checkbox column */}
              <th className="w-11 px-3 py-3 text-center">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-zinc-500 hover:text-zinc-200"
                  aria-label="Select all rows on this page"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>

              {activeColumns.map((col) => {
                const sortInfo = getSortInfo(col.key);
                const colWidth = columnWidths[col.key] || col.defaultWidth;

                return (
                  <th
                    key={col.key}
                    style={{ width: `${colWidth}px`, minWidth: `${colWidth}px` }}
                    className={`relative px-3 py-3 select-none group transition-colors ${
                      sortInfo ? "text-indigo-300 font-semibold bg-indigo-500/5" : "hover:text-white"
                    } ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                  >
                    {/* Header Click Area (Sort on click, Multi-sort on Shift+Click) */}
                    <div
                      onClick={(e) => onSortChange(col.key, e.shiftKey)}
                      className="cursor-pointer flex items-center gap-1.5 w-full pr-2"
                      title="Click to sort • Shift+Click for multi-column sort"
                    >
                      <span className="truncate">{col.label}</span>

                      {/* Sort Direction & Priority Indicator */}
                      {sortInfo ? (
                        <div className="flex items-center gap-1 text-indigo-400 bg-indigo-500/15 px-1 py-0.5 rounded border border-indigo-500/30">
                          {sortInfo.priority && (
                            <span className="text-[9px] bg-indigo-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                              {sortInfo.priority}
                            </span>
                          )}
                          {sortInfo.order === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
                          )}
                        </div>
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    {/* Draggable Column Resize Handle */}
                    <div
                      onMouseDown={(e) => handleResizeStart(col.key, e)}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleResetColumnWidth(col.key);
                      }}
                      className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-indigo-500/80 active:bg-indigo-500 transition-colors z-30 flex items-center justify-center ${
                        resizingCol === col.key
                          ? "bg-indigo-500 w-2.5"
                          : "bg-transparent group-hover:bg-zinc-700/60"
                      }`}
                      title="Drag to resize column (Double-click to reset)"
                    >
                      <div className="w-[1px] h-3.5 bg-zinc-500/40" />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            className={`divide-y divide-[#171d2e] text-zinc-300 transition-opacity duration-200 ${
              isFetching && !isLoading ? "opacity-60" : "opacity-100"
            }`}
          >
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} className="animate-pulse bg-[#0e121c]/50">
                  <td className="px-3 py-3 text-center">
                    <div className="w-4 h-4 rounded bg-[#1e273b] mx-auto" />
                  </td>
                  {activeColumns.map((c, j) => (
                    <td key={j} className="px-3 py-3">
                      <div
                        className="h-3.5 bg-[#1a2336] rounded"
                        style={{ width: `${55 + ((j * 19) % 40)}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : records.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={activeColumns.length + 1}
                  className="px-6 py-20 text-center text-zinc-500"
                >
                  <div className="max-w-md mx-auto space-y-3">
                    <Layers className="w-9 h-9 text-zinc-600 mx-auto" />
                    <h4 className="text-sm font-semibold text-zinc-200">
                      No Records Matched Query
                    </h4>
                    <p className="text-xs text-zinc-400">
                      No records match the active filter criteria or search keyword. Try adjusting
                      numeric thresholds or resetting your filters.
                    </p>
                    <button
                      onClick={() => dispatch(clearAllFilters())}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset All Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {/* Virtualization Top Spacer */}
                {topSpacerHeight > 0 && (
                  <tr style={{ height: `${topSpacerHeight}px` }}>
                    <td colSpan={activeColumns.length + 1} />
                  </tr>
                )}

                {/* Render Visible Rows (Memoized) */}
                {visibleRecords.map((record) => {
                  const isSelected = selectedRowIds.includes(record.id);

                  return (
                    <MemoizedTableRow
                      key={record.id}
                      record={record}
                      isSelected={isSelected}
                      visibleColumns={visibleColumns}
                      columnWidths={columnWidths}
                      tableDensity={tableDensity}
                      searchQuery={globalQuery}
                      onRowClick={handleRowClick}
                      onToggleSelect={handleToggleSelect}
                    />
                  );
                })}

                {/* Virtualization Bottom Spacer */}
                {bottomSpacerHeight > 0 && (
                  <tr style={{ height: `${bottomSpacerHeight}px` }}>
                    <td colSpan={activeColumns.length + 1} />
                  </tr>
                )}
              </>
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
