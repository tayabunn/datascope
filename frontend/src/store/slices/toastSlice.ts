import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastItem {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
}

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{
        type?: "success" | "info" | "warning" | "error";
        title: string;
        message?: string;
        duration?: number;
      }>
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      state.toasts.push({
        id,
        type: action.payload.type || "info",
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 4000,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearAllToasts } = toastSlice.actions;
export default toastSlice.reducer;
