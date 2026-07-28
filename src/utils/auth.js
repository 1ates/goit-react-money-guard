export const storageKeys = {
  token: "money-guard-token",
  user: "money-guard-user",
  currency: "money-guard-currency",
  currencyTimestamp: "money-guard-currency-timestamp",
};

const fallbackUser = {
  email: "",
};

export const getStoredToken = () => {
  return localStorage.getItem(storageKeys.token) ?? "";
};

export const getStoredUser = () => {
  const raw = localStorage.getItem(storageKeys.user);

  if (!raw) {
    return fallbackUser;
  }

  try {
    return JSON.parse(raw);
  } catch {
    fallbackUser;
  }
};

export const setSession = ({ token, user }) => {
  localStorage.setItem(storageKeys.token, token);
  localStorage.setItem(storageKeys.user, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.user);
};
