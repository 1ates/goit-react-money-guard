export const selectStatistics = (state) => {
  return state.statistics?.categoriesSummary ?? [];
};

export const selectIncomeSummary = (state) => {
  return state.statistics?.incomeSummary ?? 0;
};

export const selectExpenseSummary = (state) => {
  return state.statistics?.expenseSummary ?? 0;
};

export const selectPeriodTotal = (state) => {
  return state.statistics?.periodTotal ?? 0;
};

export const selectStatisticsIsLoading = (state) => {
  return state.statistics?.isLoading ?? false;
};

export const selectStatisticsMonth = (state) => {
  return state.statistics?.selectedMonth ?? new Date().getMonth() + 1;
};

export const selectStatisticsYear = (state) => {
  return state.statistics?.selectedYear ?? new Date().getFullYear();
};
