import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SavedViewItem {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, unknown>;
  sorting: { field: string; order: "asc" | "desc" };
  visibleColumns: string[];
  isShared: boolean;
  createdAt: string;
}

interface SavedViewsState {
  activeViewId: string | null;
  isSaveModalOpen: boolean;
  isShareModalOpen: boolean;
  selectedViewForShare: SavedViewItem | null;
}

const initialState: SavedViewsState = {
  activeViewId: null,
  isSaveModalOpen: false,
  isShareModalOpen: false,
  selectedViewForShare: null,
};

export const savedViewsSlice = createSlice({
  name: "savedViews",
  initialState,
  reducers: {
    setActiveViewId: (state, action: PayloadAction<string | null>) => {
      state.activeViewId = action.payload;
    },
    openSaveModal: (state) => {
      state.isSaveModalOpen = true;
    },
    closeSaveModal: (state) => {
      state.isSaveModalOpen = false;
    },
    openShareModal: (state, action: PayloadAction<SavedViewItem>) => {
      state.selectedViewForShare = action.payload;
      state.isShareModalOpen = true;
    },
    closeShareModal: (state) => {
      state.selectedViewForShare = null;
      state.isShareModalOpen = false;
    },
  },
});

export const {
  setActiveViewId,
  openSaveModal,
  closeSaveModal,
  openShareModal,
  closeShareModal,
} = savedViewsSlice.actions;

export default savedViewsSlice.reducer;
