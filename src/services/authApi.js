import { api, clearAuthHeader, setAuthHeader } from "./api.js";

export const register = async (userData) => {
  const response = await api.post("/api/auth/sign-up", userData);
  setAuthHeader(response.data.token);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/api/auth/sign-in", credentials);
  setAuthHeader(response.data.token);
  return response.data;
};

export const logout = async () => {
  await api.delete("/api/auth/sign-out");
  clearAuthHeader();
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/api/users/current");
  return response.data;
};
