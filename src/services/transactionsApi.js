import { api } from "./api.js";

export const transactionsApi = {
  all: "/api/transactions",
  categories: "/api/transaction-categories",
  summary: "/api/transactions-summary",
};

export const getTransactions = async () => {
  const response = await api.get(transactionsApi.all);
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await api.post(transactionsApi.all, data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await api.patch(`${transactionsApi.all}/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  await api.delete(`${transactionsApi.all}/${id}`);
  return id;
};

export const getCategories = async () => {
  const response = await api.get(transactionsApi.categories);
  return response.data;
};
