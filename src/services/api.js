import { env } from "../config/env.js";
import axios from "axios";

export const api = axios.create({
  baseURL: env.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const nextConfig = { ...config };

  if (!nextConfig.headers) {
    nextConfig.headers = {};
  }

  return nextConfig;
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};
