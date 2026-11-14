import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterRule {
  id: string;
  field: string;
  operator: "equals" | "contains" | "gt" | "lt" | "gte" | "lte" | "in" | "between";
  value: string | number | string[];
}

interface SearchConfigState {
  globalQuery: string;
  rules: FilterRule[];
  statusFilter: string;
  countryFilter: string;
  categoryFilter: string;
  minRevenue: number | null;
  maxRevenue: number | null;
  startDate: string | null;
  endDate: string | null;
  isAdvancedBuilderOpen: boolean;
}

const initialState: SearchConfigState = {
  globalQuery: "",
  rules: [],
  statusFilter: "all",
  countryFilter: "all",
  categoryFilter: "all",
  minRevenue: null,
  maxRevenue: null,
  startDate: null,
  endDate: null,
  isAdvancedBuilderOpen: false,
};

export const searchConfigSlice = createSlice({
  name: "searchConfig",
  initialState,
  reducers: {
    setGlobalQuery: (state, action: PayloadAction<string>) => {
      state.globalQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setCountryFilter: (state, action: PayloadAction<string>) => {
      state.countryFilter = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setRevenueRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.minRevenue = action.payload.min;
      state.maxRevenue = action.payload.max;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ start: string | null; end: string | null }>
    ) => {
      state.startDate = action.payload.start;
      state.endDate = action.payload.end;
    },
    addFilterRule: (state, action: PayloadAction<FilterRule>) => {
      state.rules.push(action.payload);
    },
    removeFilterRule: (state, action: PayloadAction<string>) => {
      state.rules = state.rules.filter((r) => r.id !== action.payload);
    },
    clearAllFilters: (state) => {
      state.globalQuery = "";
      state.rules = [];
      state.statusFilter = "all";
      state.countryFilter = "all";
      state.categoryFilter = "all";
      state.minRevenue = null;
      state.maxRevenue = null;
      state.startDate = null;
      state.endDate = null;
    },
    toggleAdvancedBuilder: (state) => {
      state.isAdvancedBuilderOpen = !state.isAdvancedBuilderOpen;
    },
  },
});

export const {
  setGlobalQuery,
  setStatusFilter,
  setCountryFilter,
  setCategoryFilter,
  setRevenueRange,
  setDateRange,
  addFilterRule,
  removeFilterRule,
  clearAllFilters,
  toggleAdvancedBuilder,
} = searchConfigSlice.actions;

export default searchConfigSlice.reducer;
