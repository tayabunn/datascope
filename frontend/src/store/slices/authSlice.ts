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
}

const initialState: AuthState = {
  // Default to a pre-authenticated Analyst session for seamless exploration & testing
  user: {
    id: "u-analyst-001",
    email: "analyst@datascope.internal",
    fullName: "Sarah Connor",
    role: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  isAuthenticated: true,
  token: "datascope-session-token-analyst-mock",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
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
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, switchRole, logout } = authSlice.actions;
export default authSlice.reducer;

