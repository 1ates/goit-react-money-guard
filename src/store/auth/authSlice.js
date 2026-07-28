import { createSlice } from "@reduxjs/toolkit";

import { loginUser, logoutUser, refreshUser, registerUser } from "./authOperations.js";

export const authInitialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const clearAuth = (state) => {
  state.user = authInitialState.user;
  state.token = null;
  state.isLoggedIn = false;
  state.isRefreshing = false;
};

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    clearAuthState: clearAuth,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, clearAuth)
      .addCase(logoutUser.rejected, clearAuth)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        clearAuth(state);
      });
  },
});

export const { clearAuthState } = slice.actions;
export const authReducer = slice.reducer;
