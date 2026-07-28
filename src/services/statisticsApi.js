import { api } from "./api.js";

export const statisticsApi = {
  summary: "/api/transactions-summary",
};

export const getStatistics = async (month, year) => {
  const response = await api.get(statisticsApi.summary, {
    params: { month, year },
  });
  return response.data;
};
