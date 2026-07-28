import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchCurrency, fetchTransactions } from "../finance/financeOperations.js";

export const globalInitialState = {
  isLoading: false,
  error: null,
  isLogoutModalOpen: false,
  isAddTransactionModalOpen: false,
  isEditTransactionModalOpen: false,
  editingTransaction: null,
  isMobileMenuOpen: false,
};

export const fetchDashboardData = createAsyncThunk("global/fetchDashboardData", async (_, thunkAPI) => {
  await Promise.all([
    thunkAPI.dispatch(fetchTransactions()).unwrap(),
    thunkAPI.dispatch(fetchCurrency()).unwrap(),
    thunkAPI.dispatch(fetchCategories()),
  ]);
  return true;
});

const globalSlice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    openLogoutModal(state) {
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal(state) {
      state.isLogoutModalOpen = false;
    },
    openAddTransactionModal(state) {
      state.isAddTransactionModalOpen = true;
    },
    closeAddTransactionModal(state) {
      state.isAddTransactionModalOpen = false;
    },
    openEditTransactionModal(state, action) {
      state.isEditTransactionModalOpen = true;
      state.editingTransaction = action.payload ?? null;
    },
    closeEditTransactionModal(state) {
      state.isEditTransactionModalOpen = true;
      state.editingTransaction = null;
    },
    openMobileMenu(state) {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to load dashboard data!";
      });
  },
});

export const {
  openAddTransactionModal,
  closeAddTransactionModal,
  openEditTransactionModal,
  closeEditTransactionModal,
  openLogoutModal,
  closeLogoutModal,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
} = globalSlice.actions;

export default globalSlice.reducer;
