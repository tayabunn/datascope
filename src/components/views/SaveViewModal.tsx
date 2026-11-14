"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSaveModal } from "@/store/slices/savedViewsSlice";
import { useSaveViewMutation } from "@/store/api/recordsApi";
import { BookmarkPlus, X, Check, Share2 } from "lucide-react";

export default function SaveViewModal() {
  const dispatch = useAppDispatch();
  const { isSaveModalOpen } = useAppSelector((state) => state.savedViews);
  const { statusFilter, categoryFilter, countryFilter, minRevenue, maxRevenue, globalQuery } =
    useAppSelector((state) => state.searchConfig);
  const { visibleColumns } = useAppSelector((state) => state.uiPreference);

  const [viewName, setViewName] = useState("");
  const [description, setDescription] = useState("");
  const [isShared, setIsShared] = useState(true);

  const [saveView, { isLoading }] = useSaveViewMutation();

  if (!isSaveModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName.trim()) return;

    try {
      await saveView({
        viewName,
        description,
        filters: {
          status: statusFilter,
          category: categoryFilter,
          country: countryFilter,
          minRevenue,
          maxRevenue,
        },
        searchConditions: { q: globalQuery },
        sortingConfig: { field: "revenue", order: "desc" },
        visibleColumns,
        isShared,
      }).unwrap();

      dispatch(closeSaveModal());
      setViewName("");
      setDescription("");
    } catch (err) {
      console.error("Save view error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#0f131d] border border-[#232c42] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#1f273b] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookmarkPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Save Current View</h3>
              <p className="text-xs text-zinc-400">
                Save active filters, columns & sorting configuration.
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closeSaveModal())}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-[#1a2133]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              View Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Q3 High-Margin German Enterprise"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141a29] border border-[#252f47] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Brief context on this query configuration..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#141a29] border border-[#252f47] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isShared"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              className="rounded bg-[#141a29] border-[#252f47] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="isShared"
              className="text-zinc-300 flex items-center gap-1 cursor-pointer select-none"
            >
              <Share2 className="w-3 h-3 text-cyan-400" />
              <span>Share this view with team members</span>
            </label>
          </div>

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
              disabled={isLoading || !viewName.trim()}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isLoading ? "Saving..." : "Save View"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
