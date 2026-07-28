const readEnv = (key, fallback = "") => import.meta.env[key] ?? fallback;

export const env = {
  appName: readEnv("VITE_APP_NAME", "Money Guard"),
  apiBaseUrl: readEnv("VITE_API_BASE_URL", "https://wallet.b.goit.study"),
  monobankApiUrl: readEnv("VITE_MONOBANK_API_URL", "https://api.monobank.ua/bank/currency"),
  enableDevtools: readEnv("VITE_ENABLE_DEVTOOLS", "true") === "true",
};
