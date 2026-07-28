export const selectIsRefreshing = (state) => state.auth?.isRefreshing ?? false;

export const selectIsLoggedIn = (state) => state.auth?.isLoggedIn ?? false;

export const selectToken = (state) => state.auth?.token ?? null;

export const selectUser = (state) => state.auth?.user ?? null;
