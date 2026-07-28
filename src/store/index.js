import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice.js";
import { financeReducer } from "./finance/financeSlice.js";
import globalReducer from "./global/globalSlice.js";
import { authPersistConfig } from "./persistConfig.js";
import { statisticsReducer } from "./statistics/statisticsSlice.js";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    finance: financeReducer,
    global: globalReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
