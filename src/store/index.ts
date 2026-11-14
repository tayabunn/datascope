import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import datasetReducer from "./slices/datasetSlice";
import searchConfigReducer from "./slices/searchConfigSlice";
import savedViewsReducer from "./slices/savedViewsSlice";
import uiPreferenceReducer from "./slices/uiPreferenceSlice";
import { recordsApi } from "./api/recordsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dataset: datasetReducer,
    searchConfig: searchConfigReducer,
    savedViews: savedViewsReducer,
    uiPreference: uiPreferenceReducer,
    [recordsApi.reducerPath]: recordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
