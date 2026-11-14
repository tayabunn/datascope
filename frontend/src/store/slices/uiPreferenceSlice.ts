import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIPreferenceState {
  theme: "dark" | "light";
  pageSize: number;
  tableDensity: "compact" | "comfortable" | "spacious";
  visibleColumns: string[];
  selectedRowIds: string[];
  activeDrawerRecordId: string | null;
  isExportModalOpen: boolean;
  performanceTelemetry: {
    lastQueryTimeMs: number;
    cacheHit: boolean;
  };
}

const DEFAULT_VISIBLE_COLUMNS = [
  "recordCode",
  "title",
  "companyName",
  "category",
  "status",
  "country",
  "revenue",
  "profit",
  "rating",
  "priority",
  "createdAt",
];

const initialState: UIPreferenceState = {
  theme: "dark",
  pageSize: 50,
  tableDensity: "compact",
  visibleColumns: DEFAULT_VISIBLE_COLUMNS,
  selectedRowIds: [],
  activeDrawerRecordId: null,
  isExportModalOpen: false,
  performanceTelemetry: {
    lastQueryTimeMs: 14.5,
    cacheHit: false,
  },
};

export const uiPreferenceSlice = createSlice({
  name: "uiPreference",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTableDensity: (
      state,
      action: PayloadAction<"compact" | "comfortable" | "spacious">
    ) => {
      state.tableDensity = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const col = action.payload;
      if (state.visibleColumns.includes(col)) {
        if (state.visibleColumns.length > 2) {
          state.visibleColumns = state.visibleColumns.filter((c) => c !== col);
        }
      } else {
        state.visibleColumns.push(col);
      }
    },
    setVisibleColumns: (state, action: PayloadAction<string[]>) => {
      state.visibleColumns = action.payload;
    },
    resetVisibleColumns: (state) => {
      state.visibleColumns = DEFAULT_VISIBLE_COLUMNS;
    },
    toggleRowSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedRowIds.includes(id)) {
        state.selectedRowIds = state.selectedRowIds.filter((r) => r !== id);
      } else {
        state.selectedRowIds.push(id);
      }
    },
    selectAllRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRowIds = action.payload;
    },
    clearRowSelection: (state) => {
      state.selectedRowIds = [];
    },
    openRecordDrawer: (state, action: PayloadAction<string>) => {
      state.activeDrawerRecordId = action.payload;
    },
    closeRecordDrawer: (state) => {
      state.activeDrawerRecordId = null;
    },
    toggleExportModal: (state) => {
      state.isExportModalOpen = !state.isExportModalOpen;
    },
    setTelemetry: (
      state,
      action: PayloadAction<{ lastQueryTimeMs: number; cacheHit: boolean }>
    ) => {
      state.performanceTelemetry = action.payload;
    },
  },
});

export const {
  setTheme,
  setPageSize,
  setTableDensity,
  toggleColumnVisibility,
  setVisibleColumns,
  resetVisibleColumns,
  toggleRowSelection,
  selectAllRows,
  clearRowSelection,
  openRecordDrawer,
  closeRecordDrawer,
  toggleExportModal,
  setTelemetry,
} = uiPreferenceSlice.actions;

export default uiPreferenceSlice.reducer;

