import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const savedUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  isAuthenticated: savedUser ? true : false,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginError(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, loginError, logout } =
  authSlice.actions;

export default authSlice.reducer;
