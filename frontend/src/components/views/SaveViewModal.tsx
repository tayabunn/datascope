"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSaveModal } from "@/store/slices/savedViewsSlice";
import { addToast } from "@/store/slices/toastSlice";
import {
  useSaveViewMutation,
  useUpdateSavedViewMutation,
  SavedViewItem,
} from "@/store/api/recordsApi";
import {
  BookmarkPlus,
  X,
  Check,
  Share2,
  Database,
  Filter,
  ArrowUpDown,
  Columns,
  Search,
} from "lucide-react";

export default function SaveViewModal() {
  const dispatch = useAppDispatch();
  const { isSaveModalOpen, editingView } = useAppSelector(
    (state) => state.savedViews
  );
  const {
    statusFilter,
    categoryFilter,
    countryFilter,
    minRevenue,
    maxRevenue,
    globalQuery,
  } = useAppSelector((state) => state.searchConfig);
  const { visibleColumns } = useAppSelector((state) => state.uiPreference);

  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");
  const [isShared, setIsShared] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    "Admin",
    "Data Analyst",
    "Viewer",
  ]);

  const [saveView, { isLoading: isSaving }] = useSaveViewMutation();
  const [updateSavedView, { isLoading: isUpdating }] =
    useUpdateSavedViewMutation();

  const isEditing = Boolean(editingView);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingView) {
      setViewName(editingView.viewName || "");
      setDescription(editingView.description || "");
      setIsShared(Boolean(editingView.isShared));
      setSelectedRoles(
        editingView.sharedWith && editingView.sharedWith.length > 0
          ? editingView.sharedWith
          : ["Admin", "Data Analyst", "Viewer"]
      );
    } else {
      setViewName("");
      setDescription("");
      setIsShared(true);
      setSelectedRoles(["Admin", "Data Analyst", "Viewer"]);
    }
  }, [editingView, isSaveModalOpen]);

  if (!isSaveModalOpen) return null;

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName.trim()) return;

    try {
      if (isEditing && editingView) {
        await updateSavedView({
          id: editingView.id,
          view: {
            viewName: viewName.trim(),
            description: description.trim(),
            isShared,
            sharedWith: isShared ? selectedRoles : [],
          },
        }).unwrap();

        dispatch(
          addToast({
            type: "success",
            title: "View Updated",
            message: `Saved view "${viewName}" was successfully updated.`,
          })
        );
      } else {
        await saveView({
          viewName: viewName.trim(),
          description: description.trim(),
          datasetId: "ds-global-enterprise-01",
          datasetName: "Global Enterprise Revenue & Contracts",
          searchConditions: { q: globalQuery },
          filters: {
            status: statusFilter,
            category: categoryFilter,
            country: countryFilter,
            minRevenue,
            maxRevenue,
          },
          sortingConfig: { field: "revenue", order: "desc" },
          visibleColumns,
          isShared,
          sharedWith: isShared ? selectedRoles : [],
        }).unwrap();

        dispatch(
          addToast({
            type: "success",
            title: "View Saved",
            message: `Search configuration "${viewName}" has been saved.`,
          })
        );
      }

      dispatch(closeSaveModal());
    } catch (err: any) {
      console.error("Save/Edit view error:", err);
      dispatch(
        addToast({
          type: "error",
          title: "Save Operation Failed",
          message: err?.data?.error?.message || "Failed to persist view configuration.",
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#0f131d] border border-[#232c42] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1f273b] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookmarkPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {isEditing ? "Edit Saved View" : "Save Current Search Configuration"}
              </h3>
              <p className="text-xs text-zinc-400">
                {isEditing
                  ? "Update view name, description and team sharing access."
                  : "Save active filters, search keywords, columns & sorting configuration."}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeSaveModal())}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#1a2133] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Snapshot Summary Preview */}
        {!isEditing && (
          <div className="p-3 rounded-lg bg-[#141926] border border-[#1f273b] space-y-2 text-xs font-mono">
            <div className="text-[10px] uppercase font-semibold text-zinc-400 flex items-center gap-1">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Captured Configuration Snapshot</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
              <div>
                <span className="text-zinc-500">Dataset:</span>{" "}
                <span className="text-white font-medium">Enterprise (100k)</span>
              </div>
              <div>
                <span className="text-zinc-500">Search:</span>{" "}
                <span className="text-indigo-300">
                  {globalQuery ? `"${globalQuery}"` : "None"}
                </span>
              </div>
              <div>
                <span className="text-zinc-500">Filters:</span>{" "}
                <span className="text-emerald-400">
                  {[
                    statusFilter !== "all" && statusFilter,
                    countryFilter !== "all" && countryFilter,
                    minRevenue && `>$${minRevenue / 1000}k`,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Default (All)"}
                </span>
              </div>
              <div>
                <span className="text-zinc-500">Columns:</span>{" "}
                <span className="text-zinc-200">{visibleColumns.length} visible</span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              View Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Q4 High-Margin EMEA Enterprise"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141a29] border border-[#252f47] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Provide context on when to use this saved configuration..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141a29] border border-[#252f47] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
            />
          </div>

          {/* Team Sharing Section */}
          <div className="pt-2 border-t border-[#1f273b] space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="isSharedToggle"
                className="text-zinc-300 font-medium flex items-center gap-1.5 cursor-pointer select-none"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share with authorized team members</span>
              </label>
              <input
                type="checkbox"
                id="isSharedToggle"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
                className="w-4 h-4 rounded bg-[#141a29] border-[#252f47] text-indigo-600 focus:ring-0 cursor-pointer"
              />
            </div>

            {isShared && (
              <div className="p-2.5 rounded-lg bg-[#121622] border border-[#1e2638] space-y-1.5">
                <span className="text-[11px] text-zinc-400 block">
                  Select team roles with access to this view:
                </span>
                <div className="flex items-center gap-2">
                  {["Admin", "Data Analyst", "Viewer"].map((role) => {
                    const isChecked = selectedRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleRole(role)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
                          isChecked
                            ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40 font-semibold"
                            : "bg-[#161c2a] text-zinc-500 border-[#222a3a] hover:text-zinc-300"
                        }`}
                      >
                        {role} {isChecked && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-[#1f273b]">
            <button
              type="button"
              onClick={() => dispatch(closeSaveModal())}
              className="px-3.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1a2133] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUpdating || !viewName.trim()}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>
                {isSaving || isUpdating
                  ? "Saving..."
                  : isEditing
                  ? "Update View"
                  : "Save View"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
