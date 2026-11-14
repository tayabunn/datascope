import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "Administrator" | "Data Analyst" | "Viewer";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  // Unauthenticated by default: User MUST log in or register before accessing dashboard
  user: null,
  isAuthenticated: false,
  token: null,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuthFromStorage: (state) => {
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("datascope_auth");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.user && parsed.token) {
              state.user = parsed.user;
              state.token = parsed.token;
              state.isAuthenticated = true;
            }
          }
        } catch {
          // Ignore parse errors
        }
      }
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "datascope_auth",
          JSON.stringify({ user: action.payload.user, token: action.payload.token })
        );
      }
    },
    switchRole: (state, action: PayloadAction<UserRole>) => {
      if (state.user) {
        state.user.role = action.payload;
        if (action.payload === "Administrator") {
          state.user.fullName = "Alex Rivera (CDO)";
          state.user.email = "admin@datascope.internal";
        } else if (action.payload === "Data Analyst") {
          state.user.fullName = "Sarah Connor";
          state.user.email = "analyst@datascope.internal";
        } else {
          state.user.fullName = "Marcus Vance (Viewer)";
          state.user.email = "viewer@datascope.internal";
        }
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "datascope_auth",
            JSON.stringify({ user: state.user, token: state.token })
          );
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("datascope_auth");
      }
    },
  },
});

export const { initAuthFromStorage, setCredentials, switchRole, logout } =
  authSlice.actions;
export default authSlice.reducer;

