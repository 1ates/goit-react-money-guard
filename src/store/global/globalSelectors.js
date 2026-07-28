export const selectIsAddTransactionModalOpen = (state) => state.global?.isAddTransactionModalOpen ?? false;

export const selectIsEditTransactionModalOpen = (state) => state.global?.isEditTransactionModalOpen ?? false;

export const selectEditingTransaction = (state) => state.global?.editingTransaction ?? null;

export const selectIsMobileMenuOpen = (state) => state.global?.isMobileMenuOpen ?? false;

export const selectIsLoading = (state) => state.global?.isLoading ?? false;

export const selectError = (state) => state.global?.error ?? null;
