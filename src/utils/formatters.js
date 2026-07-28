export const formatCurrency = (value) => {
  return Number(value ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const toApiDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, 0);
  const month = String(d.getMonth() + 1).padStart(2, 0);
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
};
