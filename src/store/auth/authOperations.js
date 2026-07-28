import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, setAuthHeader } from "../../services/api.js";
import * as authApi from "../../services/authApi.js";

export const registerUser = createAsyncThunk("auth/registerUser", async (credentials, thunkAPI) => {
  try {
    return await authApi.register(credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    return await authApi.login(credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await authApi.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
  }
});

export const refreshUser = createAsyncThunk("auth/refreshUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    setAuthHeader(persistedToken);
    return await authApi.fetchCurrentUser();
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
  }
});
