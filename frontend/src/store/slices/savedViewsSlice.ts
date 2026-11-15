import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SavedViewItem } from "@/store/api/recordsApi";

interface SavedViewsState {
  activeViewId: string | null;
  isSaveModalOpen: boolean;
  editingView: SavedViewItem | null;
  isViewsManagerOpen: boolean;
  viewsManagerTab: "views" | "history";
  isShareModalOpen: boolean;
  selectedViewForShare: SavedViewItem | null;
}

const initialState: SavedViewsState = {
  activeViewId: null,
  isSaveModalOpen: false,
  editingView: null,
  isViewsManagerOpen: false,
  viewsManagerTab: "views",
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
      state.editingView = null;
      state.isSaveModalOpen = true;
    },
    openEditModal: (state, action: PayloadAction<SavedViewItem>) => {
      state.editingView = action.payload;
      state.isSaveModalOpen = true;
    },
    closeSaveModal: (state) => {
      state.isSaveModalOpen = false;
      state.editingView = null;
    },
    openViewsManager: (
      state,
      action: PayloadAction<"views" | "history" | undefined>
    ) => {
      state.isViewsManagerOpen = true;
      if (action.payload) {
        state.viewsManagerTab = action.payload;
      }
    },
    closeViewsManager: (state) => {
      state.isViewsManagerOpen = false;
    },
    setViewsManagerTab: (state, action: PayloadAction<"views" | "history">) => {
      state.viewsManagerTab = action.payload;
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
  openEditModal,
  closeSaveModal,
  openViewsManager,
  closeViewsManager,
  setViewsManagerTab,
  openShareModal,
  closeShareModal,
} = savedViewsSlice.actions;

export default savedViewsSlice.reducer;
