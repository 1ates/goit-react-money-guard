export const selectTransactions = (state) => state.finance?.transactions ?? [];

export const selectTotalBalance = (state) => state.finance?.totalBalance ?? 0;

export const selectCategories = (state) => state.finance?.categories ?? [];

export const selectCurrency = (state) => state.finance?.currency ?? [];
