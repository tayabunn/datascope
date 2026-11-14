import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DatasetSummary {
  id: string;
  name: string;
  description: string;
  category: string;
  dataSource: string;
  totalRecords: number;
  accessLevel: "Public" | "Internal" | "Restricted";
  lastUpdated: string;
}

interface DatasetState {
  activeDatasetId: string;
  selectedCategory: string;
  datasetSearchQuery: string;
}

const initialState: DatasetState = {
  activeDatasetId: "ds-global-enterprise-001",
  selectedCategory: "all",
  datasetSearchQuery: "",
};

export const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setActiveDataset: (state, action: PayloadAction<string>) => {
      state.activeDatasetId = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setDatasetSearchQuery: (state, action: PayloadAction<string>) => {
      state.datasetSearchQuery = action.payload;
    },
  },
});

export const { setActiveDataset, setSelectedCategory, setDatasetSearchQuery } =
  datasetSlice.actions;
export default datasetSlice.reducer;

