import createWebStorageModule from "redux-persist/lib/storage/createWebStorage";

const createWebStorage = createWebStorageModule.default ?? createWebStorageModule;
const storage = createWebStorage("local");

export const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
